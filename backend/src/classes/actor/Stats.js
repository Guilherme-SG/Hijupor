const Serializable = require("../Serializable")
const Attribute = require("./Attribute")

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
        vit = 0,
        agi = 0
    }) {
        super()
        this.str = new Attribute(str)
        this.dex = new Attribute(dex)
        this.aim = new Attribute(aim)
        this.int = new Attribute(int)
        this.sab = new Attribute(sab)
        this.mr = new Attribute(mr)
        this.res = new Attribute(res)
        this.car = new Attribute(car)
        this.faith = new Attribute(faith)
        this.vit = new Attribute(vit)
        this.agi = new Attribute(agi)
    }

    get(name) {
        //console.log(name, this[name])
        return this[name].getFinalValue()
    }

    update() {
        Object.values(this)
            .forEach( attr => attr.update() )
    }

    serialize() {
        return {
            str: this.str.getFinalValue(),
            dex: this.dex.getFinalValue(),
            aim: this.aim.getFinalValue(),
            int: this.int.getFinalValue(),
            sab: this.sab.getFinalValue(),
            mr: this.mr.getFinalValue(),
            res: this.res.getFinalValue(),
            car: this.car.getFinalValue(),
            faith: this.faith.getFinalValue(),
            vit: this.vit.getFinalValue()
        }
    }
}

module.exports = Stats