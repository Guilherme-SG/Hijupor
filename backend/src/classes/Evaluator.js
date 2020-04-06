class Evaluator {
    constructor(actorManager, partyManager) {
        this.actorManager = actorManager
        this.partyManager = partyManager
    }

    evaluateTarget(subject) {
        let targets = {
            caster: () => this.actorManager.getCaster(),
            skillTarget: () => this.actorManager.getSelectedActor(),
            party: () => this.partyManager.getSelectedParty(),
        }

        return targets[subject]()
    }

    evaluateAttribute(subject, attribute) {
        if(attribute.startsWith("get") || attribute.startsWith("is")) {
            return subject[attribute]()
        }

        return subject[attribute]
    }
}

module.exports = Evaluator