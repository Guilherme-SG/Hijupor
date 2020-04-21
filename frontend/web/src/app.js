const express = require("express")
const http = require('http')

class AppController {
    constructor() {
        this.express = express()

        this.middlewares()
        this.routes()
        //this.static()
        
        this.express = http.createServer(this.express)
    }
    

    static() {
        this.express.use('/static', this.express.static('public'))
    }

    middlewares() {
        this.express.use(express.json())
    }

    routes() {
        this.express.use(require("./routes"))
    }
}

module.exports = new AppController().express