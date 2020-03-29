const { createId } = require("../../util")

class Skill {
    constructor(name, tags = {}, id = createId()) {        
        this.name = name
        this.tags = tags
        this.id = id
    }
}

module.exports = Skill