class Singleton {
    constructor() {
        return this.getInstance()
    }

    getInstance() {
        if(!Singleton.instance) {
            Singleton.instance = this
        }

        return Singleton.instance
    }
}

module.exports = Singleton