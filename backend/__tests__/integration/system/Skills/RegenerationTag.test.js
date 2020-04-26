const ActorManager = require("../../../../src/classes/managers/ActorManager")
const PartyManager = require("../../../../src/classes/managers/PartyManager")

const RegenerationTag = require("../../../../src/classes/skill/RegenerationTag")

const Actor = require("../../../../src/classes/actor/Actor")
const Party = require("../../../../src/classes/Party")
const Skill = require("../../../../src/classes/skill/Skill")
const Stats = require("../../../../src/classes/actor/Stats")

const Evaluator = require("../../../../src/classes/Evaluator")
const ConditionalInterpreter = require("../../../../src/classes/ConditionalInterpreter")
const Filter = require("../../../../src/classes/Filter")

const ActionPoint = require("../../../../src/classes/actor/ActionPoint")

const devotion = new Skill({
    "name": "Devoção",
    "description": "Sua devoção é compartilhada momentâneamente com seus aliados, permitindo que eles recuperem 2,5% de Hp por rodada. Duração de 4 rodadas. 9 rodadas de recarga.",
    "type": "healing",
    "cooldown": 9,
    "paCost": 1,
    "duration": 4,
    "tags": {
        "regeneration": {
            "subject": {
                "type": "party",
                "params": {
                    "hasActor": {
                        "type": "caster"
                    }
                }
            },
            "regenerationFunction": "byRawValue",
            "rawValue": 0.025,
            "duration": 4
        }
    }
})

const acalmar = new Skill({
    "name": "Acalmar-se",
    "description": "Recupera 50 (+1 cada 2 de Raiva) de Hp de si mesmo, além de recuperar 2% de Hp por 5 rodadas. 8 rodadas de recarga.",
    "type": "healing",
    "cooldown": 8,
    "paCost": 1,
    "tags": {
        "healing": {
            "subject": {
                "type": "caster"
            },
            "healingFunction": "byFormula",
            "formula": "25 + Math.floor(caster.stats.get('rage') / 2)"
        },
        "regeneration": {
            "subject": {
                "type": "caster"
            },
            "regenerationFunction": "byRawValue",
            "rawValue": 0.02,
            "duration": 5
        }
    }
})

describe("Buff Skill Interpreter", () => {
    let yendros, aaron, jane
    let players, enemies

    let evaluator, conditionalInterpreter, filter
    let actorManager, partyManager

    let regenerationTag

    beforeAll(() => {
        actorManager = new ActorManager()
        partyManager = new PartyManager()

        evaluator = new Evaluator(actorManager, partyManager)
        conditionalInterpreter = new ConditionalInterpreter(evaluator)
        filter = new Filter(conditionalInterpreter)

        regenerationTag = new RegenerationTag(evaluator, conditionalInterpreter, filter)
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
        expect(regenerationTag).toBeDefined()
    })

    it("Should make party regenerates 2,5% Hp each turn. Duration: 4 turns", () => {
        aaron.stamina.break()
        yendros.stamina.break()

        aaron.takeDamage(75)
        yendros.takeDamage(75)

        expect(aaron.getAvailableHP()).toBe(525)
        expect(yendros.getAvailableHP()).toBe(525)
        
        actorManager.setCaster(aaron.id)

        regenerationTag.active(aaron, devotion)

        for(let i = 0; i < 5; i++) {
            aaron.update()
            yendros.update()
        }

        expect(aaron.getAvailableHP()).toBe(585)
        expect(yendros.getAvailableHP()).toBe(585)
    })

    it("Should make caster regenerates 2% Hp each turn. Duration: 5 turns", () => {
        aaron.stamina.break()
        yendros.stamina.break()

        aaron.takeDamage(72)
        yendros.takeDamage(72)

        expect(aaron.getAvailableHP()).toBe(528)
        expect(yendros.getAvailableHP()).toBe(528)
        
        actorManager.setCaster(aaron.id)

        regenerationTag.active(aaron, acalmar)

        for(let i = 0; i < 6; i++) {
            aaron.update()
            yendros.update()
        }

        expect(aaron.getAvailableHP()).toBe(588)
        expect(yendros.getAvailableHP()).toBe(528)
    })
})