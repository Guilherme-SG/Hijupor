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
            ["party", () => this.partyManager.getSelected()],
            ["direct", params => params.target ]
        ])

        if(targets.has(subject.type)) {
            return targets.get(subject.type)(subject.params)
        }

        return false
    }

    evaluateAttribute(subject, attribute) {
        if(attribute.startsWith("get") || attribute.startsWith("is")) {
            return subject[attribute]()
        }

        return subject[attribute]
    }
}

module.exports = Evaluator