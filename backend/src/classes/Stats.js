const Serializable = require("./Serializable")

class Stats extends Serializable {
    constructor({
        str = 0,
        dex = 0,
        aim = 0,
        int = 0,
        sab = 0,
        mr = 0,
        res = 0,
        car = 0,
        faith = 0,
        vit = 0
    }) {
        super()
        this.for = str
        this.dex = dex
        this.aim = aim
        this.int = int
        this.sab = sab
        this.mr = mr
        this.res = res
        this.car = car
        this.faith = faith
        this.vit = vit
    }

    modifyStatByFixedValue(statName, value) {
        if (this[statName] == undefined) this[statName] = 0

        this[statName] += value
    }

    serialize() {
        return {
            for: this.for,
            dex: this.dex,
            aim: this.aim,
            int: this.int,
            sab: this.sab,
            mr: this.mr,
            res: this.res,
            car: this.car,
            faith: this.faith,
            vit: this.vit
        }
    }
}

module.exports = Stats