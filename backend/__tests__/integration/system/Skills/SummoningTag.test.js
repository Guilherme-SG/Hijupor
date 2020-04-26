const ActorManager = require("../../../../src/classes/managers/ActorManager")
const PartyManager = require("../../../../src/classes/managers/PartyManager")

const SummoningTag = require("../../../../src/classes/skill/SummoningTag")
const Summon = require("../../../../src/classes/actor/Summon")

const Actor = require("../../../../src/classes/actor/Actor")
const Party = require("../../../../src/classes/Party")
const Skill = require("../../../../src/classes/skill/Skill")
const Stats = require("../../../../src/classes/actor/Stats")

const Evaluator = require("../../../../src/classes/Evaluator")
const ConditionalInterpreter = require("../../../../src/classes/ConditionalInterpreter")
const Filter = require("../../../../src/classes/Filter")

const Attribute = require("../../../../src/classes/attribute/Attribute")
const RawBonus = require("../../../../src/classes/attribute/RawBonus")

const trip = new Skill({
    "name": "Quando bate a Trip",
    "description": "Invoca um Animal para lutar ao seu lado, que possui 50% dos stats do Druída e que desaparece ao ser morto. A recarga começa quando o animal morre e possui 9 rodadas de duração.",
    "type": "invocation",
    "cooldown": 9,
    "paCost": 1,
    tags: {
        summoning: {
            create: {
                type: "familiar",
                params: {
                    statsPercentage: 0.5
                }
            },
            duration: 2,
            quantityBy: "byRawValue",
            rawValue: 1
        }
    }
})

const familiar = new Skill( {
    "name": "Ajuda Família",
    "description": "Invoca 1 (+1 cada 50 de Inteligência)  Familiar para te auxiliar, seja em combate ou fora dele. Sempre que um Familiar morrer, é preciso esperar 6 rodadas para reinvocá-lo.",
    "type": "invocation",
    "cooldown": "OPB",
    "paCost": 1,
    tags: {
        summoning: {
            create: {
                type: "familiar",
                params: {
                    statsPercentage: 0.5
                }
            },
            duration: 2,
            quantityBy: "byFormula",
            formula: "1 + Math.floor(caster.stats.get('int') / 50)"
        }
    }
})

const clone = new Skill({
    "name": "Clones Astrais",
    "description": "Cria 1 (+1 cada 50 de Ki) clones de si mesmo, eles podem complementar seus ataques ou atacar inimigos diferentes. Os clones duram por 2 rodadas. 8 rodadas de recarga.",
    "type": "invocation",
    "paCost": 1,
    tags: {
        summoning: {
            create: {
                type: "clone"
            },
            duration: 2,
            quantityBy: "byFormula",
            formula: "1 + Math.floor(caster.stats.get('ki') / 50)"
        }
    }
})

const avatar = new Skill({
    "name": "Avatar Divino",
    "description": "Invoca um Avatar representante de seu Deus, que auxilia em seus ataques e ajuda em seus bloqueios. Dura 5 rodadas. 10 rodadas de recarga.",
    "type": "invocation",
    "cooldown": 10,
    "paCost": 1,
    tags: {
        summoning: {

        }
    }
})

describe("Summoning Skill Interpreter", () => {
    let yendros, aaron, jane
    let players, enemies

    let evaluator, conditionalInterpreter, filter
    let actorManager, partyManager

    let summoningTag

    beforeAll(() => {
        actorManager = new ActorManager()
        partyManager = new PartyManager()

        evaluator = new Evaluator(actorManager, partyManager)
        conditionalInterpreter = new ConditionalInterpreter(evaluator)
        filter = new Filter(conditionalInterpreter)

        summoningTag = new SummoningTag(evaluator, conditionalInterpreter, filter)
    })

    beforeEach(() => {
        yendros = new Actor({
            name: "Yendros", 
            stats: new Stats({
                str: 100,
                dex: 100,
                aim: 100,
                int: 100,
                sab: 100,
                mr: 100,
                res: 100,
                car: 100,
                faith: 100,
                vit: 100,
                agi: 100
            })
        })

        aaron = new Actor({
            name: "Aaron", 
            stats: new Stats({
                str: 100,
                dex: 100,
                aim: 100,
                int: 100,
                sab: 100,
                mr: 100,
                res: 100,
                car: 100,
                faith: 100,
                vit: 100,
                agi: 100
            })
        })

        jane = new Actor({
            name: "Jane", 
            stats: new Stats({
                str: 100,
                dex: 100,
                aim: 100,
                int: 100,
                sab: 100,
                mr: 100,
                res: 100,
                car: 100,
                faith: 100,
                vit: 100,
                agi: 100
            })
        })

        actorManager.add(yendros)
        actorManager.add(aaron)
        actorManager.add(jane)

        players = new Party("Players")
        players.add(yendros)
        players.add(aaron)

        enemies = new Party("Enemies")
        enemies.add(jane)

        partyManager.add(players)
        partyManager.add(enemies)

    })

    afterEach(() => {
        jest.clearAllMocks()

        actorManager.deleteAll()
        partyManager.deleteAll()
    })

    it("Exists", () => {
        expect(summoningTag).toBeDefined()
    })

    it("Should create 3 clones of caster", () => {
        yendros.stats.ki = new Attribute(100)
        actorManager.setCaster(yendros.id)

        expect(yendros.stats.ki).toBeDefined()

        summoningTag.active(yendros, clone)

        let yendrosSummons = yendros.getSummons()

        expect(yendrosSummons).toHaveLength(3)
    })

    it("The 3 clones should die after 2 turns", () => {
        yendros.stats.ki = new Attribute(100)
        actorManager.setCaster(yendros.id)

        expect(yendros.stats.ki).toBeDefined()

        summoningTag.active(yendros, clone)

        // 1º Turn
        expect(yendros.getSummons()).toHaveLength(3)

        // 2º Turn
        yendros.update()
        expect(yendros.getSummons()).toHaveLength(3)

        // 3º Turn
        yendros.update()
        expect(yendros.getSummons()).toHaveLength(0)
    })

    it("Should summon 1 familiar with 50% of caster's stats", () => {
        actorManager.setCaster(yendros.id)

        summoningTag.active(yendros, trip)

        let yendrosSummons = yendros.getSummons()

        expect(yendrosSummons).toHaveLength(1)
        
        yendrosSummons.forEach( summon => {
            Object.keys( summon.stats )
                .forEach( stat => {
                    expect(summon.stats.get(stat)).toBe(yendros.stats.get(stat) * 0.5)
                })
        })
    })

    it("Should summon 3 familiars with 50% of caster's stats", () => {
        actorManager.setCaster(yendros.id)

        summoningTag.active(yendros, familiar)

        let yendrosSummons = yendros.getSummons()

        expect(yendrosSummons).toHaveLength(3)

        yendrosSummons.forEach( summon => {
            Object.keys( summon.stats )
                .forEach( stat => {
                    expect(summon.stats.get(stat)).toBe(yendros.stats.get(stat) * 0.5)
                })
        })
    })
})