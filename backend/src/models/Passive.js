const mongoose = require('../database')

const PassiveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    conditions: {
        type: mongoose.Schema.Types.Mixed
    },
    actions: {
        type: Array
    },
    onBattleBegin: {
        type: mongoose.Schema.Types.Mixed
    },
    onTurnBegin: {
        type: mongoose.Schema.Types.Mixed
    }
})


module.exports = mongoose.model('Passives', PassiveSchema)