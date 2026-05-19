# ⚔️ Sistema de Batalha RPG — Trabalho Final de POO

Projeto final desenvolvido na disciplina de **Programação Orientada a Objetos**, implementando um **sistema de batalha RPG** via terminal, com múltiplos tipos de personagens, sistema de turnos, histórico de ações e persistência de batalhas em arquivos JSON.

🎥 **Vídeo de apresentação:** [Assistir no Google Drive](https://drive.google.com/file/d/15EDCT-0b0UAMuophQ32RRLTShsgAGSUS/view?usp=sharing)

---

## 👥 Colaboradores

| Nome | GitHub |
|------|--------|
| Nicolas Damasceno | [@NicolasDamasceno](https://github.com/NicolasDamasceno) |
| Guilherme Alves | [@Guilherme-sta](https://github.com/Guilherme-sta) |

---

## 🗂️ Estrutura do Projeto

```
POO-TS-TrabalhoFinal/
├── personagem.ts         # Classe base Personagem
├── subClasses.ts         # Guerreiro, Mago, Arqueiro, PersonagemCustomizado
├── acoes.ts              # Classe Acao e enum TipoAcao
├── batalha.ts            # Classe Batalha (gerenciamento completo)
├── registroPersonagem.ts # Factory para reconstrução de personagens (JSON)
├── simulacao.ts          # Aplicação interativa de terminal
├── dist/                 # Arquivos compilados (.js)
├── saves/                # Batalhas salvas em JSON (gerado em runtime)
└── tsconfig.json
```

---

## 🏗️ Arquitetura e Conceitos de POO Aplicados

### 🔷 Encapsulamento

Todos os atributos das classes são declarados como `private` ou `protected`, sendo acessados apenas por meio de `getters` e `setters` com validações.

```typescript
// personagem.ts
set vida(valor: number) {
    if (valor < 0) valor = 0;
    if (valor > 100) valor = 100;
    this._vida = valor;
}
```

A classe `Acao` encapsula completamente cada evento de batalha, com atributos como `_origem`, `_alvo`, `_tipo`, `_valorDano` e `_rodada`, todos privados e acessados via getters.

---

### 🔷 Herança

A classe `Personagem` é a **classe base** de toda a hierarquia. As subclasses estendem seu comportamento usando `extends` e `super`:

```
Personagem (base)
├── Guerreiro           → atributo extra: _defesa
├── Mago                → autodano ao usar magia
├── Arqueiro            → atributo extra: _ataqueMultiplo
└── PersonagemCustomizado → atributos: _rouboVida, _chanceCritico, _tipoCustom
```

Todos os construtores das subclasses chamam `super()` para inicializar os atributos herdados:

```typescript
// subClasses.ts
class Guerreiro extends Personagem {
    constructor(id, nome, vida, ataque, defesa) {
        super(id, nome, vida, ataque); // chama construtor da classe base
        this._defesa = defesa;
    }
}
```

---

### 🔷 Polimorfismo

O método `atacar(alvo: Personagem)` é definido na classe base e **sobrescrito** em cada subclasse com comportamentos únicos:

| Classe | Comportamento de `atacar()` |
|--------|-----------------------------|
| `Personagem` | Ataque padrão com dano fixo |
| `Guerreiro` | Ataque com defesa; entra em fúria abaixo de 30% de vida (+30% de dano) |
| `Mago` | Causa dano duplo em Arqueiros; sofre 10 de autodano após cada ataque |
| `Arqueiro` | 50% de chance de ataque múltiplo (dano ×N) |
| `PersonagemCustomizado` | Chance de crítico (dano ×2) + roubo de vida percentual |

Isso permite que a classe `Batalha` chame `atacante.atacar(defensor)` sem precisar saber o tipo concreto do personagem — o TypeScript resolve o método correto em tempo de execução:

```typescript
// batalha.ts
const acoes = atacante.atacar(defensor); // polimorfismo em ação
```

---

### 🔷 Enum

O `TipoAcao` é um `enum` TypeScript que categoriza cada evento da batalha, facilitando filtros e exibição de histórico:

```typescript
// acoes.ts
enum TipoAcao {
    ATAQUE,
    MAGIA,
    ATAQUE_ENFURECIDO,
    ATAQUE_MULTIPLO,
    ATAQUE_CRITICO,
    ROUBO_VIDA,
    AUTODANO
}
```

---

### 🔷 Type Alias

A classe `Batalha` utiliza um `type` customizado para representar os estados possíveis da batalha de forma segura:

```typescript
// batalha.ts
type EstadoBatalha = "NAO_INICIADA" | "EM_ANDAMENTO" | "FINALIZADA";
```

---

### 🔷 Padrão Factory (Static Method)

A classe `RegistroPersonagem` implementa o padrão **Factory** com um método estático `criar()`, responsável por instanciar o tipo correto de personagem ao carregar uma batalha salva em JSON:

```typescript
// registroPersonagem.ts
class RegistroPersonagem {
    static criar(dados: any): Personagem {
        switch (dados.tipo) {
            case "Guerreiro": return new Guerreiro(...);
            case "Mago":      return new Mago(...);
            case "Arqueiro":  return new Arqueiro(...);
            case "PersonagemCustomizado": return new PersonagemCustomizado(...);
        }
    }
}
```

---

### 🔷 Serialização e Persistência (toJSON / fromJSON)

Cada classe implementa `toJSON()` para serialização e `fromJSON()` (ou Factory) para reconstrução, permitindo salvar e carregar batalhas completas em arquivos `.json`:

```typescript
// personagem.ts
toJSON() {
    return { tipo: this.constructor.name, id, nome, vida, ataque, ... };
}
```

As subclasses estendem esse comportamento com **spread operator** para incluir atributos adicionais:

```typescript
// subClasses.ts — Guerreiro
toJSON() {
    return { ...super.toJSON(), defesa: this._defesa, vidaInicial: this._vidaInicial };
}
```

---

## ⚙️ Funcionalidades da Aplicação

A aplicação roda no terminal via `simulacao.ts` com um menu interativo completo:

**Personagens**
- Criar Guerreiro, Mago, Arqueiro ou Personagem Customizado

**Batalha**
- Iniciar batalha (mínimo 2 personagens)
- Executar turno aleatório ou manual
- Encerrar batalha manualmente

**Consultas**
- Listar personagens vivos e mortos
- Estatísticas individuais (dano causado, dano recebido, abates)
- Filtrar ações por personagem, tipo e intervalo de rodadas
- Extrato/Replay da batalha rodada a rodada
- Resumo final da batalha

**Sistema**
- Salvar batalha em arquivo `.json`
- Carregar batalha salva anteriormente

---

## 🛠️ Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- Módulos nativos: `readline`, `fs`, `path`

---

## ▶️ Como Executar

**Pré-requisitos:** Node.js e TypeScript instalados.

```bash
# Instalar TypeScript globalmente (se necessário)
npm install -g typescript

# Entrar na pasta do projeto
cd POO-TS-TrabalhoFinal

# Compilar o projeto
tsc

# Executar a simulação
node dist/simulacao.js
```

---

## 📚 Conceitos de POO Aplicados

| Conceito | Onde foi aplicado |
|----------|------------------|
| **Encapsulamento** | Todos os atributos `private`/`protected` com getters e setters validados |
| **Herança** | `Guerreiro`, `Mago`, `Arqueiro` e `PersonagemCustomizado` herdam de `Personagem` |
| **Polimorfismo** | Método `atacar()` sobrescrito com comportamento único em cada subclasse |
| **Enum** | `TipoAcao` categoriza todos os eventos de batalha |
| **Type Alias** | `EstadoBatalha` controla os estados válidos da batalha |
| **Padrão Factory** | `RegistroPersonagem.criar()` instancia o tipo correto ao carregar JSON |
| **Serialização** | `toJSON()` / `fromJSON()` em todas as classes para persistência |
| **Validação no construtor** | Todos os construtores validam os dados recebidos com `throw new Error()` |

---

> Disciplina: Programação Orientada a Objetos  
> Linguagem: TypeScript
