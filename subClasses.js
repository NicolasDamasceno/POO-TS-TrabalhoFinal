"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonagemCustomizado = exports.Arqueiro = exports.Mago = exports.Guerreiro = void 0;
const personagemBase_1 = require("./personagemBase");
const acoes_1 = require("./acoes");
class Guerreiro extends personagemBase_1.Personagem {
    _defesa;
    constructor(id, nome, vida, vidaMax, ataque, defesa) {
        super(id, nome, vida, vidaMax, ataque);
        if (defesa < 0) {
            throw new Error("Defesa inválida");
        }
        this._defesa = defesa;
    }
    atacar(alvo) {
        if (!this.estaVivo())
            throw new Error("Guerreiro morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        const enfurecido = this.vida < this.vidaMax * 0.3;
        let dano = this.ataque;
        if (enfurecido) {
            dano = Math.floor(dano * 1.3);
        }
        let danoFinal = dano;
        if (alvo instanceof Guerreiro && danoFinal <= alvo._defesa) {
            danoFinal = 0;
        }
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        const descricao = danoFinal === 0
            ? `${this.nome} ataca ${alvo.nome}, mas o ataque é BLOQUEADO pela defesa.`
            : enfurecido
                ? `${this.nome} desfere um ATAQUE ENFURECIDO em ${alvo.nome}!`
                : `${this.nome} ataca ${alvo.nome} com sua espada.`;
        const acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, danoFinal, descricao);
        this.registrarAcao(acao);
        alvo.registrarAcao(acao);
        return [acao];
    }
    toJSON() {
        return {
            ...super.toJSON(),
            defesa: this._defesa
        };
    }
}
exports.Guerreiro = Guerreiro;
class Mago extends personagemBase_1.Personagem {
    atacar(alvo) {
        if (!this.estaVivo())
            throw new Error("Mago morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        let dano = this.ataque;
        if (alvo instanceof Arqueiro) {
            dano *= 2;
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
            ? `${this.nome} lança magia em ${alvo.nome}, mas a defesa bloqueia o ataque.`
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
class Arqueiro extends personagemBase_1.Personagem {
    _ataqueMultiplo;
    constructor(id, nome, vida, vidaMax, ataque, ataqueMultiplo) {
        super(id, nome, vida, vidaMax, ataque);
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
        let descricao = `${this.nome} dispara flecha em ${alvo.nome}.`;
        if (Math.random() < 0.5) {
            dano = this.ataque * this._ataqueMultiplo;
            descricao = `${this.nome} dispara ATAQUE MÚLTIPLO em ${alvo.nome}!`;
        }
        if (!Number.isFinite(dano)) {
            dano = 0;
        }
        let danoFinal = dano;
        if (alvo instanceof Guerreiro && danoFinal <= alvo._defesa) {
            danoFinal = 0;
            descricao = `${this.nome} ataca ${alvo.nome}, mas o ataque é BLOQUEADO.`;
        }
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        const acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE_MULTIPLO, danoFinal, descricao);
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
class PersonagemCustomizado extends personagemBase_1.Personagem {
    _tipoCustom;
    _rouboVida;
    _chanceCritico;
    constructor(id, nome, vida, vidaMax, ataque, tipoCustom, rouboVida, chanceCritico) {
        super(id, nome, vida, vidaMax, ataque);
        this._tipoCustom = tipoCustom;
        this._rouboVida = rouboVida;
        this._chanceCritico = chanceCritico;
    }
    atacar(alvo) {
        if (!this.estaVivo())
            throw new Error("Personagem morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        let dano = this.ataque;
        let critico = false;
        if (Math.random() * 100 < this._chanceCritico) {
            dano *= 2;
            critico = true;
        }
        let danoFinal = dano;
        if (alvo instanceof Guerreiro && danoFinal <= alvo._defesa) {
            danoFinal = 0;
        }
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
            const cura = Math.floor(danoFinal * (this._rouboVida / 100));
            this.vida += cura;
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        const descricao = danoFinal === 0
            ? `${this.nome} (${this._tipoCustom}) ataca ${alvo.nome}, mas o ataque é BLOQUEADO.`
            : critico
                ? `${this.nome} (${this._tipoCustom}) desfere um ATAQUE CRÍTICO em ${alvo.nome}!`
                : `${this.nome} (${this._tipoCustom}) ataca ${alvo.nome}.`;
        const acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, danoFinal, descricao);
        this.registrarAcao(acao);
        alvo.registrarAcao(acao);
        return [acao];
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
//# sourceMappingURL=subClasses.js.map