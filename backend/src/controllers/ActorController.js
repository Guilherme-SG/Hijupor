class ActorController {
    async store(req, res) {
        const { name } = req.body
        return res.json({ name })
    }

    async findByName(req, res) {
        const { name } = request.params
        return response.json({ name })
    }

    async findById(req, res) {
        const { id } = request.params
        return response.json({ id })
    }
}

module.exports = new ActorController()