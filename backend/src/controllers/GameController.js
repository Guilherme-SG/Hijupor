const ActorManager = require("../classes/managers/ActorManager")
const PartyManager = require("../classes/managers/PartyManager")
const SkillManager = require("../classes/managers/SkillManager")

const SkillSystem = require("../classes/skill/SkillSystem")
const Evaluator = require("../classes/Evaluator")
const ConditionalInterpreter = require("../classes/ConditionalInterpreter")
const Filter = require("../classes/Filter")

const ActorBuilderService = require('../services/ActorBuilderService')
const InternalRequestService = require("../services/InternalRequestService")

const Party = require("../classes/Party")

class GameController {
    constructor() {
        this.ActorManager = new ActorManager()
        this.PartyManager = new PartyManager()
        this.SkillManager = new SkillManager()

        const evaluator = new Evaluator(this.ActorManager, this.PartyManager)
        const conditionalInterpreter = new ConditionalInterpreter(evaluator)

        this.SkillSystem = new SkillSystem(
            evaluator,
            conditionalInterpreter,
            new Filter(conditionalInterpreter),
        )
    }

    async registerPlayer(id) {
        try {
            const data = await InternalRequestService.getActorById(id)
            const actor = ActorBuilderService.buildFromJSON(data)
            
            this.ActorManager.add(actor)
            return actor
        } catch (err) {
            console.log(err)
        }
    }

    deletePlayer(id) {
        this.ActorManager.delete(id)
    }

    createParty(name) {
        const party = new Party({ name })
        this.PartyManager.add(party)

        return party
    }

    addActorToParty(actorId, partyId) {
        const actor = this.ActorManager.get(actorId)
        const party = this.PartyManager.get(partyId)

        party.add(actor)
    }

    deleteParty(id) {
        this.PartyManager.delete(id)
    }

    setup() {
        return { 
            actors: this.ActorManager.getAll(),
            parties: this.PartyManager.getAll(),
        }
    }

    handleSkillUsage({targetId, casterId, skillId}) {
        this.ActorManager.setCaster(casterId)

        this.ActorManager.select(targetId)
        this.PartyManager.select(targetId)
        
        const skill = this.SkillManager.get(skillId)
        const caster = this.ActorManager.get(casterId)

        return this.SkillSystem.useSkill(caster, skill)
    }
}

module.exports = new GameController()