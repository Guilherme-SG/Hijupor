const Attribute = require("./Attribute")

class DependantAttribute extends Attribute {
    constructor(startValue) {
        super(startValue)

        this.otherAttributes = []
    }

    addAttribute(attribute) {
        this.otherAttributes.push(attribute)
    }

    removeAttribute(attribute) {
        this.otherAttributes = this.otherAttributes
            .filter( attr => attr != attribute)
    }
}

module.exports = DependantAttribute