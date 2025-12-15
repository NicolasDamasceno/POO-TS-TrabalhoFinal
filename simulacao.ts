import * as readline from "readline";
import * as fs from "fs";
import * as path from "path";
import { Batalha } from "./batalha";
import { Guerreiro, Mago, Arqueiro, PersonagemCustomizado, Letalis, Guardiao } from "./subClasses";
import { TipoAcao } from "./acoes";



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(texto: string): Promise<string> {
    return new Promise(resolve => rl.question(texto, resolve));
}

const PASTA_SAVES = "saves";
if (!fs.existsSync(PASTA_SAVES)) {
    fs.mkdirSync(PASTA_SAVES);
}

function listarBatalhasSalvas(): string[] {
    return fs.readdirSync(PASTA_SAVES).filter(arq => arq.endsWith(".json"));
}

async function main() {
    const batalha = new Batalha();
    console.log("===================================");
    console.log("      SISTEMA DE BATALHA RPG");
    console.log("===================================");

    const batalhas = listarBatalhasSalvas();
    if (batalhas.length > 0) {
        console.log("\nBATALHAS SALVAS:");
        batalhas.forEach((b, i) => console.log(`${i + 1} - ${b}`));
        console.log("0 - Iniciar nova batalha");

        const escolha = Number(await perguntar("\nEscolha uma opção: "));
        if (escolha > 0 && escolha <= batalhas.length) {
            const caminho = path.join(PASTA_SAVES, batalhas[escolha - 1]);
            batalha.carregarDeArquivo(caminho);
            console.log("Batalha carregada em modo histórico.");
        } else {
            console.log("Nova batalha será criada.");
        }
    } else {
        console.log("Nenhuma batalha salva encontrada.");
        console.log("Nova batalha iniciada.");
    }

    let sair = false;
    while (!sair) {
        const estado = batalha.obterEstado();
        const qtdPersonagens = batalha.getPersonagens().length;

        console.log("\n===================================");
        console.log("              MENU");
        console.log("===================================");

        console.log("\nPERSONAGENS");
        if (estado === "NAO_INICIADA") {
            console.log("1 - Criar Guerreiro");
            console.log("2 - Criar Mago");
            console.log("3 - Criar Arqueiro");
            console.log("4 - Criar Personagem Customizado");
            console.log("5 - Criar Letalis");
            console.log("6 - Criar Guardião");
        } else {
            console.log("Criação de personagens bloqueada (batalha em andamento)");
        }

        if (qtdPersonagens < 2) {
            console.log("Mínimo de 2 personagens para iniciar a batalha");
        }

        console.log("\nBATALHA");
        if (estado === "NAO_INICIADA" && qtdPersonagens >= 2) {
            console.log("7 - Iniciar Batalha");
        }
        if (estado === "EM_ANDAMENTO") {
            console.log("8 - Executar Turno Aleatório");
            console.log("9 - Executar Turno Manual");
            console.log("10 - Encerrar Batalha");
        }

        console.log("\nCONSULTAS");
        console.log("11 - Listar Vivos e Mortos");
        console.log("12 - Estatísticas dos Personagens");
        if (estado !== "NAO_INICIADA") {
            console.log("13 - Filtrar Ações");
            console.log("14 - Extrato / Replay da Batalha");
            console.log("15 - Resumo da Batalha");
        }
        console.log("16 - Estado Atual da Batalha");
        console.log("17 - Consultar Personagem por Nome");

        console.log("\nSISTEMA");
        console.log("0 - Salvar e Encerrar");

        const op = await perguntar("\nEscolha uma opção: ");
        try {
            switch (op) {
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                    if (estado !== "NAO_INICIADA") {
                        console.log("Não é possível criar personagens após iniciar a batalha.");
                        break;
                    }

                    if (op === "1") {
                        batalha.adicionarPersonagem(
                            new Guerreiro(
                                Number(await perguntar("Id: ")),
                                await perguntar("Nome: "),
                                Number(await perguntar("Vida: ")),
                                Number(await perguntar("Ataque: ")),
                                Number(await perguntar("Defesa: "))
                            )
                        );
                        console.log("Guerreiro criado!");
                    }

                    if (op === "2") {
                        batalha.adicionarPersonagem(
                            new Mago(
                                Number(await perguntar("Id: ")),
                                await perguntar("Nome: "),
                                Number(await perguntar("Vida: ")),
                                Number(await perguntar("Ataque mágico: "))
                            )
                        );
                        console.log("Mago criado!");
                    }

                    if (op === "3") {
                        batalha.adicionarPersonagem(
                            new Arqueiro(
                                Number(await perguntar("Id: ")),
                                await perguntar("Nome: "),
                                Number(await perguntar("Vida: ")),
                                Number(await perguntar("Ataque: ")),
                                Number(await perguntar("Multiplicador do ataque múltiplo: "))
                            )
                        );
                        console.log("Arqueiro criado!");
                    }

                    if (op === "4") {
                        batalha.adicionarPersonagem(
                            new PersonagemCustomizado(
                                Number(await perguntar("Id: ")),
                                await perguntar("Nome: "),
                                Number(await perguntar("Vida: ")),
                                Number(await perguntar("Ataque: ")),
                                await perguntar("Tipo customizado: "),
                                Number(await perguntar("Roubo de vida (%): ")),
                                Number(await perguntar("Chance crítica (%): "))
                            )
                        );
                        console.log("Personagem customizado criado!");
                    }

                    if (op == "5") {
                        batalha.adicionarPersonagem(
                            new Letalis(
                                Number(await perguntar("Id: ")),
                                await perguntar("Nome: "),
                                Number(await perguntar("Vida: ")),
                                Number(await perguntar("Ataque fatal: "))
                            )
                        );
                        console.log("Letalis criado!");
                    }
                    if (op == "6") {
                        batalha.adicionarPersonagem(
                            new Guardiao(
                                Number(await perguntar("Id: ")),
                                await perguntar("Nome: "),
                                Number(await perguntar("Vida: ")),
                                Number(await perguntar("Ataque impossível: "))
                            )
                        );
                        console.log("Guardião criado!");
                    }
                    break;

                case "7":
                    batalha.iniciarBatalha();
                    console.log("Batalha iniciada!");
                    break;

                case "8": {
                    if (estado !== "EM_ANDAMENTO") break;
                    const vivos = batalha.listarPersonagensVivos();
                    const atacante = vivos[Math.floor(Math.random() * vivos.length)];
                    let defensor = vivos[Math.floor(Math.random() * vivos.length)];
                    while (atacante.id === defensor.id) {
                        defensor = vivos[Math.floor(Math.random() * vivos.length)];
                    }

                    batalha.turno(atacante.id, defensor.id);
                    console.log(`${atacante.nome} atacou ${defensor.nome}`);
                    break;
                }

                case "9": {
                    if (estado !== "EM_ANDAMENTO") break;
                    batalha.getPersonagens().forEach((p, i) =>
                        console.log(`ID ${p.id} - ${p.nome} (${p.estaVivo() ? "VIVO" : "MORTO"})`)
                    );

                    const escolhaAtacante = Number(await perguntar("Escolha o atacante: "));
                    const escolhaDefensor = Number(await perguntar("Escolha o defensor: "));
                    const atacante = batalha.getPersonagens()[escolhaAtacante - 1];
                    const defensor = batalha.getPersonagens()[escolhaDefensor - 1];

                    if (!atacante || !defensor) {
                        console.log("Escolha inválida.");
                        break;
                    }

                    batalha.turno(atacante.id, defensor.id);
                    break;
                }

                case "10":
                    if (estado !== "EM_ANDAMENTO") {
                        console.log("Não é possível encerrar batalha que não está em andamento.");
                        break;
                    }

                    console.log("Batalha encerrada previamente por desistência de ambas as partes.");
                    batalha.finalizarBatalha();
                    console.log("\nResultado: EMPATE POR DESISTÊNCIA");
                    break;

                case "11":
                    console.log("\nVIVOS:");
                    batalha.listarPersonagensVivos().forEach(p => console.log(`- ${p.nome}`));
                    console.log("\nMORTOS:");
                    batalha.listarPersonagensMortos().forEach(p => console.log(`- ${p.nome}`));
                    break;

                case "12":
                    batalha.getPersonagens().forEach(p => {
                        const e = p.getEstatisticas();
                        console.log(
                            `${e.nome} | Dano causado: ${e.danoCausado} | ` +
                            `Dano recebido: ${e.danoRecebido} | Abates: ${e.abates} | Vida final: ${e.vidaFinal}`
                        );
                    });
                    break;

                    case "13": {
                        const personagens = batalha.getPersonagens();
                        personagens.forEach(p => {
                            console.log(`ID ${p.id} - ${p.nome}`);
                        });
                    
                        const idPersonagem = Number(await perguntar("Digite o ID do personagem: "));
                        const personagem = personagens.find(p => p.id === idPersonagem);
                    
                        if (!personagem) {
                            console.log("Personagem inválido.");
                            break;
                        }
                    
                        const acoesDoPersonagem = batalha.listarAcoesPorPersonagem(personagem.id); 
                        if (acoesDoPersonagem.length === 0) {
                            console.log("Nenhuma ação registrada para este personagem.");
                            break;
                        }
                    
                        const tiposUnicos: TipoAcao[] = [];
                        acoesDoPersonagem.forEach(a => {
                        if (!tiposUnicos.includes(a.tipo)) {
                            tiposUnicos.push(a.tipo);
                        }
                        });

                        if (
                            personagem.constructor.name === "Arqueiro" &&
                            !tiposUnicos.includes(TipoAcao.ATAQUE)
                        ) {
                            tiposUnicos.push(TipoAcao.ATAQUE);
                        }

                        console.log("\nTIPOS DE AÇÃO DISPONÍVEIS");
                        console.log("0 - Todas");
                    
                        tiposUnicos.forEach((tipo, i) => {
                            console.log(`${i + 1} - ${TipoAcao[tipo]}`);
                        });
                    
                        const escolhaTipo = Number(
                            await perguntar("Escolha um tipo de ação: ")
                        );      
                        let tiposSelecionados: TipoAcao[] | undefined = undefined;    
                        if (escolhaTipo > 0 && escolhaTipo <= tiposUnicos.length) {
                            tiposSelecionados = [tiposUnicos[escolhaTipo - 1]];
                        }
                    
                        const acoes = batalha.filtrarAcoes({
                            personagemId: personagem.id,
                            tipos: tiposSelecionados
                        });
                    
                        if (acoes.length === 0) {
                            console.log("Nenhuma ação encontrada.");
                            break;
                        }
                    
                        console.log("\nAÇÕES FILTRADAS:");
                        acoes.forEach((a, i) => {
                            let descricao = a.descricao;
                            if (!descricao || descricao.trim() === "") {
                                descricao = "Ação sem descrição";
                            }
                    
                            console.log(
                                `${i + 1} - Rodada ${a.rodada} | ${TipoAcao[a.tipo]} | ${descricao} | Valor ${a.valorDano}`
                            );
                        });
                    
                        break;
                    }                                        

                case "14":
                    batalha.replay();
                    break;

                case "15":
                    console.log(batalha.resumoBatalha());
                    break;

                case "16":
                    console.log("Estado atual:", estado);
                    break;

                case "17": {
                    if (qtdPersonagens === 0) {
                        console.log("Nenhum personagem criado para consulta.");
                        break;
                    }
                    const nome = await perguntar("Nome do personagem: ");
                    if (!nome.trim()) {
                        console.log("Nome inválido.");
                        break;
                    }

                    const p = batalha.consultarPersonagem(nome);
                    const e = p.getEstatisticas();
                    console.log("\n===================================");
                    console.log("        FICHA DO PERSONAGEM");
                    console.log("===================================");
                    console.log(`Nome: ${e.nome}`);
                    console.log(`Classe: ${p.constructor.name}`);
                    console.log(`Vida atual: ${p.vida}`);
                    console.log(`Dano causado: ${e.danoCausado}`);
                    console.log(`Dano recebido: ${e.danoRecebido}`);
                    console.log(`Abates: ${e.abates}`);
                    console.log(`Status: ${p.estaVivo() ? "VIVO" : "MORTO"}`);
                    console.log("===================================");
                    break;
                }

                case "0": {
                    const nomeArquivo = `batalha_${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
                    batalha.salvarEmArquivo(path.join(PASTA_SAVES, nomeArquivo));
                    console.log("Batalha salva. Encerrando...");
                    sair = true;
                    break;
                }

                default:
                    console.log("Opção inválida.");
            }

        } catch (e: any) {
            console.log("Erro:", e.message);
        }
    }

    rl.close();
}
main();