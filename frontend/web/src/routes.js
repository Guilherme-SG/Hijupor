const routes = require("express").Router()

const ActorController = require("./controllers/ActorController")

routes.get("/", ActorController.index)
routes.get("/style.css", ActorController.style)

module.exports = routes