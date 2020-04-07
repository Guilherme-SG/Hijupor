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

    delete(id) {
        this.collection.delete(id)
    }

    has(id) {
        return this.collection.has(id)
    }

    size() {
        return this.collection.size
    }
}

module.exports = CollectionManager