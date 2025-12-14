import { Personagem } from "./personagem";
import { Acao, TipoAcao } from "./acoes";

class Guerreiro extends Personagem {
    protected _defesa: number;
    private _vidaInicial: number;

    constructor(id: number, nome: string, vida: number, ataque: number, defesa: number) {
        super(id, nome, vida, ataque);
        if (defesa <= 0) throw new Error("Defesa inválida");
        this._defesa = defesa;
        this._vidaInicial = vida;
    }

    public set vidaInicial(v: number) {
        this._vidaInicial = v;
    }

    public get vidaInicial(): number {
        return this._vidaInicial;
    }

    atacar(alvo: Personagem): Acao[] {
        if (!this.estaVivo()) throw new Error("Guerreiro morto");
        if (!alvo.estaVivo()) throw new Error("Alvo morto");
        if (this === alvo) throw new Error("Ataque inválido");

        const enfurecido = this.vida < this._vidaInicial * 0.3;
        let dano = this.ataque;

        if (enfurecido) {
            dano = Math.floor(dano * 1.3);
        }

        let danoFinal = dano;

        if (alvo instanceof Guerreiro) {
            if (danoFinal <= alvo._defesa || danoFinal <= alvo._ataque) {
                danoFinal = 0;
            } else {
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
            ? TipoAcao.ATAQUE_ENFURECIDO
            : TipoAcao.ATAQUE;

        const descricao =
            danoFinal === 0
                ? `${this.nome} ataca ${alvo.nome}, mas o ataque é BLOQUEADO pela defesa.`
                : enfurecido
                    ? `${this.nome} desfere um ATAQUE ENFURECIDO em ${alvo.nome}!`
                    : `${this.nome} ataca ${alvo.nome} com sua espada.`;

        const acao = new Acao(
            this,
            alvo,
            tipoAcao,
            danoFinal,
            descricao
        );

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

class Mago extends Personagem {
    atacar(alvo: Personagem): Acao[] {
        if (!this.estaVivo()) throw new Error("Mago morto");
        if (!alvo.estaVivo()) throw new Error("Alvo morto");
        if (this === alvo) throw new Error("Ataque inválido");

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

        const acaoAtaque = new Acao(
            this,
            alvo,
            TipoAcao.MAGIA,
            danoFinal,
            danoFinal === 0
                ? `${this.nome} lança magia em ${alvo.nome}, mas o ataque falha.`
                : `${this.nome} lança magia em ${alvo.nome}.`
        );

        this.receberDano(10);

        const acaoAutodano = new Acao(
            this,
            this,
            TipoAcao.AUTODANO,
            10,
            `${this.nome} sofre o custo da magia.`
        );

        this.registrarAcao(acaoAtaque);
        alvo.registrarAcao(acaoAtaque);
        this.registrarAcao(acaoAutodano);

        return [acaoAtaque, acaoAutodano];
    }
}

class Arqueiro extends Personagem {
    protected _ataqueMultiplo: number;

    constructor(id: number, nome: string, vida: number, ataque: number, ataqueMultiplo: number
    ) {
        super(id, nome, vida, ataque);

        if (!Number.isFinite(ataqueMultiplo) || ataqueMultiplo < 2) {
            throw new Error("Ataque múltiplo inválido");
        }

        this._ataqueMultiplo = ataqueMultiplo;
    }

    atacar(alvo: Personagem): Acao[] {
        if (!this.estaVivo()) throw new Error("Arqueiro morto");
        if (!alvo.estaVivo()) throw new Error("Alvo morto");
        if (this === alvo) throw new Error("Ataque inválido");

        let dano = this.ataque;
        let tipoAcao = TipoAcao.ATAQUE;
        let descricao = `${this.nome} dispara flecha em ${alvo.nome}.`;

        if (Math.random() < 0.5) {
            dano = this.ataque * this._ataqueMultiplo;
            tipoAcao = TipoAcao.ATAQUE_MULTIPLO;
            descricao = `${this.nome} dispara ATAQUE MÚLTIPLO em ${alvo.nome}!`;
        }

        let danoFinal = dano;

        if (alvo instanceof Guerreiro) {
            if (danoFinal <= (alvo as any)._defesa || danoFinal <= (alvo as any)._ataque) {
                danoFinal = 0;
                descricao = `${this.nome} ataca ${alvo.nome}, mas o ataque é BLOQUEADO.`;
            } else {
                danoFinal = danoFinal - (alvo as any)._defesa;
            }
        }

        if (danoFinal > 0) {
            alvo.receberDano(danoFinal);
            this.registrarDanoCausado(danoFinal);
        }

        if (!alvo.estaVivo() && danoFinal > 0) {
            this.registrarAbate();
        }

        const acao = new Acao(
            this,
            alvo,
            tipoAcao,
            danoFinal,
            descricao
        );

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

class PersonagemCustomizado extends Personagem {
    private _tipoCustom: string;
    private _rouboVida: number;
    private _chanceCritico: number;

    constructor(id: number, nome: string, vida: number, ataque: number, tipoCustom: string, rouboVida: number, chanceCritico: number
    ) {
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

    atacar(alvo: Personagem): Acao[] {
        if (!this.estaVivo()) throw new Error("Personagem morto");
        if (!alvo.estaVivo()) throw new Error("Alvo morto");
        if (this === alvo) throw new Error("Ataque inválido");

        const acoes: Acao[] = [];

        let dano = this.ataque;
        let critico = false;

        if (Math.random() * 100 < this._chanceCritico) {
            dano = Math.floor(dano * 2);
            critico = true;
        }

        let danoFinal = dano;

        if (alvo instanceof Guerreiro) {
            if (danoFinal <= (alvo as any)._defesa || danoFinal <= (alvo as any)._ataque) {
                danoFinal = 0;
            } else {
                danoFinal = danoFinal - (alvo as any)._defesa;
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
            ? TipoAcao.ATAQUE_CRITICO
            : TipoAcao.ATAQUE;

        const descricao =
            danoFinal === 0
                ? `${this.nome} (${this._tipoCustom}) ataca ${alvo.nome}, mas o ataque é BLOQUEADO.`
                : critico
                    ? `${this.nome} (${this._tipoCustom}) desfere um ATAQUE CRÍTICO em ${alvo.nome}!`
                    : `${this.nome} (${this._tipoCustom}) ataca ${alvo.nome}.`;

        const acaoAtaque = new Acao(
            this,
            alvo,
            tipoAtaque,
            danoFinal,
            descricao
        );

        acoes.push(acaoAtaque);
        this.registrarAcao(acaoAtaque);
        alvo.registrarAcao(acaoAtaque);

        if (danoFinal > 0 && this._rouboVida > 0) {
            const cura = Math.floor(danoFinal * (this._rouboVida / 100));

            if (cura > 0) {
                this.vida += cura;

                const acaoRouboVida = new Acao(
                    this,
                    this,
                    TipoAcao.ROUBO_VIDA,
                    cura,
                    `${this.nome} (${this._tipoCustom}) rouba ${cura} de vida.`
                );

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

export { Guerreiro, Mago, Arqueiro, PersonagemCustomizado };