const Party = require("../../src/classes/Party")
const Actor = require("../../src/classes/Actor")

const yendros = new Actor({ name: "Yendros", currentHP: 100 })
const aaron = new Actor({ name: "Aaron", currentHP: 100 })
const jane = new Actor({ name: "Jane", currentHP: 100 })

let alies
describe("Party", () => {
    beforeEach( () => {
        alies = new Party({name: "Alies"})
    })

    it("Should add actor to party and verify it", () => {
        alies.add(yendros)

        expect(alies.size()).toBe(1)
        expect(alies.has(yendros.id)).toBeTruthy()
    })

    it("On add actor in party he/she and actor have to know his/her party's id", () => {
        alies.add(yendros)

        expect(yendros.partyId).toBe(alies.id)
    })

    it("Should be able to remove actor from party", () => {
        alies.add(aaron)
        alies.add(jane)
        alies.add(yendros)

        expect(alies.size()).toBe(3)
        expect(alies.has(aaron.id)).toBeTruthy()
        expect(alies.has(jane.id)).toBeTruthy()
        expect(alies.has(yendros.id)).toBeTruthy()

        expect(jane.partyId).toBe(alies.id)

        alies.delete(jane.id)

        expect(jane.partyId).not.toBe(alies.id)

        expect(alies.size()).toBe(2)
        expect(alies.has(aaron.id)).toBeTruthy()
        expect(alies.has(jane.id)).toBeFalsy()
        expect(alies.has(yendros.id)).toBeTruthy()
    })

    it("Should be able to serialize info", () => {
        expect(alies.serialize()).toMatchObject({
            id: alies.id,
            members: []
        })

        alies.add(aaron)

        expect(alies.serialize()).toMatchObject({
            id: alies.id,
            members: [aaron.id]
        })


        alies.add(jane)
        alies.add(yendros)

        expect(alies.serialize()).toMatchObject({
            id: alies.id,
            members: [aaron.id, jane.id, yendros.id]
        })
    })
})