"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroPersonagem = void 0;
var personagemBase_1 = require("./personagemBase");
var subClasses_1 = require("./subClasses");
var RegistroPersonagem = /** @class */ (function () {
    function RegistroPersonagem() {
    }
    RegistroPersonagem.criar = function (dados) {
        var p;
        switch (dados.tipo) {
            case "Guerreiro":
                p = new subClasses_1.Guerreiro(dados.id, dados.nome, dados.vida, dados.vidaMax, dados.ataque, dados.defesa);
                break;
            case "Mago":
                p = new subClasses_1.Mago(dados.id, dados.nome, dados.vida, dados.vidaMax, dados.ataque);
                break;
            case "Arqueiro":
                p = new subClasses_1.Arqueiro(dados.id, dados.nome, dados.vida, dados.vidaMax, dados.ataque, dados.multiplicador);
                break;
            case "PersonagemCustomizado":
                p = new subClasses_1.PersonagemCustomizado(dados.id, dados.nome, dados.vida, dados.vidaMax, dados.ataque, dados.tipoCustomizado, dados.rouboVida, dados.chanceCritica);
                break;
            default:
                p = new personagemBase_1.Personagem(dados.id, dados.nome, dados.vida, dados.vidaMax, dados.ataque);
        }
        p["_danoCausado"] = dados.danoCausado || 0;
        p["_danoRecebido"] = dados.danoRecebido || 0;
        p["_abates"] = dados.abates || 0;
        return p;
    };
    return RegistroPersonagem;
}());
exports.RegistroPersonagem = RegistroPersonagem;
//# sourceMappingURL=registroPersonagem.js.map