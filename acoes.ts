import { Personagem } from "./personagemBase";
enum TipoAcao{
    ATAQUE = "Ataque Físico",
    MAGIA = "Magia",
    CRITICO = "Ataque Crítico",
    ATAQUE_DUPLO = "Ataque Duplo",
    FALHA = "Falha",
    DEFESA = "Defesa",
    CURA = "Cura"
}

class Acao{
    private _origem: Personagem;
    private _alvo: Personagem;
    private _tipo: TipoAcao;
    private _valorDano: number;
    private _dataHora: Date;

    constructor(origem: Personagem, alvo: Personagem, tipo: TipoAcao, valorDano: number){
        this._origem = origem;
        this._alvo = alvo;
        this._tipo = tipo;
        this._valorDano = valorDano;
        this._dataHora = new Date();
    }

    // Métodos Get de Ação
    get origem():Personagem{
        return this._origem
    }
    get alvo():Personagem{
        return this._alvo
    }
    get tipo():TipoAcao{
        return this._tipo
    }
    get valorDano():number{
        return this._valorDano
    }
    get dataHora():Date{
        return this._dataHora
    }

}

export {Acao, TipoAcao}