const express = require("express")
const http = require('http')
const path = require('path')

class AppController {
    constructor() {
        this.express = express()

        this.middlewares()
        this.routes()
        
        this.express = http.createServer(this.express)
    }

    middlewares() {
        this.express.use(express.json())
        this.express.use(express.static(path.join(__dirname, "/public")));
    }

    routes() {
        this.express.use(require("./routes"))
    }
}

module.exports = new AppController().express