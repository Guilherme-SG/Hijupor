const express = require("express")
const routes = require("./routes")
const app = express()

app.use(express.json())
app.use(routes)

app.listen(3333)


const SkillSystem = require("./classes/skill/SkillSystem")
const gameSystem = require('./classes/GameSystem')

const Actor = require("./classes/Actor")
const Party = require("./classes/Party")
const Skill = require("./classes/skill/Skill")

function showRelevanteInfo(actor) {
    return `===== ${actor.name} =====\nHP: ${actor.currentHP}/${actor.totalHP}\nStamina: ${actor.currentStamina}/${actor.totalStamina}\nStatus: ${actor.status.length > 0 ? actor.status : "nenhum"}\n`
}

const players = new Party("Players")

const aaron = new Actor("Aaron")
const yendros = new Actor("Yendros")
const ravni = new Actor("Ravni")
const groknak = new Actor("Groknak")
const tenshinhan = new Actor("Tenshinhan")
const jane = new Actor("Jane")

players.addMember(aaron)
players.addMember(yendros)
players.addMember(ravni)
players.addMember(groknak)
players.addMember(tenshinhan)

gameSystem.addParty(players)

gameSystem.addActor(aaron)
gameSystem.addActor(yendros)
gameSystem.addActor(ravni)
gameSystem.addActor(groknak)
gameSystem.addActor(tenshinhan)
gameSystem.addActor(jane)

gameSystem.setSelectedActor(yendros.id),
gameSystem.setSelectedParty(players.id)

gameSystem.registerSkill(
    new Skill("Cura Todos", {
        healing: {
            subject: {
                type: "party",
            },
            healFunction: "byFixedValue",
            fixedValue: 100,
            turnExtraHPToStamina: true
        }
    })
)

gameSystem.registerSkill(
    new Skill("A Fé é para Todos", {
        healing: {
            subject: {
                type: "party",
            },
            healFunction: "byFormula",
            formula: "10 + Math.floor(caster.stats.faith / 2)"
        }
    })
)

gameSystem.registerSkill(
    new Skill("Sugar Vida!", {
        offensive: {
            damageType: "magic",
            subject: {
                type: "actor",
            },yendros,
            damageFunction: "byFormula",
            formula: "25 + Math.floor(caster.stats.car / 2)"
        },
        healing: {
            subject: {
                type: "caster",
            },
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
            subject: {
                type: "actor",
            },
            healFunction: "byFormula",
            formula: "25 + Math.floor(caster.stats.car / 2)"
        }
    })
)

gameSystem.registerSkill(
    new Skill("A Fé é o Melhor Remédio", {
        healing: {
            subject: {
                type: "actor",
            },yendros,
            healFunction: "byFormula",
            formula: "25 + caster.stats.faith"
        }
    })
)

gameSystem.registerSkill(
    new Skill("Punição Divina", {
        offensive: {
            damageType: "magic",
            subject: {
                type: "actor",
            },
            extraDamageHitAnotherEnemy: true,
            damageFunction: "byFormula",
            formula: "55 + Math.floor(caster.stats.faith / 2)"
        }
    })
)

gameSystem.registerSkill(
    new Skill("Palavra da Morte", {
        offensive: {
            damageType: "magic",
            subject: {
                type: "actor",
            },
            damageFunction: "byFormula",
            formula: "25 + Math.floor(caster.stats.car / 2)",
            damageBonus: [
                {
                    multipler: 0.5,
                    trigger: {
                        subject: "skillTarget",
                        fn: "isLessThanOrEqual",
                        params: {
                            attribute: "getPercentualHP",
                            reference: 0.25
                        }
                    }
                }
            ]
        }
    })
)

gameSystem.registerSkill(
    new Skill("Investida", {
        offensive: {
            damageType: "physic",
            subject: {
                type: "actor",
            },
            damageFunction: "byFormula",
            formula: "25 + Math.floor(caster.stats.for / 7)"
        },
        disruptive: {
            statusList: [
                {
                    name: "stunned"
                }
            ]
        }
    },
    null,
    "",
    1,
    0,
    8)
)

aaron.addSkill(gameSystem.getSkillByName("A Fé é o Melhor Remédio").id)
aaron.addSkill(gameSystem.getSkillByName("Cura Todos").id)

ravni.addSkill(gameSystem.getSkillByName("Sugar Vida!").id)
ravni.addSkill(gameSystem.getSkillByName("Palavra da Morte").id)

jane.addSkill(gameSystem.getSkillByName("Punição Divina").id)

groknak.addSkill(gameSystem.getSkillByName("Investida").id)

const skillSystem = new SkillSystem()

console.log("Pré cura", showRelevanteInfo(gameSystem.getSelectedActor()), showRelevanteInfo(aaron))

gameSystem.useSkill(aaron.id, "A Fé é o Melhor Remédio", skillSystem)
console.log(showRelevanteInfo(gameSystem.getSelectedActor()), showRelevanteInfo(aaron))

gameSystem.useSkill(aaron.id, "Cura Todos", skillSystem)
console.log(showRelevanteInfo(gameSystem.getSelectedActor()), showRelevanteInfo(ravni))

gameSystem.useSkill(ravni.id, "Sugar Vida!", skillSystem)
console.log(showRelevanteInfo(gameSystem.getSelectedActor()), showRelevanteInfo(ravni))

gameSystem.useSkill(jane.id, "Punição Divina", skillSystem)
players.getMembers().forEach( member => console.log(showRelevanteInfo(member)))

gameSystem.useSkill(ravni.id, "Palavra da Morte", skillSystem)
console.log(showRelevanteInfo(gameSystem.getSelectedActor()), showRelevanteInfo(ravni))

gameSystem.useSkill(groknak.id, "Investida", skillSystem)
console.log(showRelevanteInfo(gameSystem.getSelectedActor()))

gameSystem.useSkill(jane.id, "Punição Divina", skillSystem)
players.getMembers().forEach( member => console.log(showRelevanteInfo(member)))

gameSystem.useSkill(jane.id, "Punição Divina", skillSystem)
players.getMembers().forEach( member => console.log(showRelevanteInfo(member)))

gameSystem.useSkill(jane.id, "Punição Divina", skillSystem)
players.getMembers().forEach( member => console.log(showRelevanteInfo(member)))