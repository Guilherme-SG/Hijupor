const ActorManager = require("../../../src/classes/managers/ActorManager")
const PartyManager = require("../../../src/classes/managers/PartyManager")

const ControllerTag = require("../../../src/classes/skill/ControllerTag")
const Summon = require("../../../src/classes/actor/Summon")

const Actor = require("../../../src/classes/actor/Actor")
const Party = require("../../../src/classes/Party")
const Skill = require("../../../src/classes/skill/Skill")
const Stats = require("../../../src/classes/actor/Stats")

const Evaluator = require("../../../src/classes/Evaluator")
const ConditionalInterpreter = require("../../../src/classes/ConditionalInterpreter")
const Filter = require("../../../src/classes/Filter")

const Attribute = require("../../../src/classes/attribute/Attribute")
const RawBonus = require("../../../src/classes/attribute/RawBonus")

const simon = new Skill({
    "name": "O Mestre Mandou",
    "description": "Controla o Inimigo com menos Inteligência por 2 rodadas. 5 rodadas de recarga.",
    "type": "control",
    "cooldown": 5,
    "paCost": 1,
    "tags": {
        "controller": {
            "subject": {
                "type": "party",
                "findActor": {
                    "fn": "minValueInArray",
                    "attribute": "int"
                }
            },
            "duration": 2
        }
    }
    
})


describe("Controller Skill Interpreter", () => {
    let yendros, aaron, jane
    let players, enemies

    let evaluator, conditionalInterpreter, filter
    let actorManager, partyManager

    let controllerTag

    beforeAll(() => {
        actorManager = new ActorManager()
        partyManager = new PartyManager()

        evaluator = new Evaluator(actorManager, partyManager)
        conditionalInterpreter = new ConditionalInterpreter(evaluator)
        filter = new Filter(conditionalInterpreter)

        controllerTag = new ControllerTag(evaluator, conditionalInterpreter, filter)
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
                int: 60,
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
        expect(controllerTag).toBeDefined()
    })

    it("Should get control of actor with less inteligence", () => {
        actorManager.setCaster(jane.id)

        controllerTag.active(jane, simon)

        jane.getControlOverActor(aaron)

        expect(aaron.status).toContain("controlled")
        expect(jane.overControl).toContainEqual(aaron)
    })
})