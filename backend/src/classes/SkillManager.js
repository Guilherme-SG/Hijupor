class SkillManager {
    constructor() {        
        this.skills = {}
    }

    addSkill(skill) {
        this.skills[skill.id] = skill
    }

    removeSkill(id) {
        delete this.skills[id]
    }

    getSkillByName(name) {
        return Object.values(this.skills)
            .find(skill => skill.name == name)
    }

    getSkillById(id) {
        return this.skills[id]
    }
}


module.exports = SkillManager