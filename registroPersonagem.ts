import { Personagem } from "./personagemBase";
import { Guerreiro, Mago, Arqueiro, PersonagemCustomizado } from "./subClasses";

class RegistroPersonagem {
    static criar(dados: any): Personagem {
        let personagem: Personagem;
        switch (dados.tipo) {
            case "Guerreiro":
                personagem = new Guerreiro(
                    Number(dados.id),
                    dados.nome,
                    Number(dados.vida),
                    Number(dados.vidaMax),
                    Number(dados.ataque),
                    Number(dados.defesa)
                );
                break;

            case "Mago":
                personagem = new Mago(
                    Number(dados.id),
                    dados.nome,
                    Number(dados.vida),
                    Number(dados.vidaMax),
                    Number(dados.ataque)
                );
                break;

            case "Arqueiro":
                personagem = new Arqueiro(
                    Number(dados.id),
                    dados.nome,
                    Number(dados.vida),
                    Number(dados.vidaMax),
                    Number(dados.ataque),
                    Number(dados.ataqueMultiplo)  
                );
                break;

            case "PersonagemCustomizado":
                personagem = new PersonagemCustomizado(
                    Number(dados.id),
                    dados.nome,
                    Number(dados.vida),
                    Number(dados.vidaMax),
                    Number(dados.ataque),
                    dados.tipoCustom,              
                    Number(dados.rouboVida),
                    Number(dados.chanceCritico)    
                );
                break;

            default:
                throw new Error("Tipo de personagem inválido");
        }

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