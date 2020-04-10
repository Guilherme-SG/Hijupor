class BaseAttribute {
    constructor(value = 0, multiplier = 0) {
        this.baseValue = value
        this.baseMultiplier = multiplier
    }

    getBaseValue() {
        return this.baseValue
    }

    getBaseMultiplier() {
        return this.baseMultiplier
    }
}

module.exports = BaseAttribute