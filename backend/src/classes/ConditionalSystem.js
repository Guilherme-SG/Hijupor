class ConditionalSystem {
    constructor(evaluator) {
        this.evaluator = evaluator
    }

    isEqual = (value, reference) => value == reference
    isNotEqual = (value, reference) => value != reference
    isGreaterThan = (value, reference) => value > reference
    isGreaterThanOrEqual = (value, reference) => value >= reference
    isLessThan = (value, reference) => value < reference
    isLessThanOrEqual = (value, reference) => value <= reference

    minValueInArray = array => Math.min(...array)
    maxValueInArray = array => Math.max(...array)

    trigger(triggerList) {
        if(!triggerList) return true

        return triggerList.every(trigger => {
            const { subject, fn, params } = trigger
            const { attribute, reference } = params

            const target = this.evaluator.evaluateTarget(subject)
            const value = this.evaluator.evaluateAttribute(target, attribute)

            return this[fn](value, reference)
        })
    }

    filter(array, filterList) {
        return array.filter( item => {
            return filterList.every( filter => {
                const { fn, params } = filter
                const { attribute, reference } = params

                let value = this.evaluateAttribute(item, attribute)

                return this[fn](value, reference)
            })
            
        })
    }

    duration(durationOptions) {
        if(Number.isInteger(durationOptions)) return durationOptions

        const { whileTrue } = durationOptions
        return whileTrue.every( this.trigger )
    }
}

module.exports = ConditionalSystem