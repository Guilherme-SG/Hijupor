const request = require("supertest")
const app = require("../../src/app")

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

    it("Should receive skill", async () => {
        const response = await request(app)
            .post("/skill")
            .send(skillObj)

        expect(response.status).toBe(200)    
    })

    it("Should return skill name", async () => {
        const response = await request(app)
            .post("/skill")
            .send(skillObj)

        expect(response.body.name).toBe(skillObj.name)    
    })
})