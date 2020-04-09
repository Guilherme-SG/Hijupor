const ConditionalInterpreter = require('../../src/classes/ConditionalInterpreter')
const Evalulator = require("../../src/classes/Evaluator")

const ActorManager = require("../../src/classes/managers/ActorManager")
const PartyManager = require("../../src/classes/managers/PartyManager")

const Actor = require("../../src/classes/Actor")
const Party = require("../../src/classes/Party")

const yendros = new Actor({ name: "Yendros", currentHP: 100 })
const aaron = new Actor({ name: "Aaron", currentHP: 100 })
const jane = new Actor({ name: "Jane", currentHP: 100 })

const players = new Party("Players")
players.add(yendros)
players.add(aaron)

const enemies = new Party("Enemies")
enemies.add(jane)

const actorManager = new ActorManager()
actorManager.add(yendros)
actorManager.add(aaron)
actorManager.add(jane)

const partyManager = new PartyManager()
partyManager.add(players)
partyManager.add(enemies)

const evalulator = new Evalulator(actorManager, partyManager)
const interpreter = new ConditionalInterpreter(evalulator)

describe("Conditional Interpreter", () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it("Module exists", () => {
        expect(interpreter).toBeDefined()
    })

    
    it("Should return false if not provided a existent name of function comparision", () => {
        const options = {
            subject: {
                type: "caster"
            }
        }

        expect(interpreter.process(options)).toBeFalsy()
    })

    it("Should return false if not provided params to comparision", () => {
        const options = {
            fn: "isEqual",
            subject: {
                type: "caster"
            }
        }
        expect(interpreter.process(options)).toBeFalsy()
    })

    it("If subject was not provided, then the comparisions should occour between \"value\" and \"reference\" params", () => {
        const options = {
            fn: "isEqual",
            params: {
                value: 10,
                reference: 10
            }
        }

        expect(interpreter.process(options)).toBeTruthy()
    })

    it("If subject is provided, but is invalid, then should return false", () => {
        const options = {
            subject: {
                type: ""
            },
            fn: "isEqual",
            params: {
                attribute: "currentHP",
                reference: 100
            }
        }

        expect(interpreter.process(options)).toBeFalsy()
    })

    it("Given a valid subject, a valid function of comparison and it params, the comparision should work", () => {
        actorManager.select(yendros.id)

        const options = {
            subject: {
                type: "actor",
                params: {
                    selected: true
                }
            },
            fn: "isEqual",
            params: {
                attribute: "currentHP",
                reference: 100
            }
        }

        expect(interpreter.process(options)).toBeTruthy()
    })

    it("Have 25% of chance to return true", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1)
        
        const options = {
            fn: "haveChanceToOccur",
            params: {
                reference: 0.25
            }
        }

        expect(interpreter.process(options)).toBeTruthy()
    })

    it("Have 25% of chance to return true, but fail", () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8)
        
        const options = {
            fn: "haveChanceToOccur",
            params: {
                reference: 0.25
            }
        }
        
        expect(interpreter.process(options)).toBeFalsy()
    })


})