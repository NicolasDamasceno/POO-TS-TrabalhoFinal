"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAcao = exports.Acao = void 0;
var TipoAcao;
(function (TipoAcao) {
    TipoAcao["ATAQUE"] = "ATAQUE";
    TipoAcao["MAGIA"] = "MAGIA";
    TipoAcao["ATAQUE_MULTIPLO"] = "ATAQUE_MULTIPLO";
    TipoAcao["AUTODANO"] = "AUTODANO";
})(TipoAcao || (TipoAcao = {}));
exports.TipoAcao = TipoAcao;
var contadorId = 1;
var Acao = /** @class */ (function () {
    function Acao(origem, alvo, tipo, valor, descricao) {
        this._rodada = 0;
        this._id = contadorId++;
        this._origem = origem;
        this._alvo = alvo;
        this._tipo = tipo;
        this._valor = valor;
        this._descricao = descricao;
        this._dataHora = new Date();
    }
    Object.defineProperty(Acao.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acao.prototype, "origem", {
        get: function () {
            return this._origem;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acao.prototype, "alvo", {
        get: function () {
            return this._alvo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acao.prototype, "tipo", {
        get: function () {
            return this._tipo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acao.prototype, "valor", {
        get: function () {
            return this._valor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acao.prototype, "descricao", {
        get: function () {
            return this._descricao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acao.prototype, "dataHora", {
        get: function () {
            return this._dataHora;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Acao.prototype, "rodada", {
        get: function () {
            return this._rodada;
        },
        set: function (valor) {
            this._rodada = valor;
        },
        enumerable: false,
        configurable: true
    });
    Acao.prototype.toJSON = function () {
        return {
            id: this._id,
            origem: this._origem.nome,
            alvo: this._alvo.nome,
            tipo: this._tipo,
            valor: this._valor,
            descricao: this._descricao,
            rodada: this._rodada,
            dataHora: this._dataHora.toISOString()
        };
    };
    Acao.fromJSON = function (dados, personagens) {
        var origem = personagens.find(function (p) { return p.nome === dados.origem; });
        var alvo = personagens.find(function (p) { return p.nome === dados.alvo; });
        if (!origem || !alvo) {
            throw new Error("Erro ao reconstruir ação");
        }
        var acao = new Acao(origem, alvo, dados.tipo, dados.valor, dados.descricao);
        acao.rodada = dados.rodada;
        return acao;
    };
    return Acao;
}());
exports.Acao = Acao;
//# sourceMappingURL=acoes.js.map