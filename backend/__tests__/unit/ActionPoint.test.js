const ActionPoint = require("../../src/classes/actor/ActionPoint")
const Attribute = require("../../src/classes/attribute/Attribute")
const RawBonus = require("../../src/classes/attribute/RawBonus")

describe("Action Point test", () => {
    it("Exists", () => {
        expect(ActionPoint).toBeDefined()
    })

    it("Default values should be 1", () => {
        const pa = new ActionPoint(new Attribute())

        expect(pa.getAvailable()).toBe(1)
        expect(pa.getTotal()).toBe(1)
    })

    it("Using 1 point, should remainging 0 points", () => {
        const pa = new ActionPoint(new Attribute())

        expect(pa.usePoints(1)).toBeTruthy()
        expect(pa.getAvailable()).toBe(0)
        expect(pa.getTotal()).toBe(1)
    })

    it("If actor has 50 of agility, then should have 2 action points", () => {
        const pa = new ActionPoint(new Attribute(50))

        expect(pa.getAvailable()).toBe(2)
        expect(pa.getTotal()).toBe(2)
    })

    it("If actor has 100 of agility, then should have 3 action points", () => {
        const pa = new ActionPoint(new Attribute(100))

        expect(pa.getAvailable()).toBe(3)
        expect(pa.getTotal()).toBe(3)
    })

    it("If try to use more points that available, no point should be used, and function return false", () => {
        const pa = new ActionPoint(new Attribute(50))

        expect(pa.getAvailable()).toBe(2)

        expect(pa.usePoints(3)).toBeFalsy()

        expect(pa.getAvailable()).toBe(2)        
    })

    it("On pass turn and all availables points was used, should recover total PA", () => {
        const pa = new ActionPoint(new Attribute())

        expect(pa.getAvailable()).toBe(1)
        expect(pa.usePoints(1)).toBeTruthy()
        expect(pa.getAvailable()).toBe(0)

        pa.update()

        expect(pa.getAvailable()).toBe(1)
    })

    it("On pass turn and not all availables points was used, should accumulate PA", () => {
        const pa = new ActionPoint(new Attribute(100))

        expect(pa.getAvailable()).toBe(3)
        expect(pa.usePoints(1)).toBeTruthy()
        expect(pa.getAvailable()).toBe(2)

        pa.update()

        expect(pa.getAvailable()).toBe(5)
        expect(pa.getTotal()).toBe(5)
    })

    it("On pass turn, all unused accumulated points accumulate again", () => {
        const pa = new ActionPoint(new Attribute(100))

        expect(pa.getAvailable()).toBe(3)
        expect(pa.getTotal()).toBe(3)

        expect(pa.usePoints(1)).toBeTruthy()

        expect(pa.getAvailable()).toBe(2)
        expect(pa.getTotal()).toBe(3)

        pa.update()

        expect(pa.getAvailable()).toBe(5)
        expect(pa.getTotal()).toBe(5)

        pa.update()

        expect(pa.getAvailable()).toBe(8)
        expect(pa.getTotal()).toBe(8)
    })

    it("Add 1 extra point", () => {
        const pa = new ActionPoint(new Attribute())
        
        expect(pa.getAvailable()).toBe(1)

        pa.addExtraPoint(1)

        expect(pa.getAvailable()).toBe(2)
    })

    it("Gained 1 extra point before this turn", () => {
        const pa = new ActionPoint(new Attribute())
        
        expect(pa.getAvailable()).toBe(1)
        expect(pa.usePoints(1)).toBeTruthy()
        expect(pa.getAvailable()).toBe(0)

        pa.addExtraPoint(1)

        expect(pa.getAvailable()).toBe(1)
        expect(pa.getTotal()).toBe(1)
        
        pa.update()

        expect(pa.getTotal()).toBe(2)
        expect(pa.getAvailable()).toBe(2)
        
    })

    it("Gained 50 of agi, so should add 1 point to total AP", () => {
        const agi = new Attribute(0)
        const pa = new ActionPoint(agi)

        expect(agi.getFinalValue()).toBe(0)

        expect(pa.getAvailable()).toBe(1)
        expect(pa.getTotal()).toBe(1)

        agi.addRawBonus(new RawBonus(50))

        expect(agi.getFinalValue()).toBe(50)

        expect(pa.getTotal()).toBe(2)
        console.log("dif")
        expect(pa.getAvailable()).toBe(2)
        
    })
})