"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aneurisma = exports.Guardiao = exports.Letalis = exports.PersonagemCustomizado = exports.Arqueiro = exports.Mago = exports.Guerreiro = void 0;
const personagem_1 = require("./personagem");
const acoes_1 = require("./acoes");
const batalha_1 = require("./batalha");
class Guerreiro extends personagem_1.Personagem {
    _defesa;
    _vidaInicial;
    constructor(id, nome, vida, ataque, defesa) {
        super(id, nome, vida, ataque);
        if (defesa <= 0)
            throw new Error("Defesa inválida");
        this._defesa = defesa;
        this._vidaInicial = vida;
    }
    set vidaInicial(v) {
        this._vidaInicial = v;
    }
    get vidaInicial() {
        return this._vidaInicial;
    }
    atacar(alvo) {
        if (!this.estaVivo())
            throw new Error("Guerreiro morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        const enfurecido = this.vida < this._vidaInicial * 0.3;
        let dano = this.ataque;
        if (enfurecido) {
            dano = Math.floor(dano * 1.3);
        }
        let danoFinal = dano;
        if (alvo instanceof Guerreiro) {
            if (danoFinal <= alvo._defesa || danoFinal <= alvo._ataque) {
                danoFinal = 0;
            }
            else {
                danoFinal = danoFinal - alvo._defesa;
            }
        }
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        const tipoAcao = enfurecido
            ? acoes_1.TipoAcao.ATAQUE_ENFURECIDO
            : acoes_1.TipoAcao.ATAQUE;
        const descricao = danoFinal === 0
            ? `${this.nome} ataca ${alvo.nome}, mas o ataque é BLOQUEADO pela defesa.`
            : enfurecido
                ? `${this.nome} desfere um ATAQUE ENFURECIDO em ${alvo.nome}!`
                : `${this.nome} ataca ${alvo.nome} com sua espada.`;
        const acao = new acoes_1.Acao(this, alvo, tipoAcao, danoFinal, descricao);
        this.registrarAcao(acao);
        alvo.registrarAcao(acao);
        return [acao];
    }
    toJSON() {
        return {
            ...super.toJSON(),
            defesa: this._defesa,
            vidaInicial: this._vidaInicial
        };
    }
}
exports.Guerreiro = Guerreiro;
class Mago extends personagem_1.Personagem {
    atacar(alvo) {
        if (!this.estaVivo())
            throw new Error("Mago morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        let dano = this.ataque;
        if (alvo instanceof Arqueiro) {
            dano = dano * 2;
        }
        let danoFinal = dano;
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        const acaoAtaque = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.MAGIA, danoFinal, danoFinal === 0
            ? `${this.nome} lança magia em ${alvo.nome}, mas o ataque falha.`
            : `${this.nome} lança magia em ${alvo.nome}.`);
        this.receberDano(10);
        const acaoAutodano = new acoes_1.Acao(this, this, acoes_1.TipoAcao.AUTODANO, 10, `${this.nome} sofre o custo da magia.`);
        this.registrarAcao(acaoAtaque);
        alvo.registrarAcao(acaoAtaque);
        this.registrarAcao(acaoAutodano);
        return [acaoAtaque, acaoAutodano];
    }
}
exports.Mago = Mago;
class Arqueiro extends personagem_1.Personagem {
    _ataqueMultiplo;
    constructor(id, nome, vida, ataque, ataqueMultiplo) {
        super(id, nome, vida, ataque);
        if (!Number.isFinite(ataqueMultiplo) || ataqueMultiplo < 2) {
            throw new Error("Ataque múltiplo inválido");
        }
        this._ataqueMultiplo = ataqueMultiplo;
    }
    atacar(alvo) {
        if (!this.estaVivo())
            throw new Error("Arqueiro morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        let dano = this.ataque;
        let tipoAcao = acoes_1.TipoAcao.ATAQUE;
        let descricao = `${this.nome} dispara flecha em ${alvo.nome}.`;
        if (Math.random() < 0.5) {
            dano = this.ataque * this._ataqueMultiplo;
            tipoAcao = acoes_1.TipoAcao.ATAQUE_MULTIPLO;
            descricao = `${this.nome} dispara ATAQUE MÚLTIPLO em ${alvo.nome}!`;
        }
        let danoFinal = dano;
        if (alvo instanceof Guerreiro) {
            if (danoFinal <= alvo._defesa || danoFinal <= alvo._ataque) {
                danoFinal = 0;
                descricao = `${this.nome} ataca ${alvo.nome}, mas o ataque é BLOQUEADO.`;
            }
            else {
                danoFinal = danoFinal - alvo._defesa;
            }
        }
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        const acao = new acoes_1.Acao(this, alvo, tipoAcao, danoFinal, descricao);
        this.registrarAcao(acao);
        alvo.registrarAcao(acao);
        return [acao];
    }
    toJSON() {
        return {
            ...super.toJSON(),
            ataqueMultiplo: this._ataqueMultiplo
        };
    }
}
exports.Arqueiro = Arqueiro;
class PersonagemCustomizado extends personagem_1.Personagem {
    _tipoCustom;
    _rouboVida;
    _chanceCritico;
    constructor(id, nome, vida, ataque, tipoCustom, rouboVida, chanceCritico) {
        super(id, nome, vida, ataque);
        this._tipoCustom = tipoCustom;
        this._rouboVida = rouboVida;
        this._chanceCritico = chanceCritico;
        if (!Number.isInteger(rouboVida) || rouboVida <= 0 || rouboVida > 100) {
            throw new Error("Roubo de vida inválido");
        }
        if (!Number.isInteger(chanceCritico) || chanceCritico <= 0 || chanceCritico > 100) {
            throw new Error("Roubo de vida inválido");
        }
        if (!tipoCustom || !tipoCustom.trim()) {
            throw new Error("Tipo inválido");
        }
    }
    atacar(alvo) {
        if (!this.estaVivo())
            throw new Error("Personagem morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        const acoes = [];
        let dano = this.ataque;
        let critico = false;
        if (Math.random() * 100 < this._chanceCritico) {
            dano = Math.floor(dano * 2);
            critico = true;
        }
        let danoFinal = dano;
        if (alvo instanceof Guerreiro) {
            if (danoFinal <= alvo._defesa || danoFinal <= alvo._ataque) {
                danoFinal = 0;
            }
            else {
                danoFinal = danoFinal - alvo._defesa;
            }
        }
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        const tipoAtaque = critico
            ? acoes_1.TipoAcao.ATAQUE_CRITICO
            : acoes_1.TipoAcao.ATAQUE;
        const descricao = danoFinal === 0
            ? `${this.nome} (${this._tipoCustom}) ataca ${alvo.nome}, mas o ataque é BLOQUEADO.`
            : critico
                ? `${this.nome} (${this._tipoCustom}) desfere um ATAQUE CRÍTICO em ${alvo.nome}!`
                : `${this.nome} (${this._tipoCustom}) ataca ${alvo.nome}.`;
        const acaoAtaque = new acoes_1.Acao(this, alvo, tipoAtaque, danoFinal, descricao);
        acoes.push(acaoAtaque);
        this.registrarAcao(acaoAtaque);
        alvo.registrarAcao(acaoAtaque);
        if (danoFinal > 0 && this._rouboVida > 0) {
            const cura = Math.floor(danoFinal * (this._rouboVida / 100));
            if (cura > 0) {
                this.vida += cura;
                const acaoRouboVida = new acoes_1.Acao(this, this, acoes_1.TipoAcao.ROUBO_VIDA, cura, `${this.nome} (${this._tipoCustom}) rouba ${cura} de vida.`);
                acoes.push(acaoRouboVida);
                this.registrarAcao(acaoRouboVida);
            }
        }
        return acoes;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            tipoCustom: this._tipoCustom,
            rouboVida: this._rouboVida,
            chanceCritico: this._chanceCritico
        };
    }
}
exports.PersonagemCustomizado = PersonagemCustomizado;
class Letalis extends personagem_1.Personagem {
    atacar(alvo) {
        if (!this.estaVivo())
            throw new Error("Letalis morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        let danoFinal = alvo.vida;
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        const acaoAtaque = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, danoFinal, danoFinal === 0
            ? `${this.nome} lança ataque em ${alvo.nome}, mas o ataque falha.`
            : `${this.nome} lança ataque em ${alvo.nome}.`);
        this.registrarAcao(acaoAtaque);
        alvo.registrarAcao(acaoAtaque);
        return [acaoAtaque];
    }
}
exports.Letalis = Letalis;
class Guardiao extends personagem_1.Personagem {
    atacar(alvo) {
        if (!this.estaVivo())
            throw new Error("Letalis morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        let danoFinal = this._ataque;
        if (danoFinal > 0) {
            throw new Error("Guardião não pode atacar");
        }
        const acaoAtaque = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, danoFinal, danoFinal === 0
            ? `${this.nome} lança ataque em ${alvo.nome}, mas o ataque falha.`
            : `${this.nome} lança ataque em ${alvo.nome}.`);
        this.registrarAcao(acaoAtaque);
        alvo.registrarAcao(acaoAtaque);
        return [acaoAtaque];
    }
}
exports.Guardiao = Guardiao;
// Aneurisma nâo implementado! Não Funcional
class Aneurisma extends personagem_1.Personagem {
    atacar(alvo) {
        if (!this.estaVivo())
            throw new Error("Aneurisma morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        let dano = this.ataque;
        let danoFinal = dano;
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        const acaoAtaque = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, danoFinal, danoFinal === 0
            ? `${this.nome} lança ataque em ${alvo.nome}, mas o ataque falha.`
            : `${this.nome} lança ataque em ${alvo.nome}.`);
        this.receberDano(10);
        const acaoAutodano = new acoes_1.Acao(this, this, acoes_1.TipoAcao.AUTODANO, 10, `${this.nome} sofre o custo da magia.`);
        this.registrarAcao(acaoAtaque);
        alvo.registrarAcao(acaoAtaque);
        this.registrarAcao(acaoAutodano);
        return [acaoAtaque, acaoAutodano];
    }
}
exports.Aneurisma = Aneurisma;
//# sourceMappingURL=subClasses.js.map