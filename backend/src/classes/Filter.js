
class Filter {
    constructor(conditionalInterpreter) {
        this.conditionalInterpreter = conditionalInterpreter
    }

    process(array, filterList) {
        if (!filterList) return array

        // Mudar o algoritmo para filtrar a cada condicional
        return array.filter(item => {
            return filterList.every(filter => {
                const { fn, params } = filter

                return this.conditionalInterpreter.process({
                    fn,
                    params,
                    subject: {
                        type: "direct",
                        params: {
                            target: item
                        }
                    }
                })
            })

        })
    }

    duration(durationOptions) {
        if (Number.isInteger(durationOptions)) return durationOptions

        const { whileTrue } = durationOptions
        return this.conditionalInterpreter.processMany(whileTrue)
    }
}

module.exports = Filter