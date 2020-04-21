const path = require('path');

const rootPath = path.dirname(require.main.filename)
let htmlBaseUrl = path.join(rootPath + '/public/')
let cssBaseUrl = path.join(rootPath + '/public/')

const getHTMLUrl = filename => path.join(htmlBaseUrl + filename)
const getCSSLUrl = filename => path.join(cssBaseUrl + filename)

class ActorController {
    index(req, res) {
        res.sendFile(getHTMLUrl("index.html"))
    }

    style(req, res) {
        res.sendFile(getCSSLUrl("style.css"))
    }
}

module.exports = new ActorController()