const ConditionalSystem = require('../../src/classes/ConditionalSystem')
const Evalulator = require("../../src/classes/Evaluator")

const ActorManager = require("../../src/classes/ActorManager")
const PartyManager = require("../../src/classes/PartyManager")

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
actorManager.addActor(yendros)
actorManager.addActor(aaron)
actorManager.addActor(jane)

const partyManager = new PartyManager()
partyManager.addParty(players)
partyManager.addParty(enemies)

const evalulator = new Evalulator(actorManager, partyManager)
const cs = new ConditionalSystem(evalulator)

describe("Contional System", () => {
    it("Module exists", () => {
        expect(ConditionalSystem).toBeDefined()
    })

    /*
    describe("Comparisons", () => {
        
        describe("IsEqual Method", () => {
            it("Exists", () => {
                expect(cs.isEqual).toBeDefined()
            })

            it("Return true when both parameters are equal", () => {
                const x = 10
                const y = 10

                expect(cs.isEqual(x, y)).toBeTruthy()
            })

            it("Return false when both parameters are not equal", () => {
                const x = 10
                const y = 20

                expect(cs.isEqual(x, y)).toBeFalsy()
            })
        })

        describe("IsNotEqual Method", () => {

            it("Exists", () => {
                expect(cs.isNotEqual).toBeDefined()
            })

            it("Return false when both parameters are equal", () => {
                const x = 10
                const y = 10

                expect(cs.isNotEqual(x, y)).toBeFalsy()
            })

            it("Return true when both parameters are differents", () => {
                const x = 10
                const y = 20

                expect(cs.isNotEqual(x, y)).toBeTruthy()
            })
        })

        describe("isGreaterThan Method", () => {

            it("Exists", () => {
                expect(cs.isGreaterThan).toBeDefined()
            })

            it("Return true when first parameter is greater than second parameter", () => {
                const x = 45
                const y = 12

                expect(cs.isGreaterThan(x, y)).toBeTruthy()
            })

            it("Return false when first parameter is not greater than second parameter", () => {
                const x = 10
                const y = 10

                expect(cs.isGreaterThan(x, y)).toBeFalsy()
            })
        })

        describe("isGreaterThanOrEqual Method", () => {

            it("Exists", () => {
                expect(cs.isGreaterThanOrEqual).toBeDefined()
            })

            it("Return true when first parameter is greater than second parameter", () => {
                const x = 45
                const y = 12

                expect(cs.isGreaterThanOrEqual(x, y)).toBeTruthy()
            })

            it("Return true when first parameter is equal to second parameter", () => {
                const x = 4
                const y = 4

                expect(cs.isGreaterThanOrEqual(x, y)).toBeTruthy()
            })

            it("Return false when first parameter is lest than second parameter", () => {
                const x = 3
                const y = 78

                expect(cs.isGreaterThanOrEqual(x, y)).toBeFalsy()
            })
        })

        describe("isLessThan Method", () => {

            it("Exists", () => {
                expect(cs.isLessThan).toBeDefined()
            })

            it("Return true when first parameter is less than second parameter", () => {
                const x = 3
                const y = 12

                expect(cs.isLessThan(x, y)).toBeTruthy()
            })

            it("Return false when first parameter is not less than second parameter", () => {
                const x = 10
                const y = 10

                expect(cs.isLessThan(x, y)).toBeFalsy()
            })
        })

        describe("isLessThanOrEqual Method", () => {

            it("Exists", () => {
                expect(cs.isLessThanOrEqual).toBeDefined()
            })

            it("Return true when first parameter is less than second parameter", () => {
                const x = 50
                const y = 51

                expect(cs.isLessThanOrEqual(x, y)).toBeTruthy()
            })

            it("Return true when first parameter is equal equal to second parameter", () => {
                const x = 4
                const y = 4

                expect(cs.isLessThanOrEqual(x, y)).toBeTruthy()
            })

            it("Return false when first parameter is greater than second parameter", () => {
                const x = 176
                const y = 78

                expect(cs.isLessThanOrEqual(x, y)).toBeFalsy()
            })
        })

    })

    describe("Find value in array", () => {
        describe("minValueInArray Method", () => {
            it("Exists", () => {
                expect(cs.minValueInArray).toBeDefined()
            })

            it("Min value in [1, 2, 3] should be 1", () => {
                expect(cs.minValueInArray([1, 2, 3])).toBe(1)
            })

            it("Min value of empty array should be Infinity", () => {
                expect(cs.minValueInArray([])).toBe(Infinity)
            })

            it("Min value in array of objects should be NaN", () => {
                expect(cs.minValueInArray([{a:2}, new Date(), -436])).toBe(NaN)
            })
        })

        describe("maxValueInArray Method", () => {
            it("Exists", () => {
                expect(cs.maxValueInArray).toBeDefined()
            })

            it("Max value in [1, 2, 3] should be 3", () => {
                expect(cs.maxValueInArray([1, 2, 3])).toBe(3)
            })

            it("Max value of empty array should be Infinity", () => {
                expect(cs.maxValueInArray([])).toBe(-Infinity)
            })

            it("Max value in array of objects should be NaN", () => {
                expect(cs.maxValueInArray([{a:2}, new Date(), -436])).toBe(NaN)
            })
        })
    })*/

    describe("Trigger Method", () => {
        const singleTrigger = [ 
            { 
                "subject": "caster", 
                "fn": "isLessThanOrEqual", 
                "params": { 
                    "attribute": "getPercentualHP", 
                    "reference": 0.25 
                } 
            } 
        ] 

        it("Exists", () => {
            expect(cs.trigger).toBeDefined()
        })

        it("With array of triggers empty should be true", () => {
            expect(cs.trigger([])).toBeTruthy()
        })

        it("With no parameters should be true", () => {
            expect(cs.trigger()).toBeTruthy()
        })

        /*
        it("if function of comparition is not defined, then should return throw an error", () => {
            expect(cs.trigger(singleTrigger)).toBeFalsy()
        })*/
    })

    describe("Filter Method", () => {
        it("Exists", () => {
            expect(cs.filter).toBeDefined()
        })
    })

    describe("Duration Method", () => {
        it("Exists", () => {
            expect(cs.duration).toBeDefined()
        })
    })
})