const Stats = require("../../../src/classes/actor/Stats")
const RawBonus = require("../../../src/classes/actor/RawBonus")
const FinalBonus = require("../../../src/classes/FinalBonus")

describe("Stats Representation", () => {
    it("Exists", () => {
        expect(Stats).toBeDefined()
    })

    it("Default value is 0", () => {
        let stats = new Stats({})

        expect(stats.get("vit")).toBe(0)
    })

    it("Add raw bonus of 100 to vit", () => {
        let stats = new Stats({})
        stats.vit.addRawBonus(new RawBonus(100))

        expect(stats.get("vit")).toBe(100)
    })

    
    it("Add raw bonus of 100 to vit and +10%", () => {
        let stats = new Stats({})
        stats.vit.addRawBonus(new RawBonus(100, 0.1))

        expect(stats.get("vit")).toBe(110)
    })

    it("Add raw bonus of 100 to vit and +10%, and finally + 15%", () => {
        let stats = new Stats({})
        stats.vit.addRawBonus(new RawBonus(100, 0.1))

        stats.vit.addFinalBonus(new FinalBonus(0, 0.15))

        expect(stats.get("vit")).toBe(127)
    })

    it("Decrease vit in 20%", () => {
        let stats = new Stats({})

        stats.vit.addRawBonus(new RawBonus(100))

        stats.vit.addFinalBonus(new FinalBonus(0, -0.2))

        expect(stats.get("vit")).toBe(80)
    })
})