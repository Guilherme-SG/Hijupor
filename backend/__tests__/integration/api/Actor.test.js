const request = require("supertest")
const app = require("../../../src/app")
const Actor = require("../../../src/classes/actor/Actor")
const Stats = require("../../../src/classes/actor/Stats")

const ActorModel = require("../../../src/models/Skill")
const ActorBuilderService = require("../../../src/services/ActorBuilderService")

const RawBonus = require("../../../src/classes/attribute/RawBonus")
const FinalBonus = require("../../../src/classes/attribute/FinalBonus")

describe("Actor API", () => {
    const actorCreation = new Actor({
        name: "Yendros",
        stats: new Stats({
            str: 60,
            dex: 60,
            aim: 0,
            res: 30,
            mr: 30,
            vit: 70,
            agi: 100,
            faith: 0,
            int: 100,
            sab: 0,
            car: 0
        }),
        job: "Mage",
        race: "Pagrius",
        age: 28,
        local: "O Norte",
        personality: "Lawful Evil"
    })

    beforeAll(async () => {
        await ActorModel.deleteMany({})
    })

    afterEach(async () => {
        await ActorModel.deleteMany({})
    })

    it("Has a module", () => {
        expect(ActorModel).toBeDefined()
    })

    
    it("Should register an actor and return its id - POST /actor", async () => {
        const response = await request(app)
            .post("/actor")
            .send(actorCreation)
        
        expect(response.status).toBe(200)  
        expect(response.body).toHaveProperty("_id")  
    })

    
    it("Should find actor by name - GET /actor?name=", async () => {
        actorCreation.name = "Josias"
        actorCreation.stamina.break()
        actorCreation.takeDamage(100)

        await request(app)
            .post("/actor")
            .send(actorCreation)

        const response = await request(app)
            .get("/actor?name=" + actorCreation.name)

        const actorFound = ActorBuilderService.build(response.body)

        expect(actorFound).toHaveProperty("_id")
        expect(actorFound).toHaveProperty("name")

        expect(actorFound.name).toBe(actorCreation.name)
        expect(actorFound.getAvailableStamina()).toBe(0)
    })
/*
    it("Should find skill by id - GET /skill:id", async () => {
        const responseSkill = await request(app)
            .post("/skill")
            .send(skillObj)

        const skill = responseSkill.body
        const response = await request(app)
            .get("/skill/" + skill._id)

        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("name")

        expect(response.body.name).toBe(skillObj.name)
    })*/
})