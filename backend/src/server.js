const app = require("./app")
const socketio = require("socket.io")

const ActorBuilderService = require("./services/ActorBuilderService")
const Actor = require("./classes/actor/Actor")
const Stats = require("./classes/actor/Stats")

const sockets = socketio(app)


sockets.on("connection", socket => {
    console.log(`>> Logged ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`>> Player ${socket.id} disconnected`)
    });

    socket.on("create-char", (data) => {
        console.log(socket.id, data)

        const actor = new Actor({
            ...data,
            job: data.class,
            stats: new Stats(data.stats)
        })

        console.log(actor)
    })
})

sockets.on("create-char", (socket, data) => {
    console.log(socket.id, data)
})

app.listen(3333, () => {
    console.log("Connected on port 3333")
})