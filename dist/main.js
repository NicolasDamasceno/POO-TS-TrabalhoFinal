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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = __importStar(require("readline"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var logicaBatalha_1 = require("./logicaBatalha");
var subClasses_1 = require("./subClasses");
var acoes_1 = require("./acoes");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function perguntar(texto) {
    return new Promise(function (resolve) { return rl.question(texto, resolve); });
}
var PASTA_SAVES = "saves";
if (!fs.existsSync(PASTA_SAVES)) {
    fs.mkdirSync(PASTA_SAVES);
}
function listarBatalhasSalvas() {
    return fs.readdirSync(PASTA_SAVES).filter(function (arq) { return arq.endsWith(".json"); });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var batalha, batalhas, escolha, _a, caminho, sair, _loop_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batalha = new logicaBatalha_1.LogicaBatalha();
                    console.log("===================================");
                    console.log("      SISTEMA DE BATALHA RPG");
                    console.log("===================================");
                    batalhas = listarBatalhasSalvas();
                    if (!(batalhas.length > 0)) return [3 /*break*/, 2];
                    console.log("\n📂 BATALHAS SALVAS:");
                    batalhas.forEach(function (b, i) { return console.log("".concat(i + 1, " - ").concat(b)); });
                    console.log("0 - Iniciar nova batalha");
                    _a = Number;
                    return [4 /*yield*/, perguntar("\nEscolha uma opção: ")];
                case 1:
                    escolha = _a.apply(void 0, [_b.sent()]);
                    if (escolha > 0 && escolha <= batalhas.length) {
                        caminho = path.join(PASTA_SAVES, batalhas[escolha - 1]);
                        batalha.carregarDeArquivo(caminho);
                        console.log("✔ Batalha carregada em modo histórico.");
                    }
                    else {
                        console.log("🆕 Nova batalha será criada.");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    console.log("ℹ Nenhuma batalha salva encontrada.");
                    console.log("🆕 Nova batalha iniciada.");
                    _b.label = 3;
                case 3:
                    sair = false;
                    _loop_1 = function () {
                        var estado, qtdPersonagens, op, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, vivos, atacante, defensor, idAtacante_1, _15, idDefensor_1, _16, atacante, defensor, nome, tipo, acoes, nomeArquivo, e_1;
                        return __generator(this, function (_17) {
                            switch (_17.label) {
                                case 0:
                                    estado = batalha.obterEstado();
                                    qtdPersonagens = batalha.getPersonagens().length;
                                    console.log("\n===================================");
                                    console.log("              MENU");
                                    console.log("===================================");
                                    console.log("\n📌 PERSONAGENS");
                                    if (estado === "NAO_INICIADA") {
                                        console.log("1 - Criar Guerreiro");
                                        console.log("2 - Criar Mago");
                                        console.log("3 - Criar Arqueiro");
                                        console.log("4 - Criar Personagem Customizado");
                                    }
                                    else {
                                        console.log("⚠ Criação de personagens bloqueada (batalha em andamento)");
                                    }
                                    if (qtdPersonagens < 2) {
                                        console.log("⚠ Mínimo de 2 personagens para iniciar a batalha");
                                    }
                                    console.log("\n⚔ BATALHA");
                                    if (estado === "NAO_INICIADA" && qtdPersonagens >= 2) {
                                        console.log("5 - Iniciar Batalha");
                                    }
                                    if (estado === "EM_ANDAMENTO") {
                                        console.log("6 - Executar Turno Aleatório");
                                        console.log("7 - Executar Turno Manual");
                                    }
                                    console.log("\n📊 CONSULTAS");
                                    console.log("8  - Listar Vivos e Mortos");
                                    console.log("9  - Estatísticas dos Personagens");
                                    console.log("10 - Filtrar Ações");
                                    console.log("11 - Extrato / Replay da Batalha");
                                    if (estado !== "NAO_INICIADA") {
                                        console.log("12 - Resumo da Batalha");
                                    }
                                    console.log("13 - Estado Atual da Batalha");
                                    console.log("\n💾 SISTEMA");
                                    console.log("0 - Salvar e Encerrar");
                                    return [4 /*yield*/, perguntar("\n👉 Escolha uma opção: ")];
                                case 1:
                                    op = _17.sent();
                                    _17.label = 2;
                                case 2:
                                    _17.trys.push([2, 49, , 50]);
                                    _c = op;
                                    switch (_c) {
                                        case "1": return [3 /*break*/, 3];
                                        case "2": return [3 /*break*/, 3];
                                        case "3": return [3 /*break*/, 3];
                                        case "4": return [3 /*break*/, 3];
                                        case "5": return [3 /*break*/, 33];
                                        case "6": return [3 /*break*/, 34];
                                        case "7": return [3 /*break*/, 35];
                                        case "8": return [3 /*break*/, 38];
                                        case "9": return [3 /*break*/, 39];
                                        case "10": return [3 /*break*/, 40];
                                        case "11": return [3 /*break*/, 43];
                                        case "12": return [3 /*break*/, 44];
                                        case "13": return [3 /*break*/, 45];
                                        case "0": return [3 /*break*/, 46];
                                    }
                                    return [3 /*break*/, 47];
                                case 3:
                                    if (estado !== "NAO_INICIADA") {
                                        console.log("❌ Não é possível criar personagens após iniciar a batalha.");
                                        return [3 /*break*/, 48];
                                    }
                                    if (!(op === "1")) return [3 /*break*/, 10];
                                    _e = (_d = batalha).adicionarPersonagem;
                                    _f = subClasses_1.Guerreiro.bind;
                                    _g = Number;
                                    return [4 /*yield*/, perguntar("Id: ")];
                                case 4:
                                    _h = [void 0, _g.apply(void 0, [_17.sent()])];
                                    return [4 /*yield*/, perguntar("Nome: ")];
                                case 5:
                                    _h = _h.concat([_17.sent()]);
                                    _j = Number;
                                    return [4 /*yield*/, perguntar("Vida atual: ")];
                                case 6:
                                    _h = _h.concat([_j.apply(void 0, [_17.sent()])]);
                                    _k = Number;
                                    return [4 /*yield*/, perguntar("Vida máxima: ")];
                                case 7:
                                    _h = _h.concat([_k.apply(void 0, [_17.sent()])]);
                                    _l = Number;
                                    return [4 /*yield*/, perguntar("Ataque: ")];
                                case 8:
                                    _h = _h.concat([_l.apply(void 0, [_17.sent()])]);
                                    _m = Number;
                                    return [4 /*yield*/, perguntar("Defesa: ")];
                                case 9:
                                    _e.apply(_d, [new (_f.apply(subClasses_1.Guerreiro, _h.concat([_m.apply(void 0, [_17.sent()])])))()]);
                                    console.log("✔ Guerreiro criado!");
                                    _17.label = 10;
                                case 10:
                                    if (!(op === "2")) return [3 /*break*/, 16];
                                    _p = (_o = batalha).adicionarPersonagem;
                                    _q = subClasses_1.Mago.bind;
                                    _r = Number;
                                    return [4 /*yield*/, perguntar("Id: ")];
                                case 11:
                                    _s = [void 0, _r.apply(void 0, [_17.sent()])];
                                    return [4 /*yield*/, perguntar("Nome: ")];
                                case 12:
                                    _s = _s.concat([_17.sent()]);
                                    _t = Number;
                                    return [4 /*yield*/, perguntar("Vida atual: ")];
                                case 13:
                                    _s = _s.concat([_t.apply(void 0, [_17.sent()])]);
                                    _u = Number;
                                    return [4 /*yield*/, perguntar("Vida máxima: ")];
                                case 14:
                                    _s = _s.concat([_u.apply(void 0, [_17.sent()])]);
                                    _v = Number;
                                    return [4 /*yield*/, perguntar("Ataque mágico: ")];
                                case 15:
                                    _p.apply(_o, [new (_q.apply(subClasses_1.Mago, _s.concat([_v.apply(void 0, [_17.sent()])])))()]);
                                    console.log("✔ Mago criado!");
                                    _17.label = 16;
                                case 16:
                                    if (!(op === "3")) return [3 /*break*/, 23];
                                    _x = (_w = batalha).adicionarPersonagem;
                                    _y = subClasses_1.Arqueiro.bind;
                                    _z = Number;
                                    return [4 /*yield*/, perguntar("Id: ")];
                                case 17:
                                    _0 = [void 0, _z.apply(void 0, [_17.sent()])];
                                    return [4 /*yield*/, perguntar("Nome: ")];
                                case 18:
                                    _0 = _0.concat([_17.sent()]);
                                    _1 = Number;
                                    return [4 /*yield*/, perguntar("Vida atual: ")];
                                case 19:
                                    _0 = _0.concat([_1.apply(void 0, [_17.sent()])]);
                                    _2 = Number;
                                    return [4 /*yield*/, perguntar("Vida máxima: ")];
                                case 20:
                                    _0 = _0.concat([_2.apply(void 0, [_17.sent()])]);
                                    _3 = Number;
                                    return [4 /*yield*/, perguntar("Ataque: ")];
                                case 21:
                                    _0 = _0.concat([_3.apply(void 0, [_17.sent()])]);
                                    _4 = Number;
                                    return [4 /*yield*/, perguntar("Multiplicador do ataque múltiplo: ")];
                                case 22:
                                    _x.apply(_w, [new (_y.apply(subClasses_1.Arqueiro, _0.concat([_4.apply(void 0, [_17.sent()])])))()]);
                                    console.log("✔ Arqueiro criado!");
                                    _17.label = 23;
                                case 23:
                                    if (!(op === "4")) return [3 /*break*/, 32];
                                    _6 = (_5 = batalha).adicionarPersonagem;
                                    _7 = subClasses_1.PersonagemCustomizado.bind;
                                    _8 = Number;
                                    return [4 /*yield*/, perguntar("Id: ")];
                                case 24:
                                    _9 = [void 0, _8.apply(void 0, [_17.sent()])];
                                    return [4 /*yield*/, perguntar("Nome: ")];
                                case 25:
                                    _9 = _9.concat([_17.sent()]);
                                    _10 = Number;
                                    return [4 /*yield*/, perguntar("Vida atual: ")];
                                case 26:
                                    _9 = _9.concat([_10.apply(void 0, [_17.sent()])]);
                                    _11 = Number;
                                    return [4 /*yield*/, perguntar("Vida máxima: ")];
                                case 27:
                                    _9 = _9.concat([_11.apply(void 0, [_17.sent()])]);
                                    _12 = Number;
                                    return [4 /*yield*/, perguntar("Ataque: ")];
                                case 28:
                                    _9 = _9.concat([_12.apply(void 0, [_17.sent()])]);
                                    return [4 /*yield*/, perguntar("Tipo customizado: ")];
                                case 29:
                                    _9 = _9.concat([_17.sent()]);
                                    _13 = Number;
                                    return [4 /*yield*/, perguntar("Roubo de vida (%): ")];
                                case 30:
                                    _9 = _9.concat([_13.apply(void 0, [_17.sent()])]);
                                    _14 = Number;
                                    return [4 /*yield*/, perguntar("Chance crítica (%): ")];
                                case 31:
                                    _6.apply(_5, [new (_7.apply(subClasses_1.PersonagemCustomizado, _9.concat([_14.apply(void 0, [_17.sent()])])))()]);
                                    console.log("✔ Personagem customizado criado!");
                                    _17.label = 32;
                                case 32: return [3 /*break*/, 48];
                                case 33:
                                    batalha.iniciarBatalha();
                                    console.log("🔥 Batalha iniciada!");
                                    return [3 /*break*/, 48];
                                case 34:
                                    {
                                        if (estado !== "EM_ANDAMENTO")
                                            return [3 /*break*/, 48];
                                        vivos = batalha.listarPersonagensVivos();
                                        atacante = vivos[Math.floor(Math.random() * vivos.length)];
                                        defensor = vivos[Math.floor(Math.random() * vivos.length)];
                                        while (atacante.id === defensor.id) {
                                            defensor = vivos[Math.floor(Math.random() * vivos.length)];
                                        }
                                        batalha.executarTurno(atacante, defensor);
                                        console.log("\u2694 ".concat(atacante.nome, " atacou ").concat(defensor.nome));
                                        return [3 /*break*/, 48];
                                    }
                                    _17.label = 35;
                                case 35:
                                    if (estado !== "EM_ANDAMENTO")
                                        return [3 /*break*/, 48];
                                    batalha.getPersonagens().forEach(function (p) {
                                        return console.log("ID ".concat(p.id, " - ").concat(p.nome, " (").concat(p.estaVivo() ? "VIVO" : "MORTO", ")"));
                                    });
                                    _15 = Number;
                                    return [4 /*yield*/, perguntar("ID do atacante: ")];
                                case 36:
                                    idAtacante_1 = _15.apply(void 0, [_17.sent()]);
                                    _16 = Number;
                                    return [4 /*yield*/, perguntar("ID do defensor: ")];
                                case 37:
                                    idDefensor_1 = _16.apply(void 0, [_17.sent()]);
                                    atacante = batalha.getPersonagens().find(function (p) { return p.id === idAtacante_1; });
                                    defensor = batalha.getPersonagens().find(function (p) { return p.id === idDefensor_1; });
                                    if (!atacante || !defensor) {
                                        console.log("❌ IDs inválidos.");
                                        return [3 /*break*/, 48];
                                    }
                                    batalha.executarTurno(atacante, defensor);
                                    console.log("\u2694 ".concat(atacante.nome, " atacou ").concat(defensor.nome));
                                    return [3 /*break*/, 48];
                                case 38:
                                    console.log("\n🟢 VIVOS:");
                                    batalha.listarPersonagensVivos().forEach(function (p) { return console.log("- ".concat(p.nome)); });
                                    console.log("\n🔴 MORTOS:");
                                    batalha.listarPersonagensMortos().forEach(function (p) { return console.log("- ".concat(p.nome)); });
                                    return [3 /*break*/, 48];
                                case 39:
                                    batalha.getPersonagens().forEach(function (p) {
                                        var e = p.getEstatisticas();
                                        console.log("".concat(e.nome, " | Dano causado: ").concat(e.danoCausado, " | ") +
                                            "Dano recebido: ".concat(e.danoRecebido, " | Abates: ").concat(e.abates, " | Vida final: ").concat(e.vidaFinal));
                                    });
                                    return [3 /*break*/, 48];
                                case 40: return [4 /*yield*/, perguntar("Personagem (ENTER para ignorar): ")];
                                case 41:
                                    nome = _17.sent();
                                    return [4 /*yield*/, perguntar("Tipo (ATAQUE, MAGIA, ATAQUE_MULTIPLO, AUTODANO): ")];
                                case 42:
                                    tipo = _17.sent();
                                    acoes = batalha.filtrarAcoes({
                                        personagem: nome || undefined,
                                        tipo: tipo ? acoes_1.TipoAcao[tipo] : undefined
                                    });
                                    acoes.forEach(function (a) {
                                        return console.log("[Rodada ".concat(a.rodada, "] ").concat(a.tipo, " | ").concat(a.origem.nome, " \u2192 ").concat(a.alvo.nome));
                                    });
                                    return [3 /*break*/, 48];
                                case 43:
                                    batalha.replay();
                                    return [3 /*break*/, 48];
                                case 44:
                                    console.log(batalha.resumoBatalha());
                                    return [3 /*break*/, 48];
                                case 45:
                                    console.log("📌 Estado atual:", estado);
                                    return [3 /*break*/, 48];
                                case 46:
                                    {
                                        nomeArquivo = "batalha_".concat(new Date().toISOString().replace(/[:.]/g, "-"), ".json");
                                        batalha.salvarEmArquivo(path.join(PASTA_SAVES, nomeArquivo));
                                        console.log("💾 Batalha salva. Encerrando...");
                                        sair = true;
                                        return [3 /*break*/, 48];
                                    }
                                    _17.label = 47;
                                case 47:
                                    console.log("❌ Opção inválida.");
                                    _17.label = 48;
                                case 48: return [3 /*break*/, 50];
                                case 49:
                                    e_1 = _17.sent();
                                    console.log("❌ Erro:", e_1.message);
                                    return [3 /*break*/, 50];
                                case 50: return [2 /*return*/];
                            }
                        });
                    };
                    _b.label = 4;
                case 4:
                    if (!!sair) return [3 /*break*/, 6];
                    return [5 /*yield**/, _loop_1()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 6:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=main.js.map