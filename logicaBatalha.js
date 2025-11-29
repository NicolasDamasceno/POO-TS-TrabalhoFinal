"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personagemBase_1 = require("./personagemBase");
const acoes_1 = require("./acoes");
const subClasses_1 = require("./subClasses");
class Batalha {
    _personagens;
    _acoes;
    constructor() {
        this._personagens = [];
        this._acoes = [];
    }
    // Aqui iremos procurar o Personagem
    consultarPersonagem(id) {
        let personagemProcurado;
        for (let personagem of this._personagens) {
            if (personagem.id == id) {
                personagemProcurado = personagem;
                break;
            }
        }
        return personagemProcurado;
    }
    // Aqui iremos adicionar o personagem caso ele ainda não esteja na lista
    adicionarPersonagem(personagem) {
        if (!this.consultarPersonagem(personagem.id)) {
            this._personagens.push(personagem);
        }
    }
    turno(atacanteID, defensorID) {
        let atacante = this.consultarPersonagem(atacanteID);
        let defensor = this.consultarPersonagem(defensorID);
        if (!atacante || !defensor) {
            console.log("Personagens não encontrados!");
            let acao = new acoes_1.Acao(atacante, defensor, acoes_1.TipoAcao.FALHA, 0);
            this._acoes.push(acao);
            return [acao];
        }
        else {
            let acaoTurno = atacante.atacar(defensor);
            this._acoes.push(acaoTurno);
            return [acaoTurno];
        }
    }
    listarPersonagens() {
        return this._personagens;
    }
    listarAcoes() {
        return this._acoes;
    }
    verificarVencendor() {
        let vivos = this._personagens.filter(personagem => personagem.estaVivo());
        if (vivos.length === 1) {
            return vivos[0];
        }
        return undefined; // Há mais de um personagem vivo ou todos morreram
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
//# sourceMappingURL=logicaBatalha.js.map