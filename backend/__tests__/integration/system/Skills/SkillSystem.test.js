
const ActorManager = require("../../../../src/classes/managers/ActorManager")
const PartyManager = require("../../../../src/classes/managers/PartyManager")
const SkillManager = require("../../../../src/classes/managers/SkillManager")

const SkillSystem = require("../../../../src/classes/skill/SkillSystem")

const Actor = require("../../../../src/classes/actor/Actor")
const Stats = require("../../../../src/classes/actor/Stats")
const Party = require("../../../../src/classes/Party")
const Skill = require("../../../../src/classes/skill/Skill")

const Evaluator = require("../../../../src/classes/Evaluator")
const ConditionalInterpreter = require("../../../../src/classes/ConditionalInterpreter")
const Filter = require("../../../../src/classes/Filter")

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
        },
        "disruptive": {
            "subject": {
                "type": "actor",
                "params": {
                    "selected": true
                }
            },
            "statusList": [
                {
                    "name": "stunned"
                }
            ]
        }
    }
})

const harmonia = new Skill({
    "name": "Harmonia",
    "description": "Causa um Som harmonioso que recupera 25 (+1 cada 2 de Carisma) de Hp de um aliado. 6 rodadas de recarga.",
    "cooldown": 6,
    "paCost": 1,
    "tags": {
        "healing": {
            "subject": {
                "type": "actor",
                "params": {
                    "selected": true
                }
            },
            "healFunction": "byFormula",
            "formula": "25 + Math.floor(caster.stats.get('car') / 2)"
        }
    }
})

describe("Skill System", () => {
    let yendros, aaron, jane
    let players, enemies

    let evaluator, conditionalInterpreter, filter
    let skillManager, actorManager, partyManager

    beforeAll(() => {
        actorManager = new ActorManager()
        partyManager = new PartyManager()
        skillManager = new SkillManager()

        evaluator = new Evaluator(actorManager, partyManager)
        conditionalInterpreter = new ConditionalInterpreter(evaluator)
        filter = new Filter(conditionalInterpreter)

        skillSystem = new SkillSystem(evaluator, conditionalInterpreter, filter)
        skillManager.add(investida)
        skillManager.add(harmonia)
    })

    beforeEach( () => {
        yendros = new Actor({ name: "Yendros" })
        aaron = new Actor({ name: "Aaron" })
        jane = new Actor({ 
            name: "Jane", 
            stats: new Stats( {agi: 100} ) 
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
        actorManager.deleteAll()
        partyManager.deleteAll()
    })

    it("Exists", () => {
        expect(skillSystem).toBeDefined()
    })

    it("Use skill with offensive and disruptive", () => {
        aaron.stamina.break()
        actorManager.select(aaron.id)
        
        let skillWasUsed = skillSystem.useSkill(jane, investida)
        expect(skillWasUsed).toBeTruthy()
        
        expect(aaron.status).toContain("stunned")
        expect(aaron.getAvailableHP()).toBe(75)
    })

    it("Use skill with healing", () => {
        aaron.stamina.break()

        actorManager.select(aaron.id)
        let skillWasUsed = skillSystem.useSkill(jane, investida)
        expect(skillWasUsed).toBeTruthy()

        expect(aaron.status).toContain("stunned")
        expect(aaron.getAvailableHP()).toBe(75)

        skillWasUsed = skillSystem.useSkill(jane, harmonia)
        expect(skillWasUsed).toBeTruthy()

        expect(aaron.status).toContain("stunned")
        expect(aaron.getAvailableHP()).toBe(100)
    })
})