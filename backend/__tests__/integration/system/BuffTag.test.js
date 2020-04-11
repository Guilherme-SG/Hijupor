const ActorManager = require("../../../src/classes/managers/ActorManager")
const PartyManager = require("../../../src/classes/managers/PartyManager")

const BuffTag = require("../../../src/classes/skill/BuffTag")

const Actor = require("../../../src/classes/actor/Actor")
const Party = require("../../../src/classes/Party")
const Skill = require("../../../src/classes/skill/Skill")
const Stats = require("../../../src/classes/actor/Stats")

const Evaluator = require("../../../src/classes/Evaluator")
const ConditionalInterpreter = require("../../../src/classes/ConditionalInterpreter")
const Filter = require("../../../src/classes/Filter")

const ActionPoint = require("../../../src/classes/actor/ActionPoint")

const resistirElementos = new Skill({
    "name": "Resistir Elementos",
    "description": "Cria uma camada ao redor de todos os aliados, aumentando a Resistência Mágica de todos eles em 10% (+1% cada 2 de Sabedoria) por 4 rodadas. 9 rodadas de recarga.",
    "cooldown": 9,
    "paCost": 1,
    "tags": {
        "buff": {
            "subject": {
                "type": "party",
                "params": {
                    "hasActor": {
                        "type": "caster"
                    }
                }
            },
            "buffFunction": "byFormula",
            "formula": "0.1 + 0.01 * Math.floor(caster.stats.get('sab') / 2)",
            "duration": 4,
            "params": {
                "stats": {
                    "mr": true
                }
            }
        }
    }
})

const liderando = new Skill({
    "name": "Liderando o Exército",
    "description": "Todos do seu grupo recebem 1 Ponto de Ação adicional. 12 rodadas de recarga.",
    "cooldown": 12,
    "paCost": 1,
    "tags": {
        "buff": {
            "subject": {
                "type": "party",
                "params": {
                    "hasActor": {
                        "type": "caster"
                    }
                }
            },
            "buffFunction": "byRawValue",
            "rawValue": 1,
            "params": {
                "actionPoint": {
                    "extraPoints": true
                }
            }
        }
    }
})

const ritmoAcelerado = new Skill({
    "name": "Ritmo Acelerado",
    "description": "Reduz a recarga de todas as habilidades de todos os aliados em 1 rodada. 9 rodadas de recarga.",
    "cooldown": 9,
    "paCost": 1,
    "tags": {
        "buff": {
            "subject": {
                "type": "party",
                "params": {
                    "hasActor": {
                        "type": "caster"
                    }
                }
            },
            "buffFunction": "byRawValue",
            "rawValue": 1,
            "params": {
                "skills": {
                    "cooldownReduction": true
                }
            }
        }
    }
})

describe("Buff Skill Interpreter", () => {
    let yendros, aaron, jane
    let players, enemies

    let evaluator, conditionalInterpreter, filter
    let actorManager, partyManager

    let buffTag

    beforeAll(() => {
        actorManager = new ActorManager()
        partyManager = new PartyManager()

        evaluator = new Evaluator(actorManager, partyManager)
        conditionalInterpreter = new ConditionalInterpreter(evaluator)
        filter = new Filter(conditionalInterpreter)

        buffTag = new BuffTag(evaluator, conditionalInterpreter, filter)
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
        expect(buffTag).toBeDefined()
    })

    it("Should improve magic resistence by 10% to caster and his/her party", () => {
        actorManager.setCaster(aaron.id)

        expect(yendros.stats.get("mr")).toBe(100)
        expect(aaron.stats.get("mr")).toBe(100)

        buffTag.active(aaron, resistirElementos)

        expect(yendros.stats.get("mr")).toBe(160)
        expect(aaron.stats.get("mr")).toBe(160)
    })

    it("Should improve magic resistance by 10% to caster and his/her party during 4 turns, after that the improvement should be undone", () => {
        actorManager.setCaster(aaron.id)

        expect(yendros.stats.get("mr")).toBe(100)
        expect(aaron.stats.get("mr")).toBe(100)


        buffTag.active(aaron, resistirElementos)

        for(let i = 0; i < 4; i++) {
            expect(yendros.stats.get("mr")).toBe(160)
            expect(aaron.stats.get("mr")).toBe(160)

            yendros.update()
            aaron.update()
        }

        expect(yendros.stats.get("mr")).toBe(100)
        expect(aaron.stats.get("mr")).toBe(100)        
    })

    it("Should add 1 extra action point to caster and his/her party", () => {
        actorManager.setCaster(aaron.id)

        expect(aaron.actionPoint.getAvailablePoints()).toBe(3)
        expect(yendros.actionPoint.getAvailablePoints()).toBe(3)

        buffTag.active(aaron, liderando)

        expect(aaron.actionPoint.getAvailablePoints()).toBe(4)
        expect(yendros.actionPoint.getAvailablePoints()).toBe(4)
    })

    it("Reduce cooldown in 1 turn to all skills of all party members", () => {
        actorManager.setCaster(aaron.id)

        aaron.skills.push(new Skill({name: "Test-Aaron", cooldown: 8}))
        yendros.skills.push(new Skill({name: "Test-Yendros", cooldown: 1}))
        yendros.skills.push(new Skill({name: "Test2-Yendros", cooldown: 3}))
        
        aaron.skills[0].use()
        yendros.skills[0].use()
        yendros.skills[1].use()
        
        expect(aaron.skills[0].getCooldown()).toBe(8)
        expect(yendros.skills[0].getCooldown()).toBe(1)
        expect(yendros.skills[1].getCooldown()).toBe(3)

        buffTag.active(aaron, ritmoAcelerado)

        expect(aaron.skills[0].getCooldown()).toBe(7)
        expect(yendros.skills[0].getCooldown()).toBe(0)
        expect(yendros.skills[1].getCooldown()).toBe(2)
    })
})