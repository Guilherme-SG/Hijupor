class Observer {
    constructor() {
        this.observers = []
    }

    subscribe(fn) {
        this.observers.push(fn)
    }

    unsubscribe(fn) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

class BaseAttribute extends Observer {
    constructor(value = 0, multiplier = 0) {
        super()
        this.baseValue = value
        this.baseMultiplier = multiplier
    }

    getBaseValue() {
        return this.baseValue
    }

    getBaseMultiplier() {
        return this.baseMultiplier
    }
}

module.exports = BaseAttribute