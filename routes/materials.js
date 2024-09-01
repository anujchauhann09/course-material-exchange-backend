const express = require('express')
const router = express.Router()
const Material = require('../models/material.model')
const auth = require('../middleware/auth')
const multer = require('multer')
const {storage} = require('../config/cloudinary')
const User = require('../models/user.model')

// Set the file size limit to 50 MB (50 * 1024 * 1024 bytes)
const upload = multer({ 
    storage,
    // limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50 MB
})

router.post('/material', auth, upload.single('file'), async (req, res) => {
    const user = await User.findById(req.user.id)
  
    if (req.file.size > 50 * 1024 * 1024 && user.subscription === 'free') {
      return res.status(400).json({ msg: 'File size exceeds the limit for free users. Please upgrade to premium.' })
    }

    let { title, description, course, price, isFree} = req.body
    const fileUrl = req.file.path
    const fileSize = req.file.size // File size in bytes
    const fileFormat = req.file.originalname.split('.').pop()

    if (!price) {
        price = suggestPrice({ title, pages })
    }

    const newMaterial = new Material({
        title,
        description,
        course,
        fileUrl,
        fileSize,
        fileFormat,
        price,
        isFree,
        user: req.user.id,
    })
      
      await newMaterial.save()
        .then(material => res.status(201).json(material))
        .catch(err => {
          res.status(500).send('Server error')
        })
})

router.get('/', async (req, res) => {
    try {
      const materials = await Material.find().populate('user', ['name', 'email'])
      return res.status(201).json(materials)
    } catch (err) {
      return res.status(500).send('Server error')
    }
})

router.get('/recommendations/:course', async (req, res) => {
    const { course } = req.params
    
    try {
      const recommendations = await getRecommendations(course)
      return res.status(201).json(recommendations)
    } catch (err) {
      return res.status(500).send('Server error')
    }
})

module.exports = router