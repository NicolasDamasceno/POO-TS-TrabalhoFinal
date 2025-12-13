"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroPersonagem = void 0;
const subClasses_1 = require("./subClasses");
class RegistroPersonagem {
    static criar(dados) {
        let personagem;
        switch (dados.tipo) {
            case "Guerreiro":
                personagem = new subClasses_1.Guerreiro(Number(dados.id), dados.nome, Number(dados.vida), Number(dados.vidaMax), Number(dados.ataque), Number(dados.defesa));
                break;
            case "Mago":
                personagem = new subClasses_1.Mago(Number(dados.id), dados.nome, Number(dados.vida), Number(dados.vidaMax), Number(dados.ataque));
                break;
            case "Arqueiro":
                personagem = new subClasses_1.Arqueiro(Number(dados.id), dados.nome, Number(dados.vida), Number(dados.vidaMax), Number(dados.ataque), Number(dados.ataqueMultiplo));
                break;
            case "PersonagemCustomizado":
                personagem = new subClasses_1.PersonagemCustomizado(Number(dados.id), dados.nome, Number(dados.vida), Number(dados.vidaMax), Number(dados.ataque), dados.tipoCustom, Number(dados.rouboVida), Number(dados.chanceCritico));
                break;
            default:
                throw new Error("Tipo de personagem inválido");
        }
        personagem._danoCausado =
            dados.danoCausado !== undefined ? dados.danoCausado : 0;
        personagem._danoRecebido =
            dados.danoRecebido !== undefined ? dados.danoRecebido : 0;
        personagem._abates =
            dados.abates !== undefined ? dados.abates : 0;
        return personagem;
    }
}
exports.RegistroPersonagem = RegistroPersonagem;
//# sourceMappingURL=registroPersonagem.js.map