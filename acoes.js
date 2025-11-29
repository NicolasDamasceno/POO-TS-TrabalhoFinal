"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAcao = exports.Acao = void 0;
const personagemBase_1 = require("./personagemBase");
var TipoAcao;
(function (TipoAcao) {
    TipoAcao["ATAQUE"] = "Ataque F\u00EDsico";
    TipoAcao["MAGIA"] = "Magia";
    TipoAcao["CRITICO"] = "Ataque Cr\u00EDtico";
    TipoAcao["ATAQUE_DUPLO"] = "Ataque Duplo";
    TipoAcao["FALHA"] = "Falha";
    TipoAcao["DEFESA"] = "Defesa";
    TipoAcao["CURA"] = "Cura";
})(TipoAcao || (exports.TipoAcao = TipoAcao = {}));
class Acao {
    _origem;
    _alvo;
    _tipo;
    _valorDano;
    _dataHora;
    constructor(origem, alvo, tipo, valorDano) {
        this._origem = origem;
        this._alvo = alvo;
        this._tipo = tipo;
        this._valorDano = valorDano;
        this._dataHora = new Date();
    }
    // Métodos Get de Ação
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
    get dataHora() {
        return this._dataHora;
    }
}
exports.Acao = Acao;
//# sourceMappingURL=acoes.js.map