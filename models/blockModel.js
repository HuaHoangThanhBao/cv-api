const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    blockId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
});

const Block = mongoose.model('Block', blockSchema);
module.exports = Block;