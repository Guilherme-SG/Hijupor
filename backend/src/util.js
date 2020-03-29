function createId() {
    return Math.round(new Date().getTime() + Math.random() * 10000000000).toString(36).substr(2)
}

module.exports = { createId }