const Actor = require("../../src/classes/actor/Actor")

describe("Actor representation", () => {
    it("Exists", () => {
        const yendros = new Actor({name: "Yendros"})
        expect(yendros).toBeDefined()
    })

    it("Calculate HP with stats by default", () => {
        const yendros = new Actor({name: "Yendros"})

        expect(yendros.totalHP).toBeGreaterThanOrEqual(100)
    })

    it("Should not calculate default hp with pass currentHP and totalHP", () => {
        const formiga = new Actor({
            name: "Formiga Guerreira do Deserto",
            currentHP: 25,
            totalHP: 40
        })
        
        expect(formiga.currentHP).toBe(25)
        expect(formiga.totalHP).toBe(40)
    })

    it("Should return percentual of HP", () => {
        const golem = new Actor({
            name: "Golem",
            currentHP: 100,
            totalHP: 1000
        })

        expect(golem.getPercentualHP()).toBe(0.1)
    })

    describe("Heal behavior", () => {
        it("Should heal 20HP without give shield", () => {
            const bear = new Actor({
                name: "Urso filhote",
                currentHP: 5,
                totalHP: 10
            })

            expect(bear.currentStamina).toBe(0)
            expect(bear.totalStamina).toBe(0)

            bear.healHP(20, false)

            expect(bear.currentHP).toBe(10)
            expect(bear.currentStamina).toBe(0)
            expect(bear.totalStamina).toBe(0)

        })

        it("Should heal 20HP and give shield", () => {
            const bear = new Actor({
                name: "Urso filhote",
                currentHP: 5,
                totalHP: 10
            })

            expect(bear.currentStamina).toBe(0)
            expect(bear.totalStamina).toBe(0)

            bear.healHP(20, true)

            expect(bear.currentHP).toBe(10)

            expect(bear.currentStamina).toBe(15)
            expect(bear.totalStamina).toBe(15)

        })
    })

    describe("Take damage behavior", () => {
        it("Should lose HP if doesn't have a shield", () => {
            const human = new Actor({
                name: "Humano operário",
                currentHP: 150,
                totalHP: 150
            })

            expect(human.haveShield()).toBeFalsy()

            human.takeDamage(100)

            expect(human.currentHP).toBe(50)
            expect(human.totalHP).toBe(150)
        })

        it("Shouldn't lose HP if the shield take all damage", () => {
            const human = new Actor({
                name: "Humano operário",
                currentHP: 150,
                totalHP: 150,
                totalStamina: 300,
                currentStamina: 300
            })

            expect(human.haveShield()).toBeTruthy()

            human.takeDamage(100)

            expect(human.currentHP).toBe(150)
            expect(human.totalHP).toBe(150)

            expect(human.currentStamina).toBeLessThan(human.totalStamina)
        })

        it("Shield should be broken if take a lot of damage", () => {
            const human = new Actor({
                name: "Humano operário",
                currentHP: 150,
                totalHP: 150,
                totalStamina: 300,
                currentStamina: 300
            })

            expect(human.haveShield()).toBeTruthy()

            human.takeDamage(300)

            expect(human.currentHP).toBe(150)
            expect(human.totalHP).toBe(150)

            expect(human.haveShield()).toBeFalsy()
        })

        it("Should lose HP if the shield break before absorve all damage", () => {
            const human = new Actor({
                name: "Humano operário",
                currentHP: 150,
                totalHP: 150,
                totalStamina: 300,
                currentStamina: 300
            })

            expect(human.haveShield()).toBeTruthy()

            human.takeDamage(400)

            expect(human.currentHP).toBe(50)
            expect(human.totalHP).toBe(150)

            expect(human.haveShield()).toBeFalsy()
        })

        it("Should die if take more damage than total HP", () => {
            const player = new Actor({
                name: "Yendros",
                currentHP: 400,
                totalHP: 400
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
            currentStamina: 0,
            totalStamina: 0,
            status: [],
            skills: []
        })
    })
})