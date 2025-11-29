"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arqueiro = exports.Mago = exports.Guerreiro = void 0;
const personagemBase_1 = require("./personagemBase");
const acoes_1 = require("./acoes");
// Classe do Guerreiro, se a ação não puder ser realizada, o retorno será Null.
class Guerreiro extends personagemBase_1.Personagem {
    atacar(alvo) {
        // Verifica se o personagem ainda está vivo, retorna um ataque Falha
        if (!this.estaVivo()) {
            console.log(`${this.nome} está morto e não pode mais atacar!`);
            let acao = new acoes_1.Acao(this, this, acoes_1.TipoAcao.FALHA, 0);
            this.registrarAcao(acao);
            return acao;
        }
        else {
            // Verifica se o alvo é o própio atacante, retorna um ataque Falha
            if (this == alvo) {
                console.log(`${this.nome} não pode atacar a si mesmo...`);
                let acao = new acoes_1.Acao(this, this, acoes_1.TipoAcao.FALHA, 0);
                this.registrarAcao(acao);
                return acao;
            }
            else {
                let danoCalculado = this.ataqueBase;
                // Primeiro Ataque, caso a vida esteja menos de 30%
                if (this.vida < (this.vidaMaxima * 0.3)) {
                    danoCalculado *= 1.3;
                }
                // Segundo Ataque, caso o alvo seja um Mago
                if (alvo instanceof Mago) {
                    danoCalculado += 3;
                }
                // Aplicando a Defesa do Alvo para o cálculo final do Dano Total
                danoCalculado = Math.max(0, danoCalculado - alvo.defesaBase);
                alvo.receberDano(danoCalculado);
                // Registrando a Ação no alvo e do atacante.
                let acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, danoCalculado);
                this.registrarAcao(acao);
                alvo.registrarAcao(acao);
                return acao;
            }
        }
    }
}
exports.Guerreiro = Guerreiro;
class Mago extends personagemBase_1.Personagem {
    magia(alvo) {
        if (!this.estaVivo()) {
            console.log(`${this.nome} está morto e não pode mais atacar!`);
            let acao = new acoes_1.Acao(this, this, acoes_1.TipoAcao.FALHA, 0);
            this.registrarAcao(acao);
            return acao;
        }
        else {
            if (this == alvo) {
                console.log(`${this.nome} não pode atacar a si mesmo...`);
                let acao = new acoes_1.Acao(this, this, acoes_1.TipoAcao.FALHA, 0);
                this.registrarAcao(acao);
                return acao;
            }
            else {
                // Caso o Mago tenha 10pts de vida ou menos, ele não poderá realizar a magia!
                if (this.vida <= 10) {
                    console.log(`${this.nome} não tem vida suficiente para realizar Magia!`);
                    let acao = new acoes_1.Acao(this, this, acoes_1.TipoAcao.FALHA, 0);
                    this.registrarAcao(acao);
                    return acao;
                }
                else {
                    // Recebe o dano da execução da Magia
                    this.receberDano(10);
                    // Dano fixo de 25pts para Magia
                    const danoMagia = 25;
                    alvo.receberDano(danoMagia);
                    // Registrando a Ação no alvo e do atacante.
                    let acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.MAGIA, danoMagia);
                    this.registrarAcao(acao);
                    alvo.registrarAcao(acao);
                    return acao;
                }
            }
        }
    }
    // Ataque Normal, talvez O Mago use o Cajado como Bastão ou apenas use um soco / chute
    // Realiza com Desvantagem, ataqueBase reduzido
    atacar(alvo) {
        if (!this.estaVivo()) {
            console.log(`${this.nome} está morto e não pode mais atacar!`);
            let acao = new acoes_1.Acao(this, this, acoes_1.TipoAcao.FALHA, 0);
            this.registrarAcao(acao);
            return acao;
        }
        else {
            if (this == alvo) {
                console.log(`${this.nome} não pode atacar a si mesmo...`);
                let acao = new acoes_1.Acao(this, this, acoes_1.TipoAcao.FALHA, 0);
                this.registrarAcao(acao);
                return acao;
            }
            else {
                // Apenas 60% do ataque Base
                let danoCalculado = Math.max(0, (this.ataqueBase * 0.6) - alvo.defesaBase);
                alvo.receberDano(danoCalculado);
                let acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, danoCalculado);
                this.registrarAcao(acao);
                alvo.registrarAcao(acao);
                return acao;
            }
        }
    }
}
exports.Mago = Mago;
class Arqueiro extends personagemBase_1.Personagem {
    atacar(alvo) {
        if (!this.estaVivo()) {
            console.log(`${this.nome} está morto e não pode mais atacar!`);
            let acao = new acoes_1.Acao(this, this, acoes_1.TipoAcao.FALHA, 0);
            this.registrarAcao(acao);
            return acao;
        }
        else {
            if (this == alvo) {
                console.log(`${this.nome} não pode atacar a si mesmo...`);
                let acao = new acoes_1.Acao(this, this, acoes_1.TipoAcao.FALHA, 0);
                this.registrarAcao(acao);
                return acao;
            }
            else {
                // Realiza um ataque Duplo, logo será calculado dois Hits
                let danoTotal = 0;
                let tipoAcao = acoes_1.TipoAcao.ATAQUE_DUPLO;
                for (let i = 0; i < 2; i++) {
                    let danoHit = this.ataqueBase;
                    // Verificando se ocorreu Crítico 15%
                    if (Math.random() <= 0.15) {
                        danoHit *= 2;
                        tipoAcao = acoes_1.TipoAcao.CRITICO; // Caso aconteça pelo menos 1 crítico, marca com Crítico no tipo
                    }
                    danoHit = Math.max(0, danoHit - alvo.defesaBase);
                    alvo.receberDano(danoHit);
                    danoTotal += danoHit;
                    // Verifica se o alvo morreu no primeiro Hit e interromepe a ação
                    if (!alvo.estaVivo()) {
                        break;
                    }
                }
                let acao = new acoes_1.Acao(this, alvo, tipoAcao, danoTotal);
                this.registrarAcao(acao);
                alvo.registrarAcao(acao);
                return acao;
            }
        }
    }
}
exports.Arqueiro = Arqueiro;
//# sourceMappingURL=subClasses.js.map