const Actor = require("../../src/classes/actor/Actor")
const Stats = require("../../src/classes/actor/Stats")

describe("Actor representation", () => {
    it("Exists", () => {
        const yendros = new Actor({name: "Yendros"})
        expect(yendros).toBeDefined()
    })

    it("Calculate HP with stats by default", () => {
        const yendros = new Actor({name: "Yendros"})

        expect(yendros.health.getTotal()).toBeGreaterThanOrEqual(100)
    })

    describe("Heal behavior", () => {
        it("Should heal 20HP without give shield", () => {
            const bear = new Actor({
                name: "Urso filhote",
                stats: new Stats({ vit: 20, res: 40 })
            })

            expect(bear.health.getAvailable()).toBe(200)
            expect(bear.health.getTotal()).toBe(200)

            expect(bear.stamina.getAvailable()).toBe(200)
            expect(bear.stamina.getTotal()).toBe(200)

            bear.stamina.break()

            expect(bear.stamina.getAvailable()).toBe(0)
            expect(bear.stamina.getTotal()).toBe(200)

            bear.takeDamage(100)

            expect(bear.health.getAvailable()).toBe(100)
            expect(bear.health.getTotal()).toBe(200)

            bear.heal(20)

            expect(bear.health.getAvailable()).toBe(120)
            expect(bear.health.getTotal()).toBe(200)

            expect(bear.stamina.getAvailable()).toBe(0)
            expect(bear.stamina.getTotal()).toBe(200)

        })

        it("Should heal 20HP and give shield", () => {
            const bear = new Actor({
                name: "Urso filhote",
                stats: new Stats({ vit: 20, res: 40 })
            })

            expect(bear.health.getAvailable()).toBe(200)
            expect(bear.health.getTotal()).toBe(200)

            expect(bear.stamina.getAvailable()).toBe(200)
            expect(bear.stamina.getTotal()).toBe(200)

            bear.stamina.break()

            expect(bear.stamina.getAvailable()).toBe(0)
            expect(bear.stamina.getTotal()).toBe(200)

            bear.takeDamage(100)

            expect(bear.health.getAvailable()).toBe(100)
            expect(bear.health.getTotal()).toBe(200)

            bear.healWithShield(200)

            expect(bear.health.getAvailable()).toBe(200)
            expect(bear.health.getTotal()).toBe(200)

            expect(bear.stamina.getAvailable()).toBe(100)
            expect(bear.stamina.getTotal()).toBe(200)

        })
    })

    describe("Take damage behavior", () => {
        it("Should lose HP if doesn't have a shield", () => {
            const human = new Actor({
                name: "Humano operário",
                stats: new Stats({ vit: 10 })
            })

            human.stamina.break()
            expect(human.haveShield()).toBeFalsy()

            human.takeDamage(100)

            expect(human.health.getAvailable()).toBe(50)
            expect(human.health.getTotal()).toBe(150)
        })

        it("Shouldn't lose HP if the shield take all damage", () => {
            const human = new Actor({
                name: "Humano operário",
                stats: new Stats({ vit: 10, res: 80 })
            })

            expect(human.haveShield()).toBeTruthy()

            human.takeDamage(100)

            expect(human.health.getAvailable()).toBe(150)
            expect(human.health.getTotal()).toBe(150)

            expect(human.stamina.getAvailable()).toBe(200)
            expect(human.stamina.getTotal()).toBe(300)
        })

        it("Shield should be broken if take a lot of damage", () => {
            const human = new Actor({
                name: "Humano operário",
                stats: new Stats({ vit: 10, res: 40 })
            })

            expect(human.haveShield()).toBeTruthy()

            human.takeDamage(200)

            expect(human.health.getAvailable()).toBe(150)
            expect(human.health.getTotal()).toBe(150)

            expect(human.haveShield()).toBeFalsy()
        })

        it("Should lose HP if the shield break before absorve all damage", () => {
            const human = new Actor({
                name: "Humano operário",
                stats: new Stats({ vit: 10, res: 40 })
            })

            expect(human.haveShield()).toBeTruthy()

            human.takeDamage(300)

            expect(human.health.getAvailable()).toBe(50)
            expect(human.health.getTotal()).toBe(150)

            expect(human.haveShield()).toBeFalsy()
        })

        it("Should die if take more damage than total HP", () => {
            const player = new Actor({
                name: "Yendros",
                stats: new Stats({ vit: 20})
            })

            player.takeDamage(400)

            expect(player.isDead()).toBeTruthy()
        })
    })

    it("Should be able to serialize info", () => {
        const liliana = new Actor({
            id: "342",
            name: "Liliana"
        })

        const serializedLiliana = liliana.serialize()

        expect(serializedLiliana).toMatchObject({
            id: "342",
            name: "Liliana",
            stats: {
                str: 0,
                dex: 0,
                aim: 0,
                int: 0,
                sab: 0,
                mr: 0,
                res: 0,
                car: 0,
                faith: 0,
                vit: 0
            },
            partyId: -1,
            currentHP: 100,
            totalHP: 100,
            currentStamina: 100,
            totalStamina: 100,
            status: [],
            skills: []
        })
    })
})