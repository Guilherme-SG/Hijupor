const routes = require("express").Router()

const SkillController = require("./controllers/SkillController")
const ActorController = require("./controllers/ActorController")

routes.get("/", (req, res) => {
    return res.send("<h1>Bem-vindo ao Santander</h1>")
})
routes.get("/skill/", SkillController.findByName)
routes.get("/skill/:id", SkillController.findById)

routes.get("/skill-use", SkillController.use)

routes.post("/skill", SkillController.store)

routes.get("/actor/", ActorController.findByName)
routes.get("/actor/:id", ActorController.findById)
routes.post("/actor", ActorController.store)

module.exports = routes