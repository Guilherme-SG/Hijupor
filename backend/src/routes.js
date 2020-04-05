const routes = require("express").Router()

const SkillController = require("./controllers/SkillController")
const ActorController = require("./controllers/ActorController")

routes.get("/skill/", SkillController.findByName)
routes.get("/skill/:id", SkillController.findById)

routes.get("/skill-use", SkillController.use)

routes.post("/skill", SkillController.store)

routes.get("/actor/", ActorController.findByName)
routes.post("/actor", ActorController.store)

module.exports = routes