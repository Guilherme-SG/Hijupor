const Skill = require("../classes/skill/Skill")
const SkillModel = require("../models/Skill")

class SkillController {
    async store(req, res) {
        const skill = await SkillModel.create(req.body)
        return res.json(skill)
    }

    async findByName(req, res) {
        const { name } = request.params
        return response.json({ name })
    }

    async findById(req, res) {
        const { id } = request.params
        return response.json({ id })
    }

    async use(req, res) {

    }
}

module.exports = new SkillController()