class Evaluator {
    constructor(actorManager, partyManager) {
        this.actorManager = actorManager
        this.partyManager = partyManager
    }

    evaluateTarget(subject) {
        let targets = new Map([
            ["caster", () => this.actorManager.getCaster()],
            ["actor", (params) => {
                if(params.selected) return this.actorManager.getSelected()
            }],
            ["party", params => {
                if(params.selected) return this.partyManager.getSelected()

                if(params.hasActor) {
                    let actor = this.evaluateTarget(params.hasActor)
                    return this.partyManager.get(actor.partyId)
                }
                
            }],
            ["direct", params => params.target ]
        ])

        if(targets.has(subject.type)) {
            return targets.get(subject.type)(subject.params)
        }

        return false
    }

    getActorsParty(actor) {
        return this.partyManager.get(actor.partyId)
    }

    evaluateAttribute(subject, attribute) {

        if(attribute.startsWith("get") 
            || attribute.startsWith("is") 
            || attribute.startsWith("have")) {
            return subject[attribute]()
        }

        return subject[attribute]
    }
}

module.exports = Evaluator