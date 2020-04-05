const Skill = require("../classes/skill/Skill")
const SkillModel = require("../models/Skill")

class SkillController {
    async store(req, res) {
        const skill = await SkillModel.create(req.body)
        return res.json(skill)
    }

    async findByName(req, res) {
        const { name } = req.query

        const skill = await SkillModel.findOne({ name })
        return res.json(skill)
    }

    async findById(req, res) {
        const { id } = req.params
        
        const skill = await SkillModel.findById(id)
        return res.json(skill)
    }

    async use(req, res) {

    }
}

module.exports = new SkillController()