const { SkillTag } = require("./SkillTag");
class ControllerTag extends SkillTag {
    constructor() {
        super();
    }
    // Permitem que o alvo seja comandado por alguém
    active(caster, skil) {
    }
}
exports.ControllerTag = ControllerTag;
