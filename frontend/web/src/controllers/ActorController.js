const path = require('path');

const rootPath = path.dirname(require.main.filename)
let htmlBaseUrl = path.join(rootPath + '/public/')

const getHTMLUrl = filename => path.join(htmlBaseUrl + filename)

class ActorController {
    index(req, res) {
        res.sendFile(getHTMLUrl("index.html"))
    }

    battle(req, res) {
        res.sendFile(getHTMLUrl("battle.html"))
    }
}

module.exports = new ActorController()