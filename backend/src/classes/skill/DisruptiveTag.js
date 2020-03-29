const { SkillTag } = require("./SkillTag");
class DisruptiveTag extends SkillTag {
    constructor() {
        super();
    }
    // Infligem status negativos ao alvo
    active(caster, skil) {
    }
}
exports.DisruptiveTag = DisruptiveTag;
