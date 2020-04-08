const ConditionalInterpreter = require('../../src/classes/ConditionalInterpreter')
const Evaluator = require("../../src/classes/Evaluator")

const ActorManager = require("../../src/classes/managers/ActorManager")
const PartyManager = require("../../src/classes/managers/PartyManager")

const Actor = require("../../src/classes/Actor")
const Party = require("../../src/classes/Party")

const yendros = new Actor({ name: "Yendros", currentHP: 100 })
const aaron = new Actor({ name: "Aaron", currentHP: 100 })
const jane = new Actor({ name: "Jane", currentHP: 100 })

const players = new Party({name: "Players"})
players.add(yendros)
players.add(aaron)

const enemies = new Party({name: "Enemies"})
enemies.add(jane)

const actorManager = new ActorManager()
actorManager.add(yendros)
actorManager.add(aaron)
actorManager.add(jane)

const partyManager = new PartyManager()
partyManager.add(players)
partyManager.add(enemies)

const evaluator = new Evaluator(actorManager, partyManager)

describe("Evaluator Module", () => {
    it("Exists", () => {
        expect(evaluator).toBeDefined()
    })
    
    describe("Evaluate target", () => {
        it("Find caster", () => {
            actorManager.setCaster(yendros.id)

            let target = evaluator.evaluateTarget({
                type: "caster"
            })

            expect(target).toMatchObject(yendros)
        })

        it("Find selected actor", () => {
            actorManager.setCaster(yendros.id)
            actorManager.select(jane.id)

            let target = evaluator.evaluateTarget({
                type: "actor",
                params: {
                    selected: true
                }
            })

            expect(target).toMatchObject(jane)
        })

        it("Find selected party", () => {
            partyManager.select(players.id)

            let target = evaluator.evaluateTarget({
                type: "party",
                params: {
                    selected: true
                }
            })

            expect(target).toMatchObject(players)
        })

        it("Find caster's party", () => {
            actorManager.setCaster(yendros.id)

            let target = evaluator.evaluateTarget({
                type: "party",
                params: {
                    hasActor: {
                        type: "caster"
                    }
                }
            })

            expect(target).toMatchObject(players)
        })

        it("Find selected actor's party", () => {
            actorManager.setCaster(yendros.id)
            actorManager.select(jane.id)

            let target = evaluator.evaluateTarget({
                type: "party",
                params: {
                    hasActor: {
                        type: "actor",
                        params: {
                            selected: true
                        }
                    }
                }
            })

            expect(target).toMatchObject(enemies)
        })
    })
})