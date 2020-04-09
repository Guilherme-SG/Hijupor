const SkillTag = require("./SkillTag")

class DeffensiveTag extends SkillTag {
    constructor() {
        super();
    }
    // Previnem, diminuem, reflerem ou anulam ataques/magias
    active(caster, skil) {
    }
}

module.exports = DeffensiveTag;
