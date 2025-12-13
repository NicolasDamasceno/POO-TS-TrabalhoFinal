"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personagem = void 0;
var acoes_1 = require("./acoes");
var Personagem = /** @class */ (function () {
    function Personagem(id, nome, vida, vidaMax, ataque) {
        this._historico = [];
        this._danoCausado = 0;
        this._danoRecebido = 0;
        this._abates = 0;
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Id inválido");
        }
        if (!nome || !nome.trim()) {
            throw new Error("Nome inválido");
        }
        if (vidaMax <= 0 || vida < 0 || vida > vidaMax) {
            throw new Error("Vida inválida");
        }
        if (ataque < 0) {
            throw new Error("Ataque inválido");
        }
        this._id = id;
        this._nome = nome;
        this._vida = vida;
        this._vidaMax = vidaMax;
        this._ataque = ataque;
    }
    Object.defineProperty(Personagem.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "vida", {
        get: function () {
            return this._vida;
        },
        set: function (valor) {
            if (valor < 0)
                valor = 0;
            if (valor > this._vidaMax)
                valor = this._vidaMax;
            this._vida = valor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "vidaMax", {
        get: function () {
            return this._vidaMax;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Personagem.prototype, "ataque", {
        get: function () {
            return this._ataque;
        },
        enumerable: false,
        configurable: true
    });
    Personagem.prototype.estaVivo = function () {
        return this._vida > 0;
    };
    Personagem.prototype.receberDano = function (valor) {
        if (!this.estaVivo() || valor <= 0)
            return;
        this.vida -= valor;
        this._danoRecebido += valor;
    };
    Personagem.prototype.registrarDanoCausado = function (valor) {
        if (valor > 0) {
            this._danoCausado += valor;
        }
    };
    Personagem.prototype.registrarAbate = function () {
        this._abates++;
    };
    Personagem.prototype.registrarAcao = function (acao) {
        this._historico.push(acao);
    };
    Personagem.prototype.getEstatisticas = function () {
        return {
            nome: this._nome,
            danoCausado: this._danoCausado,
            danoRecebido: this._danoRecebido,
            abates: this._abates,
            vidaFinal: this._vida
        };
    };
    Personagem.prototype.atacar = function (alvo) {
        if (!this.estaVivo()) {
            throw new Error("Personagem morto não pode atacar");
        }
        if (!alvo.estaVivo()) {
            throw new Error("Alvo já está morto");
        }
        if (this === alvo) {
            throw new Error("Ataque inválido");
        }
        var dano = this._ataque;
        var acao = new acoes_1.Acao(this, alvo, acoes_1.TipoAcao.ATAQUE, dano, this._nome + " ataca " + alvo.nome);
        if (dano > 0) {
            alvo.receberDano(dano);
            this.registrarDanoCausado(dano);
        }
        this.registrarAcao(acao);
        alvo.registrarAcao(acao);
        if (!alvo.estaVivo() && dano > 0) {
            this.registrarAbate();
        }
        return [acao];
    };
    Personagem.prototype.toJSON = function () {
        return {
            tipo: this.constructor.name,
            id: this._id,
            nome: this._nome,
            vida: this._vida,
            vidaMax: this._vidaMax,
            ataque: this._ataque,
            danoCausado: this._danoCausado,
            danoRecebido: this._danoRecebido,
            abates: this._abates
        };
    };
    Personagem.fromJSON = function (dados) {
        var p = new Personagem(dados.id, dados.nome, dados.vida, dados.vidaMax, dados.ataque);
        p._danoCausado = dados.danoCausado !== undefined ? dados.danoCausado : 0;
        p._danoRecebido = dados.danoRecebido !== undefined ? dados.danoRecebido : 0;
        p._abates = dados.abates !== undefined ? dados.abates : 0;
        return p;
    };
    return Personagem;
}());
exports.Personagem = Personagem;
//# sourceMappingURL=personagemBase.js.map