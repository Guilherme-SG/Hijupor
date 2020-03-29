class Stats {
    constructor() {
        this.for = 100
        this.dex = 100
        this.aim = 100
        this.int = 100
        this.wis = 100
        this.mr = 100
        this.res = 100
        this.car = 100
        this.faith = 100
    }

    modifyStatByFixedValue(statName, value) {
        if (this[statName] == undefined) this[statName] = 0

        this[statName] += value
    }
}

module.exports = Stats