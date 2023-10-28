const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    description: String,
    img: {
        data: Buffer,
        contentType: String,
    },
});

module.exports = mongoose.model('Image', ImageSchema);