import { Personagem } from "./personagemBase";
import { Acao, TipoAcao } from "./acoes";

// Classe do Guerreiro, se a ação não puder ser realizada, o retorno será Null.
class Guerreiro extends Personagem{
    atacar(alvo: Personagem): Acao{
        // Verifica se o personagem ainda está vivo, retorna um ataque Falha
        if(!this.estaVivo()){
            console.log(`${this.nome} está morto e não pode mais atacar!`);
            let acao:Acao = new Acao(this, this, TipoAcao.FALHA,0);
            this.registrarAcao(acao)
            return acao
        }else{
            // Verifica se o alvo é o própio atacante, retorna um ataque Falha
            if (this == alvo){
                console.log(`${this.nome} não pode atacar a si mesmo...`);
                let acao:Acao = new Acao(this, this, TipoAcao.FALHA,0);
                this.registrarAcao(acao)
                return acao
            }else{
                let danoCalculado = this.ataqueBase

                // Primeiro Ataque, caso a vida esteja menos de 30%
                if (this.vida < (this.vidaMaxima * 0.3)){
                    danoCalculado *= 1.3;
                }

                // Segundo Ataque, caso o alvo seja um Mago
                if (alvo instanceof Mago) {
                    danoCalculado += 3;
                }

                // Aplicando a Defesa do Alvo para o cálculo final do Dano Total
                danoCalculado = Math.max(0, danoCalculado - alvo.defesaBase );
                alvo.receberDano(danoCalculado);
                // Registrando a Ação no alvo e do atacante.
                let acao:Acao = new Acao(this, alvo, TipoAcao.ATAQUE, danoCalculado);
                this.registrarAcao(acao);
                alvo.registrarAcao(acao)
                return acao
            }
        }
    }
}

class Mago extends Personagem {
    magia(alvo:Personagem): Acao{
        if(!this.estaVivo()){
            console.log(`${this.nome} está morto e não pode mais atacar!`);
            let acao:Acao = new Acao(this, this, TipoAcao.FALHA,0);
            this.registrarAcao(acao)
            return acao

        }else{
            if (this == alvo){
                console.log(`${this.nome} não pode atacar a si mesmo...`);
                let acao:Acao = new Acao(this, this, TipoAcao.FALHA,0);
                this.registrarAcao(acao)
                return acao

            }else{
                // Caso o Mago tenha 10pts de vida ou menos, ele não poderá realizar a magia!
                if (this.vida <= 10){
                    console.log(`${this.nome} não tem vida suficiente para realizar Magia!`)
                    let acao:Acao = new Acao(this, this, TipoAcao.FALHA,0);
                    this.registrarAcao(acao)
                    return acao

                }else{
                    // Recebe o dano da execução da Magia
                    this.receberDano(10);
                    // Dano fixo de 25pts para Magia
                    const danoMagia:number = 25;
                    alvo.receberDano(danoMagia);

                    // Registrando a Ação no alvo e do atacante.
                    let acao = new Acao(this, alvo, TipoAcao.MAGIA, danoMagia);
                    this.registrarAcao(acao);
                    alvo.registrarAcao(acao);
                    return acao;

                }

            }
        }
    }

    // Ataque Normal, talvez O Mago use o Cajado como Bastão ou apenas use um soco / chute
    // Realiza com Desvantagem, ataqueBase reduzido
    atacar(alvo: Personagem): Acao {
        if(!this.estaVivo()){
            console.log(`${this.nome} está morto e não pode mais atacar!`);
            let acao:Acao = new Acao(this, this, TipoAcao.FALHA,0);
            this.registrarAcao(acao)
            return acao

        }else{
            if (this == alvo){
                console.log(`${this.nome} não pode atacar a si mesmo...`);
                let acao:Acao = new Acao(this, this, TipoAcao.FALHA,0);
                this.registrarAcao(acao);
                return acao;

            }else{
                // Apenas 60% do ataque Base
                let danoCalculado = Math.max(0, (this.ataqueBase * 0.6) - alvo.defesaBase);
                alvo.receberDano(danoCalculado);
                let acao = new Acao(this, alvo, TipoAcao.ATAQUE, danoCalculado);
                this.registrarAcao(acao);
                alvo.registrarAcao(acao);
                return acao;
            }
        }
    }
}

class Arqueiro extends Personagem {
    atacar(alvo: Personagem): Acao {
        if(!this.estaVivo()){
            console.log(`${this.nome} está morto e não pode mais atacar!`);
            let acao:Acao = new Acao(this, this, TipoAcao.FALHA,0);
            this.registrarAcao(acao)
            return acao
        }else{
            if (this == alvo){
                console.log(`${this.nome} não pode atacar a si mesmo...`);
                let acao:Acao = new Acao(this, this, TipoAcao.FALHA,0);
                this.registrarAcao(acao)
                return acao
            }else{
                // Realiza um ataque Duplo, logo será calculado dois Hits
                let danoTotal: number = 0;
                let tipoAcao = TipoAcao.ATAQUE_DUPLO;
                for (let i = 0; i < 2; i++){
                    let danoHit = this.ataqueBase;

                    // Verificando se ocorreu Crítico 15%
                    if (Math.random() <= 0.15){
                        danoHit *= 2;
                        tipoAcao = TipoAcao.CRITICO // Caso aconteça pelo menos 1 crítico, marca com Crítico no tipo
                    }
                    
                    danoHit = Math.max(0, danoHit - alvo.defesaBase);
                    alvo.receberDano(danoHit);
                    danoTotal += danoHit;

                    // Verifica se o alvo morreu no primeiro Hit e interromepe a ação
                    if(!alvo.estaVivo()) {
                        break;
                    }
                }  
                
                let acao: Acao = new Acao(this, alvo, tipoAcao, danoTotal);
                this.registrarAcao(acao);
                alvo.registrarAcao(acao);
                return acao
            }
        }
    }
}

// Testando as Classes até agora
// let guerreiro:Guerreiro = new Guerreiro(1,"Conan", 80, 80, 14, 10);
// let mago:Mago = new Mago(1, "Gandalf", 65, 65, 8, 9);
// let arqueiro:Arqueiro = new Arqueiro(1,"Link", 70, 70, 11, 10);

// guerreiro.atacar(arqueiro)
// mago.magia(guerreiro)
// arqueiro.atacar(mago)

// console.log(mago.regastarHistorico());
// console.log(guerreiro.regastarHistorico());
// console.log(arqueiro.regastarHistorico());
// console.log('-------------------------');
// console.log(`${guerreiro.vida}/${guerreiro.vidaMaxima}HP`);
// console.log(`${mago.vida}/${mago.vidaMaxima}HP`);
// console.log(`${arqueiro.vida}/${arqueiro.vidaMaxima}HP`)

export {Guerreiro, Mago, Arqueiro}