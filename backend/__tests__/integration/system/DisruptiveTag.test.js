const ActorManager = require("../../../src/classes/managers/ActorManager")
const PartyManager = require("../../../src/classes/managers/PartyManager")

const DisruptiveTag = require("../../../src/classes/skill/DisruptiveTag")

const Actor = require("../../../src/classes/Actor")
const Party = require("../../../src/classes/Party")
const Skill = require("../../../src/classes/skill/Skill")

const Evaluator = require("../../../src/classes/Evaluator")
const ConditionalInterpreter = require("../../../src/classes/ConditionalInterpreter")
const Filter = require("../../../src/classes/Filter")

const investida = new Skill({
    "name": "Investida",
    "description": "Avança em um inimigo, causando 25 (+1 cada 7 de Força) em um inimigo e atordoando-o logo depois. 8 rodadas de recarga.",
    "cooldown": 8,
    "paCost": 1,
    "tags": {
        "disruptive": {
            "subject": {
                "type": "actor",
                "params": {
                    "selected": true
                }
            },
            "statusList": [{ name: "Stunned" }]
        }
    }
})

const nevascaNervosa = new Skill({
    "name": "Nevasca Nervosa",
    "description": "Cria uma forte rajada de ventos Frios, que atacam todos os inimigos, causando 25 (+1 cada 2 de Sabedoria), e congela os atingidos. 8 rodadas de recarga.",
    "cooldown": 8,
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
            "formula": "55 + Math.floor(caster.stats.sab / 2)"
        },
        "disruptive": {
            "subject": {
                "type": "party",
                "params": {
                    "selected": true
                }
            },
            "statusList": [{ "name": "Frozen" }]
        }
    }
})

const nevasca = new Skill({
    "name": "Nevasca",
    "description": "Cria uma forte rajada de ventos Frios, que atacam todos os inimigos, causando 25 (+1 cada 2 de Sabedoria), e congela os atingidos com uma chance de 25%. 8 rodadas de recarga.",
    "cooldown": 8,
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
            "formula": "25 + Math.floor(caster.stats.sab / 2)"
        },
        "disruptive": {
            "subject": {
                "type": "party",
                "params": {
                    "selected": true
                }
            },
            "statusList": [
                { 
                    "name": "Frozen",
                    "triggers": [
                        {
                            "fn": "haveChanceToOccur",
                            "params": {
                                "reference": 0.25
                            }
                        }
                    ] 
                }
            ]
        }
    }
})

describe("Healing Skill Interpreter", () => {
    let yendros, aaron, jane
    let players, enemies

    let evaluator, conditionalInterpreter, filter
    let actorManager, partyManager

    let disruptiveTag

    beforeAll(() => {
        actorManager = new ActorManager()
        partyManager = new PartyManager()

        evaluator = new Evaluator(actorManager, partyManager)
        conditionalInterpreter = new ConditionalInterpreter(evaluator)
        filter = new Filter(conditionalInterpreter)
        
        disruptiveTag = new DisruptiveTag(evaluator, conditionalInterpreter, filter)
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
        jest.clearAllMocks()

        actorManager.deleteAll()
        partyManager.deleteAll()
    })

    it("Exists", () => {
        expect(disruptiveTag).toBeDefined()
    })

    it("Should add \"Stunned\" status a single target", () => {
        actorManager.select(yendros.id)
        disruptiveTag.active(jane, investida)

        expect(yendros.status).toContain("Stunned")
    })

    it("Should add \"Frozen\" status to an entire party", () => {
        partyManager.select(players.id)
        disruptiveTag.active(jane, nevascaNervosa)

        expect(yendros.status).toContain("Frozen")
        expect(aaron.status).toContain("Frozen")
    })

    it("Should add \"Frozen\" status to an entire party in 25% of cases - Successful case for all", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.24)

        partyManager.select(players.id)
        disruptiveTag.active(jane, nevasca)

        expect(yendros.status).toContain("Frozen")
        expect(aaron.status).toContain("Frozen")
    })

    it("Should add \"Frozen\" status to an entire party in 25% of cases - Unsuccessful case for all", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.26)

        partyManager.select(players.id)
        disruptiveTag.active(jane, nevasca)

        expect(yendros.status).not.toContain("Frozen")
        expect(aaron.status).not.toContain("Frozen")
    })

})