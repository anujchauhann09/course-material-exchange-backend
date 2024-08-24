const cloudinary = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'course-materials', // The folder where files will be stored in Cloudinary
        allowed_formats: ['pdf', 'doc', 'docx', 'ppt', 'pptx'],
    },
})

module.exports = {cloudinary, storage}