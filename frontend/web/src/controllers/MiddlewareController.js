const axios = require("axios")

const api = axios.create({
    baseURL: "http://localhost:3333"
})

class MiddlewareController {
    async storeActor(req, res) {
        const data  = req.body
        const response = await api.post("actor", data)
        return res.send(response.data)
    }
} 

module.exports = new MiddlewareController()