"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personagem = void 0;
const acoes_1 = require("./acoes");
class Personagem {
    _id;
    _nome;
    _vida;
    _ataque;
    _historico = [];
    _danoCausado = 0;
    _danoRecebido = 0;
    _abates = 0;
    constructor(id, nome, vida, ataque) {
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
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get vida() {
        return this._vida;
    }
    set vida(valor) {
        if (valor < 0)
            valor = 0;
        if (valor > 100)
            valor = 100;
        this._vida = valor;
    }
    get ataque() {
        return this._ataque;
    }
    estaVivo() {
        return this._vida > 0;
    }
    receberDano(valorDano) {
        if (!this.estaVivo() || valorDano <= 0)
            return;
        this.vida -= valorDano;
        this._danoRecebido += valorDano;
    }
    registrarDanoCausado(valorDano) {
        if (valorDano > 0) {
            this._danoCausado += valorDano;
        }
    }
    registrarAbate() {
        this._abates++;
    }
    registrarAcao(acao) {
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
    atacar(alvo) {
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
        const acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, valorDano, this._nome + " ataca " + alvo.nome);
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
    static fromJSON(dados) {
        const p = new Personagem(Number(dados.id), dados.nome, Number(dados.vida), Number(dados.ataque));
        p._danoCausado =
            dados.danoCausado !== undefined ? dados.danoCausado : 0;
        p._danoRecebido =
            dados.danoRecebido !== undefined ? dados.danoRecebido : 0;
        p._abates =
            dados.abates !== undefined ? dados.abates : 0;
        return p;
    }
}
exports.Personagem = Personagem;
//# sourceMappingURL=personagem.js.map