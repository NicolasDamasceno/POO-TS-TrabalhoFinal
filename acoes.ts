import { Personagem } from "./personagemBase";

enum TipoAcao {
    ATAQUE = "ATAQUE",
    MAGIA = "MAGIA",
    ATAQUE_MULTIPLO = "ATAQUE_MULTIPLO",
    AUTODANO = "AUTODANO"
}
let contadorId = 1;

class Acao {
    private _id: number;
    private _origem: Personagem;
    private _alvo: Personagem;
    private _tipo: TipoAcao;
    private _valor: number;
    private _descricao: string;
    private _dataHora: Date;
    private _rodada: number = 0;

    constructor( origem: Personagem, alvo: Personagem, tipo: TipoAcao, valor: number, descricao: string
    ) {
        this._id = contadorId++;
        this._origem = origem;
        this._alvo = alvo;
        this._tipo = tipo;
        this._valor = valor;
        this._descricao = descricao;
        this._dataHora = new Date();
    }

    get id(): number {
        return this._id;
    }

    get origem(): Personagem {
        return this._origem;
    }

    get alvo(): Personagem {
        return this._alvo;
    }

    get tipo(): TipoAcao {
        return this._tipo;
    }

    get valor(): number {
        return this._valor;
    }

    get descricao(): string {
        return this._descricao;
    }

    get dataHora(): Date {
        return this._dataHora;
    }

    get rodada(): number {
        return this._rodada;
    }

    set rodada(valor: number) {
        this._rodada = valor;
    }

    toJSON() {
        return {
            id: this._id,
            origem: this._origem.nome,
            alvo: this._alvo.nome,
            tipo: this._tipo,
            valor: this._valor,
            descricao: this._descricao,
            rodada: this._rodada,
            dataHora: this._dataHora.toISOString()
        };
    }

    static fromJSON(dados: any, personagens: Personagem[]): Acao {
        const origem = personagens.find(p => p.nome === dados.origem);
        const alvo = personagens.find(p => p.nome === dados.alvo);
    
        if (!origem || !alvo) {
            throw new Error("Erro ao reconstruir ação");
        }
    
        const acao = new Acao(
            origem,
            alvo,
            dados.tipo,
            dados.valor,
            dados.descricao
        ); 
        acao.rodada = dados.rodada;
        return acao;
    }    
}

export { Acao, TipoAcao };