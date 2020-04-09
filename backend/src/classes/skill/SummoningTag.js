const SkillTag = require("./SkillTag")

class SummoningTag extends SkillTag {
    constructor() {
        super();
    }
    // Evocam entidades para auxiliar o caster
    active(caster, skil) {
    }
}

module.exports = SummoningTag;
