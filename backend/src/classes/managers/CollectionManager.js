class CollectionManager {
    constructor() {
        this.collection = new Map()
    }

    add(item) {
        this.collection.set(item.id, item)
    }

    get(id) {
        return this.collection.get(id)
    }

    getAll() {
        return Array.from(this.collection.values())
    }

    delete(id) {
        this.collection.delete(id)
    }

    deleteAll() {
        Array.from(this.collection.keys())
            .forEach( id => this.delete(id))
    }

    has(id) {
        return this.collection.has(id)
    }

    size() {
        return this.collection.size
    }
}

module.exports = CollectionManager