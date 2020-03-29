const gameSystem = require("./GameSystem")
console.log("conditional", gameSystem)

class ConditionalSystem {

    isEqual = (value, reference) => value == reference
    isNotEqual = (value, reference) => value != reference
    isGreaterThan = (value, reference) => value > reference
    isGreaterThanOrEqual = (value, reference) => value >= reference
    isLessThan = (value, reference) => value < reference
    isLessThanOrEqual = (value, reference) => value <= reference

    trigger({ subject, fn, params }) {
        const { attribute, reference } = params
        const target = this.evaluateTarget(subject)

        console.log({ subject, fn, attribute, reference })
        return true //this[fn](attribute, reference)
    }

    evaluateTarget(subject) {
        console.log(gameSystem)
        let targets = {
            caster: () => gameSystem.getCaster(),
            skillTarget: () => gameSystem.getSelectedActor(),
            party: () => gameSystem.getSelectedParty(),
        }

        return targets[subject]()
    } 
}

module.exports = ConditionalSystem