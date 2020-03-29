const { SkillTag } = require("./SkillTag");
class DebuffTag extends SkillTag {
    constructor() {
        super();
    }
    // Podem melhorar os stats do alvo, e remover debuffs e status negativos
    active(caster, skil) {
    }
}
exports.DebuffTag = DebuffTag;
