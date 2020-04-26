const app = require("./app")
const socketio = require("socket.io")

const GameController = require("./controllers/GameController")

const sockets = socketio(app)


sockets.on("connection", async socket => {
    console.log(`>> Logged ${socket.id}`)

    socket.on("registerPlayer", async id => {
        socket.on('disconnect', () => {
            console.log(`>> Player ${socket.id} disconnected`)
            GameController.registerPlayer(id)
        })        
        
        GameController.registerPlayer(id)        

        sockets.emit("setup", GameController.setup)
    })

    socket.on("use-skill", data => {
        if(!data.target) {
            socket.emit("skill-used", "Alvo não selecionado")
        } else {
            const skills = ["Investida", "Míssil Mágico", "Harmonia", "Devoção"]
            const caster = actorManager.get(data.caster)
            const target = actorManager.get(data.target)
            sockets.emit("skill-used", `${caster.name} usou ${skills[data.skill]} em ${target.name}`)
        }
    })
})


app.listen(3333, () => {
    console.log("Connected on port 3333")
})