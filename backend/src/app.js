require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

const express = require("express")
const http = require('http')
const cors = require("cors")

class AppController {
    constructor() {
        this.express = express()

        this.middlewares()
        this.routes()

        this.express = http.createServer(this.express)
    }

    middlewares() {
        this.express.use(cors({
            origin: "*"
        }))
        this.express.use(express.json())
    }

    routes() {
        this.express.use(require("./routes"))
    }
}

module.exports = new AppController().express