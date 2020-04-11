const ActorManager = require("../../../src/classes/managers/ActorManager")
const PartyManager = require("../../../src/classes/managers/PartyManager")

const HealingTag = require("../../../src/classes/skill/HealingTag")

const Actor = require("../../../src/classes/actor/Actor")
const Party = require("../../../src/classes/Party")
const Skill = require("../../../src/classes/skill/Skill")

const Evaluator = require("../../../src/classes/Evaluator")
const ConditionalInterpreter = require("../../../src/classes/ConditionalInterpreter")
const Filter = require("../../../src/classes/Filter")

const RawBonus = require("../../../src/classes/attribute/RawBonus")

const harmonia = new Skill({
    "name": "Harmonia",
    "description": "Causa um Som harmonioso que recupera 25 (+1 cada 2 de Carisma) de Hp de um aliado. 6 rodadas de recarga.",
    "cooldown": 6,
    "paCost": 1,
    "tags": {
        "healing": {
            "subject": {
                "type": "actor",
                "params": {
                    "selected": true
                }
            },
            "healFunction": "byFormula",
            "formula": "25 + Math.floor(caster.stats.get('car') / 2)"
        }
    }
})

const healParty = new Skill({
    "name": "Cura de grupo",
    "description": "Recupera 25 (+1 cada 2 de Carisma) de Hp de todos os membros do grupo. 6 rodadas de recarga.",
    "cooldown": 6,
    "paCost": 1,
    "tags": {
        "healing": {
            "subject": {
                "type": "party",
                "params": {
                    "selected": true
                }
            },
            "healFunction": "byFormula",
            "formula": "25 + Math.floor(caster.stats.get('car') / 2)"
        }
    }
})

const healWithShield = new Skill({
    name: "Cura protetora",
    tags: {
        healing: {
            subject: {
                type: "actor",
                params: {
                    selected: true
                }
            },
            healFunction: "byFormula",
            formula: "15 + Math.floor(caster.stats.get('faith') / 5)",
            turnExtraHPToStamina: true
        }
    }
})

const protectionForEveryone = new Skill({
    name: "Proteção para todos",
    tags: {
        healing: {
            subject: {
                type: "party",
                params: {
                    selected: true
                }
            },
            healFunction: "byFormula",
            formula: "15 + Math.floor(caster.stats.get('faith') / 5)",
            turnExtraHPToStamina: true
        }
    }
})

const lifeSteal = new Skill({
    name: "Roubo de vida",
    description: "Recupera HP em 50% do dano causado",
    tags: {
        healing: {
            subject: {
                type: "caster"
            },
            healFunction: "byPercentualOf",
            percentual: 0.5,
            reference: "skill.damageDone"
        }
    }
})

const faithIsForEveryone = new Skill({
    "name": "A Fé é para Todos",
    "description": "Recupera de todos os aliados 10 (+1 cada 2 de Fé). 8 rodadas de recarga.",
    "type": "healing",
    "cooldown": 8,
    "paCost": 1,
    "tags": {
        "healing": {
            "subject": {
                "type": "party",
                "params": {
                    "hasActor": {
                        "type": "caster"
                    }
                }
            },
            "healFunction": "byFormula",
            "formula": "10 + Math.floor(caster.stats.get('faith') / 2)"
        }
    }
})

describe("Healing Skill Interpreter", () => {
    let yendros, aaron, jane
    let players, enemies

    let evaluator, conditionalInterpreter, filter
    let actorManager, partyManager

    let healingTag

    beforeAll(() => {
        actorManager = new ActorManager()
        partyManager = new PartyManager()

        evaluator = new Evaluator(actorManager, partyManager)
        conditionalInterpreter = new ConditionalInterpreter(evaluator)
        filter = new Filter(conditionalInterpreter)
        
        healingTag = new HealingTag(evaluator, conditionalInterpreter, filter)
    })

    beforeEach( () => {
        yendros = new Actor({ name: "Yendros" })
        aaron = new Actor({ name: "Aaron" })
        jane = new Actor({ name: "Jane" })

        actorManager.add(yendros)
        actorManager.add(aaron)
        actorManager.add(jane)
        
        players = new Party("Players")
        players.add(yendros)
        players.add(aaron)

        enemies = new Party("Enemies")
        enemies.add(jane)

        partyManager.add(players)
        partyManager.add(enemies)

    })

    afterEach(() => {
        actorManager.deleteAll()
        partyManager.deleteAll()
    })

    it("Exists", () => {
        expect(healingTag).toBeDefined()
    })

    it("Should heal (calculated by formula) a single target", () => {
        jane.currentHP = 75

        actorManager.select(jane.id)
        healingTag.active(aaron, harmonia)
        
        expect(jane.currentHP).toBe(100)
    })

    it("Should heal (calculated by formula) a single target, the caster have 100 of carism", () => {
        yendros.currentHP = 25
        aaron.stats.car.addRawBonus(new RawBonus(100))
        

        actorManager.select(yendros.id)
        healingTag.active(aaron, harmonia)

        expect(yendros.currentHP).toBe(100)
    })

    it("Should heal (calculated by foruma) an entire party, the caster have 100 of carism", () => {
        yendros.currentHP = 25
        aaron.currentHP = 25

        jane.stats.car.addRawBonus(new RawBonus(100))

        partyManager.select(players.id)
        healingTag.active(jane, healParty)

        expect(yendros.currentHP).toBe(100)
        expect(aaron.currentHP).toBe(100)
    })

    it("Should heal (calculated by formula) a single target, the caster have 100 of faith, and exceeding heal turn into stamina", () => {
        yendros.currentHP = 85
        aaron.stats.faith.addRawBonus(new RawBonus(100))

        actorManager.select(yendros.id)
        healingTag.active(aaron, healWithShield)

        expect(yendros.currentHP).toBe(100)
        expect(yendros.totalHP).toBe(100)
        expect(yendros.haveShield()).toBeTruthy()
        expect(yendros.currentStamina).toBe(20)
    })

    it("Should heal (calculated by formula) an entire party, the caster have 100 of faith, and exceeding heal turn into stamina", () => {
        aaron.currentHP = 75
        yendros.currentHP = 85
        jane.stats.faith.addRawBonus(new RawBonus(100))

        partyManager.select(players.id)
        healingTag.active(jane, protectionForEveryone)

        expect(yendros.currentHP).toBe(100)
        expect(yendros.haveShield()).toBeTruthy()
        expect(yendros.currentStamina).toBe(20)

        expect(aaron.currentHP).toBe(100)
        expect(aaron.haveShield()).toBeTruthy()
        expect(aaron.currentStamina).toBe(10)
    })

    it("Should heal caster 50% of damage caused by skill", () => {
        actorManager.setCaster(aaron.id)
        aaron.currentHP = 10
        lifeSteal.damageDone = 100

        healingTag.active(aaron, lifeSteal)

        expect(aaron.currentHP).toBe(60)
    })

    it("Should heal caster and his/her party", () => {
        aaron.currentHP = 15
        yendros.currentHP = 24
        
        actorManager.setCaster(aaron.id)
        healingTag.active(aaron, faithIsForEveryone)

        expect(aaron.currentHP).toBe(25)
        expect(yendros.currentHP).toBe(34)
    })
})