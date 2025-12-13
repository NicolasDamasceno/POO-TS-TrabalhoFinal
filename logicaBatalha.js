"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicaBatalha = void 0;
const acoes_1 = require("./acoes");
const registroPersonagem_1 = require("./registroPersonagem");
const fs = __importStar(require("fs"));
class LogicaBatalha {
    _personagens = [];
    _acoes = [];
    _estado = "NAO_INICIADA";
    _rodada = 0;
    adicionarPersonagem(personagem) {
        if (this._estado !== "NAO_INICIADA") {
            throw new Error("Não é possível adicionar personagens após o início da batalha");
        }
        const existe = this._personagens.find(p => p.nome === personagem.nome);
        if (existe) {
            throw new Error("Nome de personagem já existe");
        }
        this._personagens.push(personagem);
    }
    getPersonagens() {
        return this._personagens;
    }
    consultarPersonagem(nome) {
        if (!nome || !nome.trim()) {
            throw new Error("Nome inválido para consulta");
        }
        const personagem = this._personagens.find(p => p.nome.toLowerCase() === nome.toLowerCase());
        if (!personagem) {
            throw new Error("Personagem não encontrado");
        }
        return personagem;
    }
    listarPersonagensVivos() {
        return this._personagens.filter(p => p.estaVivo());
    }
    listarPersonagensMortos() {
        return this._personagens.filter(p => !p.estaVivo());
    }
    iniciarBatalha() {
        if (this._personagens.length < 2) {
            throw new Error("São necessários ao menos dois personagens");
        }
        if (this._estado !== "NAO_INICIADA") {
            throw new Error("Batalha já iniciada");
        }
        this._estado = "EM_ANDAMENTO";
        this._rodada = 1;
    }
    finalizarBatalha() {
        if (this._estado !== "EM_ANDAMENTO") {
            throw new Error("Batalha não está em andamento");
        }
        this._estado = "FINALIZADA";
    }
    obterEstado() {
        return this._estado;
    }
    executarTurno(atacante, defensor) {
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
    verificarVencedor() {
        const vivos = this.listarPersonagensVivos();
        return vivos.length === 1 ? vivos[0] : null;
    }
    listarAcoesOrdenadas() {
        return this._acoes
            .slice()
            .sort((a, b) => {
            if (a.rodada !== b.rodada)
                return a.rodada - b.rodada;
            return a.id - b.id;
        });
    }
    filtrarAcoes(filtro) {
        return this._acoes.filter(a => {
            if (filtro.personagem &&
                a.origem.nome !== filtro.personagem &&
                a.alvo.nome !== filtro.personagem)
                return false;
            if (filtro.tipo && a.tipo !== filtro.tipo)
                return false;
            if (filtro.apenasAtaques) {
                if (a.tipo !== acoes_1.TipoAcao.ATAQUE &&
                    a.tipo !== acoes_1.TipoAcao.ATAQUE_MULTIPLO &&
                    a.tipo !== acoes_1.TipoAcao.MAGIA)
                    return false;
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
    replay() {
        console.log("\n===== REPLAY DA BATALHA =====");
        for (const acao of this.listarAcoesOrdenadas()) {
            console.log(`[Rodada ${acao.rodada}] ${acao.descricao} (Valor: ${acao.valor})`);
        }
    }
    resumoBatalha() {
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
        }
        else {
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
    salvarEmArquivo(caminho) {
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
    carregarDeArquivo(caminho) {
        if (!fs.existsSync(caminho)) {
            throw new Error("Arquivo não encontrado");
        }
        const dados = JSON.parse(fs.readFileSync(caminho, "utf-8"));
        this._estado = dados.estado;
        this._rodada = Number(dados.rodada);
        this._personagens = [];
        this._acoes = [];
        for (const p of dados.personagens) {
            this._personagens.push(registroPersonagem_1.RegistroPersonagem.criar(p));
        }
        for (const a of dados.acoes) {
            this._acoes.push(acoes_1.Acao.fromJSON(a, this._personagens));
        }
    }
}
exports.LogicaBatalha = LogicaBatalha;
//# sourceMappingURL=logicaBatalha.js.map