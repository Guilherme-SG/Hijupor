const ActorManager = require("../../../src/classes/managers/ActorManager")
const PartyManager = require("../../../src/classes/managers/PartyManager")

const BuffTag = require("../../../src/classes/skill/BuffTag")

const Actor = require("../../../src/classes/Actor")
const Party = require("../../../src/classes/Party")
const Skill = require("../../../src/classes/skill/Skill")
const Stats = require("../../../src/classes/Stats")

const Evaluator = require("../../../src/classes/Evaluator")
const ConditionalInterpreter = require("../../../src/classes/ConditionalInterpreter")
const Filter = require("../../../src/classes/Filter")

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
            "formula": "0.1 + 0.01 * Math.floor(caster.stats.sab / 2)",
            "duration": 4,
            "statToImprove": "mr"
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
                vit: 100
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
                vit: 100
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
                vit: 100
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

        expect(yendros.stats.mr).toBe(100)
        expect(aaron.stats.mr).toBe(100)

        buffTag.active(aaron, resistirElementos)

        expect(yendros.stats.mr).toBe(160)
        expect(aaron.stats.mr).toBe(160)
    })
})