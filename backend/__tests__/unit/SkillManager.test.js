const SkillManager = require("../../src/classes/managers/SkillManager")

const Skill = require("../../src/classes/skill/Skill")

const investida = new Skill({ name: "Investida", currentHP: 100 })
const sugarVida = new Skill({ name: "Sugar Vida!", currentHP: 100 })
const morfar = new Skill({ name: "Morfar!", currentHP: 100 })

let skillManager

describe("Skill Manager", () => {
    beforeEach( () => {
        skillManager = new SkillManager()
    })
    
    it("Module exists", () => {
        expect(skillManager).toBeDefined()
    })

    describe("Add Skill", () => {
        it("Add single actor", () => {     
            skillManager.add(investida)

            expect(skillManager.has(investida.id)).toBeTruthy()
        })

        it("Add 2 skills", () => {     
            skillManager.add(morfar)
            skillManager.add(sugarVida)

            expect(skillManager.has(morfar.id)).toBeTruthy()
            expect(skillManager.has(sugarVida.id)).toBeTruthy()
        })

        it("If never been called, the property \"skills\" should be empty", () => {
            expect(skillManager.size()).toBe(0)
        })
    })

    it("Get actor using his/her id", () => {     
        skillManager.add(investida)

        const foundSkill = skillManager.get(investida.id)

        expect(foundSkill).toBeInstanceOf(Skill)
        expect(foundSkill).toMatchObject(investida)
    })

    it("Search for an actor by it name", () => {
        skillManager.add(morfar)

        expect(skillManager.getByName(morfar.name)).toMatchObject(morfar)
    })

})