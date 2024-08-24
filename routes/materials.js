const express = require('express')
const router = express.Router()
const Material = require('../models/material.model')
const auth = require('./auth')
const multer = require('multer')
const {storage} = require('../config/cloudinary')

// Set the file size limit to 50 MB (50 * 1024 * 1024 bytes)
const upload = multer({ 
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50 MB
})

router.post('/', auth, (req, res) => {
    upload.single('file')(req, res, function(err) {
        if(err instanceof multer.MulterError) {
            if(err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({message: 'File size exceeds the 50 MB limit.'})
            }

            return res.status(400).json({message: 'File upload error.'})
        } else if (err) {
            return res.status(500).send('Server error')
        }

        const { title, description, price, isFree, course } = req.body
        const fileUrl = req.file.path
        const fileSize = req.file.size // File size in bytes
        const fileFormat = req.file.originalname.split('.').pop()

        const newMaterial = new Material({
            title,
            description,
            fileUrl,
            fileSize,
            fileFormat,
            price,
            isFree,
            user: req.user.id,
        })
      
          newMaterial.save()
            .then(material => res.status(201).json(material))
            .catch(err => {
              res.status(500).send('Server error')
            })
    })
})


