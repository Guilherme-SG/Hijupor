const mongoose = require('../database')

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    attack: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    skillList: {
        type: Array
    },
    passiveList: {
        type: Array
    }
})


module.exports = mongoose.model('Classes', ClassSchema)