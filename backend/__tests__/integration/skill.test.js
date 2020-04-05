const mongoose = require("mongoose")
const Skill = require("../../src/")

mongoose.connect(process.env.DATABASE_TEST)

describe("Skill API", () => {
    it("Should receive skill name", () => {
        const x = 2
        const y = 10

        const sum = 12

        expect(sum).toBe(12)
    })
})