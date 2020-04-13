const DependantAttributeContainer = require("../../src/classes/actor/DependantAttributeContainer")
const Attribute = require("../../src/classes/attribute/Attribute")

describe("Sem Nome Test", () => {
    it("Exists", () => {
        expect(DependantAttributeContainer).toBeDefined()
    })

    it("Health Test", () => {
        const vit = new Attribute(100)
        const health = new DependantAttributeContainer(100, vit, 5, 1)

        expect(health.getTotal()).toBe(600)
        expect(health.getAvailable()).toBe(600)
        expect(health.getPercentage()).toBe(1)
    })

    it("Action Points Test", () => {
        const agi = new Attribute(100)
        const actionPoint = new DependantAttributeContainer(1, agi, 1, 50)

        expect(actionPoint.getTotal()).toBe(3)
        expect(actionPoint.getAvailable()).toBe(3)
        expect(actionPoint.getPercentage()).toBe(1)
    })

    it("Stamina Test", () => {
        const res = new Attribute(100)
        const stamina = new DependantAttributeContainer(100, res, 50, 20)

        expect(stamina.getTotal()).toBe(350)
        expect(stamina.getAvailable()).toBe(350)
        expect(stamina.getPercentage()).toBe(1)
    })
})