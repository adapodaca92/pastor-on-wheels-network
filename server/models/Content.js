const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    text: String,
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    },
    // recording: String,
});

module.exports = mongoose.model('Content', ContentSchema);