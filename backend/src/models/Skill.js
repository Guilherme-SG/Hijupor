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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Skills', SkillSchema)