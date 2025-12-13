"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicaBatalha = void 0;
var acoes_1 = require("./acoes");
var registroPersonagem_1 = require("./registroPersonagem");
var fs = __importStar(require("fs"));
var LogicaBatalha = /** @class */ (function () {
    function LogicaBatalha() {
        this._personagens = [];
        this._acoes = [];
        this._estado = "NAO_INICIADA";
        this._rodada = 0;
    }
    LogicaBatalha.prototype.adicionarPersonagem = function (personagem) {
        if (this._estado !== "NAO_INICIADA") {
            throw new Error("Não é possível adicionar personagens após o início da batalha");
        }
        var existe = this._personagens.find(function (p) { return p.nome === personagem.nome; });
        if (existe) {
            throw new Error("Nome de personagem já existe");
        }
        this._personagens.push(personagem);
    };
    LogicaBatalha.prototype.getPersonagens = function () {
        return this._personagens;
    };
    LogicaBatalha.prototype.listarPersonagensVivos = function () {
        return this._personagens.filter(function (p) { return p.estaVivo(); });
    };
    LogicaBatalha.prototype.listarPersonagensMortos = function () {
        return this._personagens.filter(function (p) { return !p.estaVivo(); });
    };
    LogicaBatalha.prototype.iniciarBatalha = function () {
        if (this._personagens.length < 2) {
            throw new Error("São necessários ao menos dois personagens");
        }
        if (this._estado !== "NAO_INICIADA") {
            throw new Error("Batalha já iniciada");
        }
        this._estado = "EM_ANDAMENTO";
        this._rodada = 1;
    };
    LogicaBatalha.prototype.obterEstado = function () {
        return this._estado;
    };
    LogicaBatalha.prototype.executarTurno = function (atacante, defensor) {
        if (this._estado !== "EM_ANDAMENTO") {
            throw new Error("Batalha não está em andamento");
        }
        if (!atacante.estaVivo()) {
            throw new Error("Atacante está morto");
        }
        if (!defensor.estaVivo()) {
            throw new Error("Defensor já está morto");
        }
        if (atacante === defensor) {
            throw new Error("Atacante e defensor não podem ser o mesmo");
        }
        var acoes = atacante.atacar(defensor);
        for (var _i = 0, acoes_2 = acoes; _i < acoes_2.length; _i++) {
            var acao = acoes_2[_i];
            acao.rodada = this._rodada;
            this._acoes.push(acao);
        }
        this._rodada++;
        var vivos = this.listarPersonagensVivos();
        if (vivos.length <= 1) {
            this._estado = "FINALIZADA";
        }
    };
    LogicaBatalha.prototype.verificarVencedor = function () {
        var vivos = this.listarPersonagensVivos();
        return vivos.length === 1 ? vivos[0] : null;
    };
    LogicaBatalha.prototype.listarAcoesOrdenadas = function () {
        return this._acoes
            .slice()
            .sort(function (a, b) {
            if (a.rodada !== b.rodada) {
                return a.rodada - b.rodada;
            }
            return a.id - b.id;
        });
    };
    LogicaBatalha.prototype.filtrarAcoes = function (filtro) {
        return this._acoes.filter(function (a) {
            if (filtro.personagem &&
                a.origem.nome !== filtro.personagem &&
                a.alvo.nome !== filtro.personagem) {
                return false;
            }
            if (filtro.tipo && a.tipo !== filtro.tipo) {
                return false;
            }
            if (filtro.apenasAtaques) {
                if (a.tipo !== acoes_1.TipoAcao.ATAQUE &&
                    a.tipo !== acoes_1.TipoAcao.ATAQUE_MULTIPLO &&
                    a.tipo !== acoes_1.TipoAcao.MAGIA) {
                    return false;
                }
            }
            if (filtro.rodadaInicio && a.rodada < filtro.rodadaInicio) {
                return false;
            }
            if (filtro.rodadaFim && a.rodada > filtro.rodadaFim) {
                return false;
            }
            return true;
        });
    };
    LogicaBatalha.prototype.replay = function () {
        console.log("\n===== REPLAY DA BATALHA =====");
        var ordenadas = this.listarAcoesOrdenadas();
        for (var _i = 0, ordenadas_1 = ordenadas; _i < ordenadas_1.length; _i++) {
            var acao = ordenadas_1[_i];
            console.log("[Rodada " + acao.rodada + "] " +
                acao.descricao +
                " (Valor: " + acao.valor + ")");
        }
    };
    LogicaBatalha.prototype.resumoBatalha = function () {
        var vencedor = this.verificarVencedor();
        var texto = "\n===== RESUMO DA BATALHA =====\n";
        texto += "Estado final: " + this._estado + "\n";
        texto += "Rodadas: " + (this._rodada - 1) + "\n";
        texto += "Total de ações: " + this._acoes.length + "\n";
        texto += "Vencedor: " + (vencedor ? vencedor.nome : "Nenhum") + "\n\n";
        texto += "Estatísticas dos personagens:\n";
        for (var _i = 0, _a = this._personagens; _i < _a.length; _i++) {
            var p = _a[_i];
            var e = p.getEstatisticas();
            texto += "- " + e.nome + ": ";
            texto += "Dano causado=" + e.danoCausado + ", ";
            texto += "Dano recebido=" + e.danoRecebido + ", ";
            texto += "Abates=" + e.abates + ", ";
            texto += "Vida final=" + e.vidaFinal + "\n";
        }
        return texto;
    };
    LogicaBatalha.prototype.salvarEmArquivo = function (caminho) {
        var vencedor = this.verificarVencedor();
        var dados = {
            estado: this._estado,
            rodada: this._rodada,
            vencedor: vencedor ? vencedor.nome : null,
            personagens: this._personagens.map(function (p) { return p.toJSON(); }),
            acoes: this._acoes.map(function (a) { return a.toJSON(); })
        };
        fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
    };
    LogicaBatalha.prototype.carregarDeArquivo = function (caminho) {
        if (!fs.existsSync(caminho)) {
            throw new Error("Arquivo não encontrado");
        }
        var dados = JSON.parse(fs.readFileSync(caminho, "utf-8"));
        this._estado = dados.estado;
        this._rodada = dados.rodada;
        this._personagens = [];
        this._acoes = [];
        for (var _i = 0, _a = dados.personagens; _i < _a.length; _i++) {
            var p = _a[_i];
            this._personagens.push(registroPersonagem_1.registroPersonagem.criar(p));
        }
        for (var _b = 0, _c = dados.acoes; _b < _c.length; _b++) {
            var a = _c[_b];
            this._acoes.push(acoes_1.Acao.fromJSON(a, this._personagens));
        }
    };
    return LogicaBatalha;
}());
exports.LogicaBatalha = LogicaBatalha;
//# sourceMappingURL=logicaBatalha.js.map