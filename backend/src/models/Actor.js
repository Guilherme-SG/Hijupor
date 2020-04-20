const mongoose = require('../database')

const ActorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    partyId: {
        type: Number,
        required: true,
        default: -1
    },
    age: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: true
    },
    personality: {
        type: String,
        required: false
    },
    job: {
        type: String,
        required: true
    },
    health: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    stamina: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    actionPoint: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    skills: {
        type: Array,
        required: false
    },
    stats: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    status: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    backstory: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toObject: {
        transform: (doc, ret, opt) => {
            ret.id = ret._id
            delete ret._id    
            delete ret._v
            return ret
        }
    }
})



module.exports = mongoose.model('Actors', ActorSchema)