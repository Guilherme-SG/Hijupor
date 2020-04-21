const app = require("./app")
const socketio = require("socket.io")

const sockets = socketio(app)


sockets.on("connection", socket => {
    console.log(`>> Logged ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`>> Player ${socket.id} disconnected`)
      });
})

app.listen(3000, () => {
    console.log("Connected on port 3000")
})