import {Personagem} from "./personagemBase";
import {Acao, TipoAcao} from "./acoes";
import {Guerreiro, Arqueiro, Mago} from "./subClasses"

class Batalha {
    private _personagens:  Personagem[];
    private _acoes: Acao[];

    constructor(){
        this._personagens = [];
        this._acoes = [];
    }

    // Aqui iremos procurar o Personagem
    consultarPersonagem(id:number): Personagem{
        let personagemProcurado!: Personagem;

        for (let personagem of this._personagens){
            if(personagem.id == id){
                personagemProcurado = personagem;
                break
            }
        }
        return personagemProcurado
    }

    // Aqui iremos adicionar o personagem caso ele ainda não esteja na lista
    adicionarPersonagem(personagem: Personagem): void{
        if(!this.consultarPersonagem(personagem.id)){
            this._personagens.push(personagem)
        }
    }

    turno(atacanteID:number, defensorID:number): Acao[]{
        let atacante = this.consultarPersonagem(atacanteID);
        let defensor = this.consultarPersonagem(defensorID);

        if(!atacante || !defensor){
            console.log("Personagens não encontrados!");
            let acao = new Acao(atacante, defensor, TipoAcao.FALHA,0);
            this._acoes.push(acao);
            return  [acao]
        }else{
            let acaoTurno:Acao = atacante.atacar(defensor);
            this._acoes.push(acaoTurno);
            return [acaoTurno]
        }
    }

    listarPersonagens(): Personagem[]{
        return this._personagens
    }

    listarAcoes(): Acao[]{
        return this._acoes
    }

    verificarVencendor(): Personagem | undefined{
        let vivos = this._personagens.filter(personagem => personagem.estaVivo());
        if (vivos.length === 1){
            return vivos[0]
        }
        return undefined // Há mais de um personagem vivo ou todos morreram
    }

}

// Testando
// let guerreiro:Guerreiro = new Guerreiro(1,"Conan", 75, 80, 14, 10);
// let mago:Mago = new Mago(2, "Gandalf", 65, 65, 8, 9);

// let batalha = new Batalha();
// batalha.adicionarPersonagem(guerreiro);
// batalha.adicionarPersonagem(mago);

// let personagemProcurado = batalha.consultarPersonagem(2);
// console.log(personagemProcurado.nome);
// batalha.turno(1,2);
// batalha.turno(1,2);
// batalha.turno(1,2);
// batalha.turno(1,2)
// let vencedor = batalha.verificarVencendor();
// console.log(vencedor?.nome)

