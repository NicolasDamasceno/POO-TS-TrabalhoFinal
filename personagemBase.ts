import { Acao, TipoAcao } from "./acoes";

class Personagem {
    private _id: number;
    private _nome: string;
    private _vida: number;
    private _vidaMaxima: number; // O atributo Vida Máxima guarda o valor da Vida sem ser alterado, será usado para Cálculos de ataques
    private _ataqueBase: number;
    private _defesaBase: number;
    private _historico: Acao[] = []

    constructor(id:number, nome:string, vida:number, vidaMaxima:number ,ataqueBase:number, defesaBase:number){
        this._id = id,
        this._nome = nome,
        this._vida = vida;
        this._vidaMaxima = vidaMaxima;
        this._ataqueBase = ataqueBase,
        this._defesaBase = defesaBase
    }

    // Get para retorna os atributos
    get id():number{
        return this._id
    }
    get nome():string{
        return this._nome
    }
    get vida():number{
        return this._vida
    }
    get vidaMaxima(): number{
        return this._vidaMaxima
    }
    get ataqueBase():number{
        return this._ataqueBase
    }
    get defesaBase():number{
        return this._defesaBase
    }
    estaVivo():boolean{
        return this._vida > 0
    }

    // O método atacar vazio para que as classes filhas o implementem
    atacar(alvo:Personagem):Acao{
        let acao = new Acao(this,alvo,TipoAcao.ATAQUE,0);
        return acao 
    };

    receberDano(valor: number):void{
        this._vida -= valor;
        if (this._vida < 0){
            this._vida = 0
        }
    }

    registrarAcao(acao:Acao): void{
        this._historico.push(acao);
    }

    regastarHistorico(): Acao[]{
        return this._historico
    }
}

export {Personagem}