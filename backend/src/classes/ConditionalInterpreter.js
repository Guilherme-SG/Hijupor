class ConditionalInterpreter {
    constructor(evaluator) {
        this.evaluator = evaluator
        
        this.comparisions = new Map([
            ["isEqual", (value, reference) => value == reference],
            ["isNotEqual", (value, reference) => value != reference],
            ["isGreaterThan", (value, reference) => value > reference],
            ["isGreaterThanOrEqual", (value, reference) => value >= reference],
            ["isLessThan", (value, reference) => value < reference],
            ["isLessThanOrEqual", (value, reference) => value <= reference]
        ])
    }

    process(options) {
        const { subject, fn, params } = options
        if (!params) return false

        let { attribute, reference, value } = params

        if (!this.comparisions.has(fn)) return false

        if (subject) {
            const target = this.evaluator.evaluateTarget(subject)
            value = this.evaluator.evaluateAttribute(target, attribute)
        }

        return this.comparisions.get(fn)(value, reference)
    }

    processMany(optionsList) {
        if (!optionsList) return false
        return optionsList.every(this.process)
    }

}

module.exports = ConditionalInterpreter