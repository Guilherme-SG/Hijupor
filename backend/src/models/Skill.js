const mongoose = require('../database')

const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    cooldown: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    paCost: {
        type: Number,
        required: true,
        default: 1
    },
    tags: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    }
})

module.exports = mongoose.model('Skills', SkillSchema)