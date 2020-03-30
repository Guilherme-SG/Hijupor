const gameSystem = require("./GameSystem")

class ConditionalSystem {

    isEqual = (value, reference) => value == reference
    isNotEqual = (value, reference) => value != reference
    isGreaterThan = (value, reference) => value > reference
    isGreaterThanOrEqual = (value, reference) => value >= reference
    isLessThan = (value, reference) => value < reference
    isLessThanOrEqual = (value, reference) => value <= reference

    minValueInArray = array => Math.min(...array)
    maxValueInArray = array => Math.max(...array)

    trigger({ subject, fn, params }) {
        const { attribute, reference } = params
        
        const target = this.evaluateTarget(subject)
        let value = this.evaluateAttribute(target, attribute)
        
        return this[fn](value, reference)
    }

    filter(array, {fn, params}) {
        const { many } = params

        if(many == 1) {
            return array.find()
        }
    }

    evaluateTarget(subject) {
        let targets = {
            caster: () => gameSystem.getCaster(),
            skillTarget: () => gameSystem.getSelectedActor(),
            party: () => gameSystem.getSelectedParty(),
        }

        return targets[subject]()
    }

    evaluateAttribute(subject, attribute) {
        if(attribute.startsWith("get")) {
            return subject[attribute]()
        }

        return subject[attribute]
    }
}

module.exports = ConditionalSystem