const ActorManager = require("../../src/classes/managers/ActorManager")

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
            actorManager.add(yendros)

            expect(actorManager.has(yendros.id)).toBeTruthy()
        })

        it("Add 2 actors", () => {     
            actorManager.add(jane)
            actorManager.add(aaron)

            expect(actorManager.has(jane.id)).toBeTruthy()
            expect(actorManager.has(aaron.id)).toBeTruthy()
        })

        it("If never been called, the property \"actors\" should be empty", () => {
            expect(actorManager.size()).toBe(0)
        })
    })

    it("Get actor using his/her id", () => {     
        actorManager.add(yendros)

        const foundActor = actorManager.get(yendros.id)

        expect(foundActor).toBeInstanceOf(Actor)
        expect(foundActor).toMatchObject(yendros)
    })

    it("Define the caster of some skill", () => {
        actorManager.add(yendros)
        actorManager.setCaster(yendros.id)

        const caster = actorManager.getCaster()

        expect(caster).toBeInstanceOf(Actor)
        expect(caster).toMatchObject(yendros)
    })

    it("Select an actor and get it", () => {
        actorManager.add(yendros)
        actorManager.select(yendros.id)

        const actor = actorManager.getSelected()

        expect(actor).toBeInstanceOf(Actor)
        expect(actor).toMatchObject(yendros)
    })

    it("Search for an actor by his/her name", () => {
        actorManager.add(jane)

        expect(actorManager.getByName(jane.name)).toMatchObject(jane)
    })

})