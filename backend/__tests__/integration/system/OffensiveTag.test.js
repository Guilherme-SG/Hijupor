const ActorManager = require("../../../src/classes/managers/ActorManager")
const PartyManager = require("../../../src/classes/managers/PartyManager")

const OffensiveTag = require("../../../src/classes/skill/OffensiveTag")

const Actor = require("../../../src/classes/actor/Actor")
const Party = require("../../../src/classes/Party")
const Skill = require("../../../src/classes/skill/Skill")

const Evaluator = require("../../../src/classes/Evaluator")
const ConditionalInterpreter = require("../../../src/classes/ConditionalInterpreter")
const Filter = require("../../../src/classes/Filter")

const RawBonus = require("../../../src/classes/attribute/RawBonus")

const investida = new Skill({
    "name": "Investida",
    "description": "Avança em um inimigo, causando 25 (+1 cada 7 de Força) em um inimigo e atordoando-o logo depois. 8 rodadas de recarga.",
    "cooldown": 8,
    "paCost": 1,
    "tags": {
        "offensive": {
            "damageType": "physic",
            "subject": {
                "type": "actor",
                "params": {
                    "selected": true
                }
            },
            "damageFunction": "byFormula",
            "formula": "25 + Math.floor(caster.stats.get('str') / 7)"
        }
    }
})

const divinySmite = new Skill({
    "name": "Punição Divina",
    "description": "Acerta um inimigo com um Feixe de Luz vindo dos céus, causando 55 (+1 cada 2 de Fé). Caso o inimigo seja eliminado, o dano extra é infligido em outro inimigo. 10 rodadas de recarga.",
    "cooldown": 10,
    "paCost": 1,
    "tags": {
        "offensive": {
            "damageType": "magic",
            "subject": {
                "type": "actor",
                "params": {
                    "selected": true
                }
            },
            "damageFunction": "byFormula",
            "formula": "55 + Math.floor(caster.stats.get('faith') / 2)",
            "extraDamageHitAnotherTarget": true
        }
    }
})

const tempestade = new Skill({
    "name": "Tempestade de Raios",
    "description": "Dispara Trovões e Raios em todos os inimigos, causando 35 (+1 cada 2 de Sabedoria), além de possui uma chance de 15% de Paralisar aqueles atingidos pelo ataque. 7 rodadas de recarga.",
    "type": "magical-offensive, disruptive",
    "cooldown": 7,
    "paCost": 1,
    "tags": {
        "offensive": {
            "subject": {
                "type": "party",
                "params": {
                    "selected": true
                } 
            },
            "damageFunction": "byFormula",
            "formula": "35 + Math.floor(caster.stats.get('sab') / 2)"
        }
    }
})

describe("Offensive Skill Interpreter", () => {
    let yendros, aaron, jane
    let players, enemies

    let evaluator, conditionalInterpreter, filter
    let actorManager, partyManager

    let offensiveTag

    beforeAll(() => {
        actorManager = new ActorManager()
        partyManager = new PartyManager()

        evaluator = new Evaluator(actorManager, partyManager)
        conditionalInterpreter = new ConditionalInterpreter(evaluator)
        filter = new Filter(conditionalInterpreter)
        
        offensiveTag = new OffensiveTag(evaluator, conditionalInterpreter, filter)
    })

    beforeEach( () => {
        yendros = new Actor({ name: "Yendros" })
        aaron = new Actor({ name: "Aaron" })
        jane = new Actor({ name: "Jane" })

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
        actorManager.deleteAll()
        partyManager.deleteAll()
    })

    it("Exists", () => {
        expect(OffensiveTag).toBeDefined()
    })

    it("Should deal damage (calculated by formula) to a single target", () => {
        actorManager.select(aaron.id)
        offensiveTag.active(jane, investida)

        expect(investida.damageDone).toBe(25)

        expect(aaron.currentHP).toBe(75)
    })

    it("Should deal damage to a single target, if target die the remaning damage must be distribuite to another target others members of first target's party",
        () => {
            actorManager.select(yendros.id)
            jane.stats.faith.addRawBonus(new RawBonus(100))
            offensiveTag.active(jane, divinySmite)

            expect(divinySmite.damageDone).toBe(105)

            expect(yendros.currentHP).toBe(0)
            expect(yendros.isDead()).toBeTruthy()

            expect(aaron.currentHP).toBe(95)
    })

    it("Should deal damage (calculated by formula) to party", () => {
        partyManager.select(players.id)

        jane.stats.sab.addRawBonus(new RawBonus(100))

        offensiveTag.active(jane, tempestade)

        expect(tempestade.damageDone).toBe(85)

        expect(yendros.currentHP).toBe(15)
        expect(aaron.currentHP).toBe(15)
    })

})