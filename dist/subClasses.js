"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonagemCustomizado = exports.Arqueiro = exports.Mago = exports.Guerreiro = void 0;
var personagemBase_1 = require("./personagemBase");
var acoes_1 = require("./acoes");
var Guerreiro = /** @class */ (function (_super) {
    __extends(Guerreiro, _super);
    function Guerreiro(id, nome, vida, vidaMax, ataque, defesa) {
        var _this = _super.call(this, id, nome, vida, vidaMax, ataque) || this;
        if (defesa < 0) {
            throw new Error("Defesa inválida");
        }
        _this._defesa = defesa;
        return _this;
    }
    Guerreiro.prototype.atacar = function (alvo) {
        if (!this.estaVivo())
            throw new Error("Guerreiro morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        var enfurecido = this.vida < this.vidaMax * 0.3;
        var dano = this.ataque;
        if (enfurecido) {
            dano = Math.floor(dano * 1.3);
        }
        var danoFinal = dano;
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
        var descricao = danoFinal === 0
            ? "".concat(this.nome, " ataca ").concat(alvo.nome, ", mas o ataque \u00E9 BLOQUEADO pela defesa.")
            : enfurecido
                ? "".concat(this.nome, " desfere um ATAQUE ENFURECIDO em ").concat(alvo.nome, "!")
                : "".concat(this.nome, " ataca ").concat(alvo.nome, " com sua espada.");
        var acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, danoFinal, descricao);
        this.registrarAcao(acao);
        alvo.registrarAcao(acao);
        return [acao];
    };
    return Guerreiro;
}(personagemBase_1.Personagem));
exports.Guerreiro = Guerreiro;
var Mago = /** @class */ (function (_super) {
    __extends(Mago, _super);
    function Mago() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mago.prototype.atacar = function (alvo) {
        if (!this.estaVivo())
            throw new Error("Mago morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        var dano = this.ataque;
        if (alvo instanceof Arqueiro) {
            dano *= 2;
        }
        var danoFinal = dano;
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
        var acaoAtaque = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.MAGIA, danoFinal, danoFinal === 0
            ? "".concat(this.nome, " lan\u00E7a magia em ").concat(alvo.nome, ", mas a defesa bloqueia o ataque.")
            : "".concat(this.nome, " lan\u00E7a magia em ").concat(alvo.nome, "."));
        this.receberDano(10);
        var acaoAutodano = new acoes_1.Acao(this, this, acoes_1.TipoAcao.AUTODANO, 10, "".concat(this.nome, " sofre o custo da magia."));
        this.registrarAcao(acaoAtaque);
        alvo.registrarAcao(acaoAtaque);
        this.registrarAcao(acaoAutodano);
        this.registrarAcao(acaoAutodano);
        return [acaoAtaque, acaoAutodano];
    };
    return Mago;
}(personagemBase_1.Personagem));
exports.Mago = Mago;
var Arqueiro = /** @class */ (function (_super) {
    __extends(Arqueiro, _super);
    function Arqueiro(id, nome, vida, vidaMax, ataque, ataqueMultiplo) {
        var _this = _super.call(this, id, nome, vida, vidaMax, ataque) || this;
        if (ataqueMultiplo < 2) {
            throw new Error("Ataque múltiplo inválido");
        }
        _this._ataqueMultiplo = ataqueMultiplo;
        return _this;
    }
    Arqueiro.prototype.atacar = function (alvo) {
        if (!this.estaVivo())
            throw new Error("Arqueiro morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        var dano = this.ataque;
        var descricao = "".concat(this.nome, " dispara flecha em ").concat(alvo.nome, ".");
        if (Math.random() < 0.5) {
            dano = this.ataque * this._ataqueMultiplo;
            descricao = "".concat(this.nome, " dispara ATAQUE M\u00DALTIPLO em ").concat(alvo.nome, "!");
        }
        var danoFinal = dano;
        if (alvo instanceof Guerreiro && danoFinal <= alvo._defesa) {
            danoFinal = 0;
            descricao = "".concat(this.nome, " ataca ").concat(alvo.nome, ", mas o ataque \u00E9 BLOQUEADO.");
        }
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        var acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE_MULTIPLO, danoFinal, descricao);
        this.registrarAcao(acao);
        alvo.registrarAcao(acao);
        return [acao];
    };
    return Arqueiro;
}(personagemBase_1.Personagem));
exports.Arqueiro = Arqueiro;
var PersonagemCustomizado = /** @class */ (function (_super) {
    __extends(PersonagemCustomizado, _super);
    function PersonagemCustomizado(id, nome, vida, vidaMax, ataque, tipoCustom, rouboVida, chanceCritico) {
        var _this = _super.call(this, id, nome, vida, vidaMax, ataque) || this;
        _this._tipoCustom = tipoCustom;
        _this._rouboVida = rouboVida;
        _this._chanceCritico = chanceCritico;
        return _this;
    }
    PersonagemCustomizado.prototype.atacar = function (alvo) {
        if (!this.estaVivo())
            throw new Error("Personagem morto");
        if (!alvo.estaVivo())
            throw new Error("Alvo morto");
        if (this === alvo)
            throw new Error("Ataque inválido");
        var dano = this.ataque;
        var critico = false;
        if (Math.random() * 100 < this._chanceCritico) {
            dano *= 2;
            critico = true;
        }
        var danoFinal = dano;
        if (alvo instanceof Guerreiro && danoFinal <= alvo._defesa) {
            danoFinal = 0;
        }
        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
            var cura = Math.floor(danoFinal * (this._rouboVida / 100));
            this.vida += cura;
        }
        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }
        var descricao = danoFinal === 0
            ? "".concat(this.nome, " (").concat(this._tipoCustom, ") ataca ").concat(alvo.nome, ", mas o ataque \u00E9 BLOQUEADO.")
            : critico
                ? "".concat(this.nome, " (").concat(this._tipoCustom, ") desfere um ATAQUE CR\u00CDTICO em ").concat(alvo.nome, "!")
                : "".concat(this.nome, " (").concat(this._tipoCustom, ") ataca ").concat(alvo.nome, ".");
        var acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, danoFinal, descricao);
        this.registrarAcao(acao);
        alvo.registrarAcao(acao);
        return [acao];
    };
    return PersonagemCustomizado;
}(personagemBase_1.Personagem));
exports.PersonagemCustomizado = PersonagemCustomizado;
//# sourceMappingURL=subClasses.js.map