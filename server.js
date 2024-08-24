require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth')
const materialRoutes = require('./routes/materials')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/auth', authRoutes)
app.use('/api/materials', materialRoutes)

connectDB()

const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.status(200).json({message: 'Course Material Exchange API is running.'})
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

