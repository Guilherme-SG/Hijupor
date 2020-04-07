const PartyManager = require("../../src/classes/managers/PartyManager")

const Party = require("../../src/classes/Party")

const players = new Party({ name: "Yendros"})
const enemies = new Party({ name: "Aaron"})

let partyManager

describe("Party Manager", () => {
    beforeEach( () => {
        partyManager = new PartyManager()
    })
    
    it("Module exists", () => {
        expect(partyManager).toBeDefined()
    })

    describe("Add Party", () => {
        it("Add single party", () => {     
            partyManager.add(players)

            expect(partyManager.has(players.id)).toBeTruthy()
        })

        it("Add 2 parties", () => {     
            partyManager.add(players)
            partyManager.add(enemies)

            expect(partyManager.has(players.id)).toBeTruthy()
            expect(partyManager.has(enemies.id)).toBeTruthy()
        })

        it("If never been called, the property \"parties\" should be empty", () => {
            expect(partyManager.size()).toBe(0)
        })
    })

    it("Get party using it id", () => {     
        partyManager.add(enemies)

        const foundParty = partyManager.get(enemies.id)

        expect(foundParty).toBeInstanceOf(Party)
        expect(foundParty).toMatchObject(enemies)
    })

    it("Select a party and get it", () => {
        partyManager.add(enemies)
        partyManager.select(enemies.id)

        const party = partyManager.getSelected()

        expect(party).toBeInstanceOf(Party)
        expect(party).toMatchObject(enemies)
    })

    it("Search for party by it name", () => {
        partyManager.add(players)

        expect(partyManager.getByName(players.name)).toMatchObject(players)
    })

})