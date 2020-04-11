const BaseAttribute = require("./BaseAttribute")

class RawBonus extends BaseAttribute {
    constructor(value, multiplier) {
        super(value, multiplier)
    }
}

module.exports = RawBonus