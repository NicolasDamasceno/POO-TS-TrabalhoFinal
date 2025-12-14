"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistroPersonagem = void 0;
const subClasses_1 = require("./subClasses");
class RegistroPersonagem {
    static criar(dados) {
        let personagem;
        let vidaSalva = Number(dados.vida);
        let vidaConstrutor = vidaSalva > 0 ? vidaSalva : 1;
        switch (dados.tipo) {
            case "Guerreiro":
                personagem = new subClasses_1.Guerreiro(Number(dados.id), dados.nome, vidaConstrutor, Number(dados.ataque), Number(dados.defesa));
                personagem.vidaInicial = Number(dados.vidaInicial !== undefined && dados.vidaInicial !== null
                    ? dados.vidaInicial
                    : vidaConstrutor);
                break;
            case "Mago":
                personagem = new subClasses_1.Mago(Number(dados.id), dados.nome, vidaConstrutor, Number(dados.ataque));
                break;
            case "Arqueiro":
                personagem = new subClasses_1.Arqueiro(Number(dados.id), dados.nome, vidaConstrutor, Number(dados.ataque), Number(dados.ataqueMultiplo));
                break;
            case "PersonagemCustomizado":
                personagem = new subClasses_1.PersonagemCustomizado(Number(dados.id), dados.nome, vidaConstrutor, Number(dados.ataque), dados.tipoCustom, Number(dados.rouboVida), Number(dados.chanceCritico));
                break;
            default:
                throw new Error("Tipo de personagem inválido");
        }
        personagem.vida = vidaSalva;
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