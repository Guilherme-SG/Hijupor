class ConditionalInterpreter {
    constructor(evaluator) {
        this.evaluator = evaluator
        
        this.comparisions = new Map([
            ["isEqual", (value, reference) => value == reference],
            ["isNotEqual", (value, reference) => value != reference],
            ["isGreaterThan", (value, reference) => value > reference],
            ["isGreaterThanOrEqual", (value, reference) => value >= reference],
            ["isLessThan", (value, reference) => value < reference],
            ["isLessThanOrEqual", (value, reference) => value <= reference],
            ["haveChanceToOccur", reference => Math.random() < reference],
            ["mockTest", () => Math.random()]
        ])
    }

    process(options) {
        const { subject, fn, params } = options
        if (!params) return false

        let { attribute, reference, value } = params
        
        if (!this.comparisions.has(fn)) return false

        if (subject) {
            const target = this.evaluator.evaluateTarget(subject)

            if(!target) return false

            value = this.evaluator.evaluateAttribute(target, attribute)
        }

        if (value) return this.comparisions.get(fn)(value, reference)
        
        return this.comparisions.get(fn)(reference)
    }

    processMany(optionsList) {
        if (!optionsList) return false
        return optionsList.every( options => this.process(options))
    }

}

module.exports = ConditionalInterpreter