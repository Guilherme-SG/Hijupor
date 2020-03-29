class Stats {
    constructor() {
        this.for = 0
        this.dex = 0
        this.aim = 0
        this.int = 0
        this.wis = 0
        this.mr = 0
        this.res = 0
        this.car = 100
        this.faith = 100
    }

    modifyStatByFixedValue(statName, value) {
        if (this[statName] == undefined) this[statName] = 0

        this[statName] += value
    }
}

module.exports = Stats