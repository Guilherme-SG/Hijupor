const ActorManager = require("../../src/classes/ActorManager")

const Actor = require("../../src/classes/Actor")

const yendros = new Actor({ name: "Yendros", currentHP: 100 })
const aaron = new Actor({ name: "Aaron", currentHP: 100 })
const jane = new Actor({ name: "Jane", currentHP: 100 })

let actorManager

describe("Actor Manager", () => {
    beforeEach( () => {
        actorManager = new ActorManager()
    })
    
    it("Module exists", () => {
        expect(actorManager).toBeDefined()
    })

    describe("Add Actor", () => {
        it("Add single actor", () => {     
            actorManager.addActor(yendros)
            expect(actorManager.actors).toHaveProperty(yendros.id)
        })

        it("Add 2 actors", () => {     
            actorManager.addActor(jane)
            actorManager.addActor(aaron)

            expect(actorManager.actors).toHaveProperty(jane.id)
            expect(actorManager.actors).toHaveProperty(aaron.id)
        })

        it("If never benn called, the property \"actors\" should be empty", () => {
            expect(actorManager.actors).toMatchObject({})
        })
    })

    it("Get actor using his/her id", () => {     
        actorManager.addActor(yendros)

        const foundActor = actorManager.getActor(yendros.id)

        expect(foundActor).toBeInstanceOf(Actor)
        expect(foundActor).toMatchObject(yendros)
    })

    it("Define the caster of some skill", () => {
        actorManager.addActor(yendros)
        actorManager.setCaster(yendros.id)

        const caster = actorManager.getCaster()

        expect(caster).toBeInstanceOf(Actor)
        expect(caster).toMatchObject(yendros)
    })

    it("Select an actor and get it", () => {
        actorManager.addActor(yendros)
        actorManager.selectActor(yendros.id)

        const actor = actorManager.getSelectedActor()

        expect(actor).toBeInstanceOf(Actor)
        expect(actor).toMatchObject(yendros)
    })

    it("Search for an actor by his/her name", () => {
        actorManager.addActor(jane)

        expect(actorManager.getActorByName(jane.name)).toMatchObject(jane)
    })

})