import { Acao, TipoAcao } from "./acoes";

class Personagem {
    protected _id: number;
    protected _nome: string;
    protected _vida: number;
    protected _ataque: number;
    protected _historico: Acao[] = [];
    protected _danoCausado: number = 0;
    protected _danoRecebido: number = 0;
    protected _abates: number = 0;

    constructor(id: number, nome: string, vida: number, ataque: number
    ) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Id inválido");
        }

        if (!nome || !nome.trim()) {
            throw new Error("Nome inválido");
        }

        if (!Number.isInteger(vida) || vida <= 0 || vida > 100) {
            throw new Error("Vida inválida");
        }

        if (!Number.isInteger(ataque) || ataque <= 0) {
            throw new Error("Ataque inválido");
        }

        this._id = id;
        this._nome = nome;
        this._vida = vida;
        this._ataque = ataque;
    }

    get id(): number {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }

    get vida(): number {
        return this._vida;
    }

    set vida(valor: number) {
        if (valor < 0) valor = 0;
        if (valor > 100) valor = 100;
        this._vida = valor;
    }

    get ataque(): number {
        return this._ataque;
    }

    estaVivo(): boolean {
        return this._vida > 0;
    }

    receberDano(valorDano: number): void {
        if (!this.estaVivo() || valorDano <= 0) return;
        this.vida -= valorDano;
        this._danoRecebido += valorDano;
    }

    registrarDanoCausado(valorDano: number): void {
        if (valorDano > 0) {
            this._danoCausado += valorDano;
        }
    }

    registrarAbate(): void {
        this._abates++;
    }

    registrarAcao(acao: Acao): void {
        this._historico.push(acao);
    }

    getEstatisticas() {
        return {
            nome: this._nome,
            danoCausado: this._danoCausado,
            danoRecebido: this._danoRecebido,
            abates: this._abates,
            vidaFinal: this._vida
        };
    }

    atacar(alvo: Personagem): Acao[] {
        if (!this.estaVivo()) {
            throw new Error("Personagem morto não pode atacar");
        }

        if (!alvo.estaVivo()) {
            throw new Error("Alvo já está morto");
        }

        if (this === alvo) {
            throw new Error("Ataque inválido");
        }

        const valorDano = this._ataque;
        const acao = new Acao(
            this,
            alvo,
            TipoAcao.ATAQUE,
            valorDano,
            this._nome + " ataca " + alvo.nome
        );
        if (valorDano > 0) {
            alvo.receberDano(valorDano);
            this.registrarDanoCausado(valorDano);
        }

        this.registrarAcao(acao);
        alvo.registrarAcao(acao);

        if (!alvo.estaVivo() && valorDano > 0) {
            this.registrarAbate();
        }

        return [acao];
    }

    toJSON() {
        return {
            tipo: this.constructor.name,
            id: this._id,
            nome: this._nome,
            vida: this._vida,
            ataque: this._ataque,
            danoCausado: this._danoCausado,
            danoRecebido: this._danoRecebido,
            abates: this._abates
        };
    }

    static fromJSON(dados: any): Personagem {
        const p = new Personagem(
            Number(dados.id),
            dados.nome,
            Number(dados.vida),
            Number(dados.ataque)
        );
        p._danoCausado =
            dados.danoCausado !== undefined ? dados.danoCausado : 0;

        p._danoRecebido =
            dados.danoRecebido !== undefined ? dados.danoRecebido : 0;

        p._abates =
            dados.abates !== undefined ? dados.abates : 0;

        return p;
    }
}

export { Personagem };