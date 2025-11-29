"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personagem = void 0;
const acoes_1 = require("./acoes");
class Personagem {
    _id;
    _nome;
    _vida;
    _vidaMaxima; // O atributo Vida Máxima guarda o valor da Vida sem ser alterado, será usado para Cálculos de ataques
    _ataqueBase;
    _defesaBase;
    _historico = [];
    constructor(id, nome, vida, vidaMaxima, ataqueBase, defesaBase) {
        this._id = id,
            this._nome = nome,
            this._vida = vida;
        this._vidaMaxima = vidaMaxima;
        this._ataqueBase = ataqueBase,
            this._defesaBase = defesaBase;
    }
    // Get para retorna os atributos
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get vida() {
        return this._vida;
    }
    get vidaMaxima() {
        return this._vidaMaxima;
    }
    get ataqueBase() {
        return this._ataqueBase;
    }
    get defesaBase() {
        return this._defesaBase;
    }
    estaVivo() {
        return this._vida > 0;
    }
    // O método atacar vazio para que as classes filhas o implementem
    atacar(alvo) {
        let acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, 0);
        return acao;
    }
    ;
    receberDano(valor) {
        this._vida -= valor;
        if (this._vida < 0) {
            this._vida = 0;
        }
    }
    registrarAcao(acao) {
        this._historico.push(acao);
    }
    regastarHistorico() {
        return this._historico;
    }
}
exports.Personagem = Personagem;
//# sourceMappingURL=personagemBase.js.map