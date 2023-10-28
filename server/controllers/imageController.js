const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage }).single('img');

// Handle the GET request for the image
router.get('/image', (req, res) => {
    Image.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.render('contentPage', { items: data });
    });
});

// Handle the POST request for image upload
router.put('/upload', async (req, res, next) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'An error occurred while uploading the image' });
            }
            
            // Now, req.file should be defined and contain the uploaded file information.
            // Continue with your image creation logic.
            const obj = {
                description: req.body.description,
                img: {
                    data: fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)),
                    contentType: req.file.mimetype,
                }
            };
        
            await Image.create(obj);

            res.status(200).json({ message: 'Image uploaded successfully.' });
          });
        
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occured while uploading the image.' });
    }

});

// Handle the PUT request for updating an image by ID
router.put('/update/:id', async (req, res) => {
    try {
        const imageId = req.params.id;
        const { description, img } = req.body;

        const updatedData = {
            description,
            img,
        };

        const updatedImage = await Image.findByIdAndUpdate(imageId, updatedData, { new: true });

        if (!updatedImage) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.status(200).json({ message: 'Image updated successfully', updatedImage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the image.' });
    }
});

module.exports = router;