import { Personagem } from "./personagemBase";
import { Acao, TipoAcao } from "./acoes";
import { RegistroPersonagem } from "./registroPersonagem";
import * as fs from "fs";

type EstadoBatalha = "NAO_INICIADA" | "EM_ANDAMENTO" | "FINALIZADA";

class LogicaBatalha {
    private _personagens: Personagem[] = [];
    private _acoes: Acao[] = [];
    private _estado: EstadoBatalha = "NAO_INICIADA";
    private _rodada: number = 0;

    adicionarPersonagem(personagem: Personagem): void {
        if (this._estado !== "NAO_INICIADA") {
            throw new Error("Não é possível adicionar personagens após o início da batalha");
        }

        const existe = this._personagens.find(p => p.nome === personagem.nome);
        if (existe) {
            throw new Error("Nome de personagem já existe");
        }

        this._personagens.push(personagem);
    }

    getPersonagens(): Personagem[] {
        return this._personagens;
    }

    consultarPersonagem(nome: string): Personagem {
        if (!nome || !nome.trim()) {
            throw new Error("Nome inválido para consulta");
        }

        const personagem = this._personagens.find(
            p => p.nome.toLowerCase() === nome.toLowerCase()
        );
        if (!personagem) {
            throw new Error("Personagem não encontrado");
        }

        return personagem;
    }

    listarPersonagensVivos(): Personagem[] {
        return this._personagens.filter(p => p.estaVivo());
    }

    listarPersonagensMortos(): Personagem[] {
        return this._personagens.filter(p => !p.estaVivo());
    }

    iniciarBatalha(): void {
        if (this._personagens.length < 2) {
            throw new Error("São necessários ao menos dois personagens");
        }

        if (this._estado !== "NAO_INICIADA") {
            throw new Error("Batalha já iniciada");
        }

        this._estado = "EM_ANDAMENTO";
        this._rodada = 1;
    }

    finalizarBatalha(): void {
        if (this._estado !== "EM_ANDAMENTO") {
            throw new Error("Batalha não está em andamento");
        }

        this._estado = "FINALIZADA";
    }

    obterEstado(): EstadoBatalha {
        return this._estado;
    }

    executarTurno(atacante: Personagem, defensor: Personagem): void {
        if (this._estado !== "EM_ANDAMENTO") {
            throw new Error("Batalha não está em andamento");
        }

        if (!atacante.estaVivo()) {
            throw new Error("Atacante está morto");
        }

        if (!defensor.estaVivo()) {
            throw new Error("Defensor já está morto");
        }

        if (atacante === defensor) {
            throw new Error("Atacante e defensor não podem ser o mesmo");
        }

        const acoes = atacante.atacar(defensor);
        for (const acao of acoes) {
            acao.rodada = this._rodada;
            this._acoes.push(acao);
        }

        this._rodada++;
        if (this.listarPersonagensVivos().length === 0) {
            this._estado = "FINALIZADA";
        }
    }

    verificarVencedor(): Personagem | null {
        const vivos = this.listarPersonagensVivos();
        return vivos.length === 1 ? vivos[0] : null;
    }

    listarAcoesOrdenadas(): Acao[] {
        return this._acoes
            .slice()
            .sort((a, b) => {
                if (a.rodada !== b.rodada) return a.rodada - b.rodada;
                return a.id - b.id;
            });
    }

    filtrarAcoes(filtro: {
        personagem?: string;
        tipo?: TipoAcao;
        rodadaInicio?: number;
        rodadaFim?: number;
        apenasAtaques?: boolean;
    }): Acao[] {
        return this._acoes.filter(a => {
            if (
                filtro.personagem &&
                a.origem.nome !== filtro.personagem &&
                a.alvo.nome !== filtro.personagem
            ) return false;

            if (filtro.tipo && a.tipo !== filtro.tipo) return false;

            if (filtro.apenasAtaques) {
                if (
                    a.tipo !== TipoAcao.ATAQUE &&
                    a.tipo !== TipoAcao.ATAQUE_MULTIPLO &&
                    a.tipo !== TipoAcao.MAGIA
                ) return false;
            }

            if (filtro.rodadaInicio !== undefined && a.rodada < filtro.rodadaInicio) {
                return false;
            }

            if (filtro.rodadaFim !== undefined && a.rodada > filtro.rodadaFim) {
                return false;
            }

            return true;
        });
    }

    replay(): void {
        console.log("\n===== REPLAY DA BATALHA =====");
        for (const acao of this.listarAcoesOrdenadas()) {
            console.log(
                `[Rodada ${acao.rodada}] ${acao.descricao} (Valor: ${acao.valor})`
            );
        }
    }

    resumoBatalha(): string {
        const vencedor = this.verificarVencedor();
        const vivos = this.listarPersonagensVivos();

        let texto = "\n===================================\n";
        texto += "        RESULTADO FINAL\n";
        texto += "===================================\n";
        texto += `Estado final: ${this._estado}\n`;
        texto += `Rodadas: ${this._rodada - 1}\n`;
        texto += `Total de ações: ${this._acoes.length}\n`;

        if (this._estado === "FINALIZADA" && vencedor === null) {
            texto += vivos.length === 0
                ? "Resultado: EMPATE (todos morreram)\n"
                : "Resultado: BATALHA ENCERRADA SEM VENCEDOR\n";
        } else {
            texto += "Vencedor: " + (vencedor ? vencedor.nome : "Nenhum") + "\n";
        }

        texto += "\nEstatísticas dos personagens:\n";
        for (const p of this._personagens) {
            const e = p.getEstatisticas();
            texto += `- ${e.nome}: `;
            texto += `Dano causado=${e.danoCausado}, `;
            texto += `Dano recebido=${e.danoRecebido}, `;
            texto += `Abates=${e.abates}, `;
            texto += `Vida final=${e.vidaFinal}\n`;
        }
        return texto;
    }

    salvarEmArquivo(caminho: string): void {
        const vencedor = this.verificarVencedor();
        const dados = {
            estado: this._estado,
            rodada: this._rodada,
            vencedor: vencedor ? vencedor.nome : null,
            personagens: this._personagens.map(p => p.toJSON()),
            acoes: this._acoes.map(a => a.toJSON())
        };

        fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
    }

    carregarDeArquivo(caminho: string): void {
        if (!fs.existsSync(caminho)) {
            throw new Error("Arquivo não encontrado");
        }

        const dados = JSON.parse(fs.readFileSync(caminho, "utf-8"));
        this._estado = dados.estado as EstadoBatalha;
        this._rodada = Number(dados.rodada);
        this._personagens = [];
        this._acoes = [];

        for (const p of dados.personagens) {
            this._personagens.push(RegistroPersonagem.criar(p));
        }
        for (const a of dados.acoes) {
            this._acoes.push(Acao.fromJSON(a, this._personagens));
        }
    }
}

export { LogicaBatalha };