const gameSystem = new require('./classes/GameSystem')
const Unit = require("./classes/Unit")
const Party = require("./classes/Party")
const Skill = require("./classes/skill/Skill")

function showRelevanteInfo(actor) {
    return `===== ${actor.name} =====\nHP: ${actor.currentHP}/${actor.totalHP}\nStamina: ${actor.currentStamina}/${actor.totalStamina}\n`
}

const players = new Party("Players")

const aaron = new Unit("Aaron")
const yendros = new Unit("Yendros")
const ravni = new Unit("Ravni")
const groknak = new Unit("Groknak")
const tenshinhan = new Unit("Tenshinhan")
const jane = new Unit("Jane")

players.addMember(aaron)
players.addMember(yendros)
players.addMember(ravni)
players.addMember(groknak)
players.addMember(tenshinhan)

console.log("index", gameSystem)

gameSystem.addParty(players)

gameSystem.addActor(aaron)
gameSystem.addActor(yendros)
gameSystem.addActor(ravni)
gameSystem.addActor(groknak)
gameSystem.addActor(tenshinhan)
gameSystem.addActor(jane)

gameSystem.registerSkill(
    new Skill("Cura Todos", {
        healing: {
            target: players,
            healFunction: "byFixedValue",
            fixedValue: 100,
            turnExtraHPToStamina: true
        }
    })
)

gameSystem.registerSkill(
    new Skill("A Fé é para Todos", {
        healing: {
            target: players,
            healFunction: "byFormula",
            formula: "10 + Math.floor(caster.stats.faith / 2)"
        }
    })
)

gameSystem.registerSkill(
    new Skill("Sugar Vida!", {
        offensive: {
            target: yendros,
            damageFunction: "byFormula",
            formula: "25 + Math.floor(caster.stats.car / 2)"
        },
        healing: {
            target: "caster",
            turnExtraHPToStamina: true,
            healFunction: "byPercentualOf",
            percentual: 0.5,
            reference: "skill.tags.offensive.damage"
        }
    })
)

gameSystem.registerSkill(
    new Skill("Harmonia", {
        healing: {
            target: players,
            healFunction: "byFormula",
            formula: "25 + Math.floor(caster.stats.car / 2)"
        }
    })
)

gameSystem.registerSkill(
    new Skill("A Fé é o Melhor Remédio", {
        healing: {
            target: yendros,
            healFunction: "byFormula",
            formula: "25 + caster.stats.faith"
        }
    })
)

gameSystem.registerSkill(
    new Skill("Punição Divina", {
        offensive: {
            target: players,
            extraDamageHitAnotherEnemy: true,
            damageFunction: "byFormula",
            formula: "55 + Math.floor(caster.stats.faith / 2)"
        }
    })
)

gameSystem.registerSkill(
    new Skill("Palavra da Morte", {
        offensive: {
            target: jane,
            damageFunction: "byFormula",
            formula: "25 + Math.floor(caster.stats.car / 2)",
            damageBonus: [
                {
                    multipler: 0.5,
                    trigger: {
                        subject: "skillTarget",
                        fn: "isLessThanOrEqual",
                        params: {
                            attribute: "percentualHP",
                            reference: 0.25
                        }
                    }
                }
            ]
        }
    })
)

aaron.addSkill(gameSystem.getSkillByName("A Fé é o Melhor Remédio").id)
aaron.addSkill(gameSystem.getSkillByName("Cura Todos").id)

ravni.addSkill(gameSystem.getSkillByName("Sugar Vida!").id)
ravni.addSkill(gameSystem.getSkillByName("Palavra da Morte").id)

jane.addSkill(gameSystem.getSkillByName("Punição Divina").id)

console.log("Pré cura", showRelevanteInfo(yendros), showRelevanteInfo(aaron))

gameSystem.useSkill(aaron.id, "A Fé é o Melhor Remédio")
console.log(showRelevanteInfo(yendros), showRelevanteInfo(aaron))

gameSystem.useSkill(aaron.id, "Cura Todos")
console.log(showRelevanteInfo(yendros), showRelevanteInfo(ravni))

gameSystem.useSkill(ravni.id, "Sugar Vida!")
console.log(showRelevanteInfo(yendros), showRelevanteInfo(ravni))

gameSystem.useSkill(jane.id, "Punição Divina")
players.getMembers().forEach( member => console.log(showRelevanteInfo(member)))

gameSystem.useSkill(ravni.id, "Palavra da Morte")
console.log(showRelevanteInfo(jane), showRelevanteInfo(ravni))