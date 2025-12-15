import { Personagem } from "./personagem";
import { Guerreiro, Mago, Arqueiro, PersonagemCustomizado, Letalis, Guardiao } from "./subClasses";
import Letalis = require("./subClasses");

class RegistroPersonagem {
    static criar(dados: any): Personagem {
        let personagem: Personagem;
        let vidaSalva = Number(dados.vida);
        let vidaConstrutor = vidaSalva > 0 ? vidaSalva : 1;

        switch (dados.tipo) {
            case "Guerreiro":
            personagem = new Guerreiro(
            Number(dados.id),
            dados.nome,
            vidaConstrutor,
            Number(dados.ataque),
            Number(dados.defesa)
            );
            (personagem as Guerreiro).vidaInicial = Number(
                dados.vidaInicial !== undefined && dados.vidaInicial !== null
                    ? dados.vidaInicial
                    : vidaConstrutor
            );
            break;

            case "Mago":
                personagem = new Mago(
                    Number(dados.id),
                    dados.nome,
                    vidaConstrutor,
                    Number(dados.ataque)
                );
                break;

            case "Arqueiro":
                personagem = new Arqueiro(
                    Number(dados.id),
                    dados.nome,
                    vidaConstrutor,
                    Number(dados.ataque),
                    Number(dados.ataqueMultiplo)
                );
                break;

            case "PersonagemCustomizado":
                personagem = new PersonagemCustomizado(
                    Number(dados.id),
                    dados.nome,
                    vidaConstrutor,
                    Number(dados.ataque),
                    dados.tipoCustom,
                    Number(dados.rouboVida),
                    Number(dados.chanceCritico)
                );
                break;
            case "Letalis":
                personagem = new Letalis(
                    Number(dados.id),
                    dados.nome,
                    vidaConstrutor,
                    Number(dados.ataque)
                );
                break;
            case "Guardiao":
                personagem = new Guardiao(
                    Number(dados.id),
                    dados.nome,
                    vidaConstrutor,
                    Number(dados.ataque)
                );
                break;

            default:
                throw new Error("Tipo de personagem inválido");
        }

        personagem.vida = vidaSalva;

        (personagem as any)._danoCausado =
        dados.danoCausado !== undefined ? dados.danoCausado : 0;

        (personagem as any)._danoRecebido =
        dados.danoRecebido !== undefined ? dados.danoRecebido : 0;

        (personagem as any)._abates =
        dados.abates !== undefined ? dados.abates : 0;

        return personagem;
    }
}

export { RegistroPersonagem };