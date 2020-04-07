const CollectionManager = require("./CollectionManager")

class SkillManager extends CollectionManager {
    constructor() {        
        super()
    }

    getByName(name) {
        return Array.from(this.collection.values())
            .find(skill => skill.name == name)
    }
}


module.exports = SkillManager