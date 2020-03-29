
class ConditionalSystem {
    constructor() {
        this.dictionary = {
            subject: {
                single: "",
                party: "",
                caster: "",
                skillTarget: ""
            }
        }
    }

    isEqual = (value, reference) => value == reference
    isNotEqual = (value, reference) => value != reference
    isGreaterThan = (value, reference) => value > reference
    isGreaterThanOrEqual = (value, reference) => value >= reference
    isLessThan = (value, reference) => value < reference
    isLessThanOrEqual = (value, reference) => value <= reference

    trigger({ subject, fn, attribute, reference }) {
        const target = eval(this.dictionary.subject[subject])

        return this[fn](attribute, reference)
    }
}

module.exports = ConditionalSystem