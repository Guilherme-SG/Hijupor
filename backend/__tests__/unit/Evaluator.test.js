const ConditionalInterpreter = require('../../src/classes/ConditionalInterpreter')
const Evaluator = require("../../src/classes/Evaluator")

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

const evaluator = new Evaluator(actorManager, partyManager)

describe("Evaluator Module", () => {
    it("Exists", () => {
        expect(evaluator).toBeDefined()
    })
    
    describe("Evaluate target", () => {
        it("", () => {
            let target = evaluator.evaluateTarget({
                type: "caster"
            })
        })
    })
})