const axios = require("axios")

const api = axios.create({
    baseURL: "http://localhost:3333"
})

class InternalRequestSerive {
    static async getActorById(id) {
        return {
            name: "Yendros",
            stats: {
                str: 60,
                dex: 60,
                aim: 0,
                res: 30,
                mr: 30,
                vit: 70,
                agi: 100,
                faith: 0,
                int: 100,
                sab: 0,
                car: 0
            },
            job: "Mage",
            race: "Pagrius",
            age: 28,
            local: "O Norte",
            personality: "Lawful Evil"
        }
        //await api.get(`actor/${id}`)
    }
}

module.exports = InternalRequestSerive