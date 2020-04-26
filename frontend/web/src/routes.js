const routes = require("express").Router()

const ActorController = require("./controllers/ActorController")
const MiddlewareController = require("./controllers/MiddlewareController")

routes.get("/", ActorController.index)
routes.get("/battle", ActorController.battle)
routes.post("/actor", MiddlewareController.storeActor)

module.exports = routes