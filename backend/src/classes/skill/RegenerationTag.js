const { SkillTag } = require("./SkillTag");
class RegenerationTag extends SkillTag {
    constructor() {
        super();
    }
    // Regeneram as forças do alvo ao longo do tempo
    active(caster, skil) {
    }
}
exports.RegenerationTag = RegenerationTag;
