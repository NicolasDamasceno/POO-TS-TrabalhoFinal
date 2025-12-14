"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAcao = exports.Acao = void 0;
var TipoAcao;
(function (TipoAcao) {
    TipoAcao["ATAQUE"] = "ATAQUE";
    TipoAcao["MAGIA"] = "MAGIA";
    TipoAcao["ATAQUE_ENFURECIDO"] = "ATAQUE_ENFURECIDO";
    TipoAcao["ATAQUE_MULTIPLO"] = "ATAQUE_MULTIPLO";
    TipoAcao["ATAQUE_CRITICO"] = "ATAQUE_CRITICO";
    TipoAcao["ROUBO_VIDA"] = "ROUBO_VIDA";
    TipoAcao["AUTODANO"] = "AUTODANO";
})(TipoAcao || (TipoAcao = {}));
exports.TipoAcao = TipoAcao;
let contadorId = 1;
class Acao {
    _id;
    _origem;
    _alvo;
    _tipo;
    _valorDano;
    _descricao;
    _dataHora;
    _rodada = 0;
    constructor(origem, alvo, tipo, valorDano, descricao) {
        this._id = contadorId++;
        this._origem = origem;
        this._alvo = alvo;
        this._tipo = tipo;
        this._valorDano = valorDano;
        this._descricao = descricao;
        this._dataHora = new Date();
    }
    get id() {
        return this._id;
    }
    get origem() {
        return this._origem;
    }
    get alvo() {
        return this._alvo;
    }
    get tipo() {
        return this._tipo;
    }
    get valorDano() {
        return this._valorDano;
    }
    get descricao() {
        return this._descricao;
    }
    get dataHora() {
        return this._dataHora;
    }
    get rodada() {
        return this._rodada;
    }
    set rodada(valor) {
        this._rodada = valor;
    }
    toJSON() {
        return {
            id: this._id,
            origem: this._origem.nome,
            alvo: this._alvo.nome,
            tipo: this._tipo,
            valorDano: this._valorDano,
            descricao: this._descricao,
            rodada: this._rodada,
            dataHora: this._dataHora.toISOString()
        };
    }
    static fromJSON(dados, personagens) {
        const origem = personagens.find(p => p.nome === dados.origem);
        const alvo = personagens.find(p => p.nome === dados.alvo);
        if (!origem || !alvo) {
            throw new Error("Erro ao reconstruir ação");
        }
        const acao = new Acao(origem, alvo, dados.tipo, Number(dados.valorDano), dados.descricao);
        acao.rodada = Number(dados.rodada);
        return acao;
    }
}
exports.Acao = Acao;
//# sourceMappingURL=acoes.js.map