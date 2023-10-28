const Content = require('../models/Content');
const Admin = require('../models/Admin');

module.exports = {
    createContent: async (req, res) => {
        try {
            const { text, imageId } = req.body;
            const content = new Content({ text });

            if (imageId) {
                const image = await Image.findById(imageId);
                if (!image) {
                    return res.status(404).json({ message: 'Image not found.' });
                }
                content.image = image;
            }
            await content.save();
            res.status(201).json(content);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    getContent: async (req, res) => {
        try {
            const content = await Content.findById(req.params.id).populate('image');
            res.json(content);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
}