const request = require("supertest")
const app = require("../../src/app")

const SkillModel = require("../../src/models/Skill")

describe("Skill API", () => {
    const skillObj = {
        "name": "Investida",
        "description": "Avança em um inimigo, causando 25 (+1 cada 7 de Força) em um inimigo e atordoando-o logo depois. 8 rodadas de recarga.",
        "cooldown": 8,
        "paCost": 1,
        "tags": {
            "offensive": {
                "damageType": "physic",
                "subject": {
                    "type": "actor"
                },
                "damageFunction": "byFormula",
                "formula": "25 + Math.floor(caster.stats.for / 7)"
            },
            "disruptive": {
                "statusList": [
                    {
                        "name": "stunned"
                    }
                ]
            }
        }
    }

    beforeAll(async () => {
        await SkillModel.deleteMany({})
    })

    afterEach(async () => {
        await SkillModel.deleteMany({})
    })

    it("Has a module", () => {
        expect(SkillModel).toBeDefined()
    })

    it("Should register a skill and return it id- POST /skill", async () => {
        const response = await request(app)
            .post("/skill")
            .send(skillObj)

        expect(response.status).toBe(200)  
        expect(response.body).toHaveProperty("_id")  
    })

    it("Should find skill by name - GET /skill:name", async () => {
        await request(app)
            .post("/skill")
            .send(skillObj)

        const response = await request(app)
            .get("/skill/" + skillObj.name)

        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("name")

        expect(response.body.name).toBe(skillObj.name)
    })
})