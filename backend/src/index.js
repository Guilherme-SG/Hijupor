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
