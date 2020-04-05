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
        await SkillModel.remove({})
    })

    afterEach(async () => {
        await SkillModel.remove({})
    })

    it("Has a module", () => {
        console.log(process.env.DATABASE)
        expect(SkillModel).toBeDefined()
    })

    it("Should register a skill", async () => {
        const response = await request(app)
            .post("/skill")
            .send(skillObj)

        expect(response.status).toBe(200)    
    })

    it("Should return it id on registration", async () => {
        const response = await request(app)
            .post("/skill")
            .send(skillObj)

        expect(response.body).toHaveProperty("_id")
    })
})