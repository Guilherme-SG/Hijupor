const GameController = require("../../../../src/controllers/GameController")
const Skill = require("../../../../src/classes/skill/Skill")

describe("Game Controller Test", () => {
    beforeEach( () => {
        GameController.ActorManager.deleteAll()
        GameController.PartyManager.deleteAll()
    })

    it("Exists", () => {
        expect(GameController).toBeDefined()
    })

    it("Should add new player in actor manager", async () => {
        expect(GameController.ActorManager.getAll()).toHaveLength(0)

        await GameController.registerPlayer(1)

        expect(GameController.ActorManager.getAll()).toHaveLength(1)
    })

    it("Should add an actor in a party", async () => {
        const actor = await GameController.registerPlayer(2)
        const players = GameController.createParty("Players")

        expect(players.getAll()).toHaveLength(0)
        
        GameController.addActorToParty(actor.id, players.id)
        
        expect(players.getAll()).toHaveLength(1)
    })

    
    it("Should return game state", async () => {
        const p1 = await GameController.registerPlayer(2)
        const p2 = await GameController.registerPlayer(3)
        const p3 = await GameController.registerPlayer(4)
        const p4 = await GameController.registerPlayer(5)

        const players = GameController.createParty("Players")
        const enemies = GameController.createParty("Inimigos")

        GameController.addActorToParty(p1.id, players.id)
        GameController.addActorToParty(p2.id, players.id)
        
        GameController.addActorToParty(p3.id, enemies.id)
        GameController.addActorToParty(p4.id, enemies.id)

        const setup = GameController.setup()

        expect(setup).toMatchObject({
            actors: [p1, p2, p3, p4],
            parties: [players, enemies]
        })
    })

    it("Should handle skill usage with succetion", async () => {
        const p1 = await GameController.registerPlayer(7)
        const p2 = await GameController.registerPlayer(8)

        
        const investida = new Skill({
            "name": "Investida",
            "description": "Avança em um inimigo, causando 25 (+1 cada 7 de Força) em um inimigo e atordoando-o logo depois. 8 rodadas de recarga.",
            "cooldown": 8,
            "paCost": 1,
            "tags": {
                "offensive": {
                    "damageType": "physic",
                    "subject": {
                        "type": "actor",
                        "params": {
                            "selected": true
                        }
                    },
                    "damageFunction": "byFormula",
                    "formula": "25 + Math.floor(caster.stats.get('str') / 7)"
                }
            }
        })
        
        GameController.SkillManager.add(investida)
        GameController.handleSkillUsage({
            casterId: p1.id,
            targetId: p2.id,
            skillId: investida.id
        })
    })
})
