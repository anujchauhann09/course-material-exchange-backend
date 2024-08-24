const jwt = require('jsonwebtoken')

function generateToken(payload) {
    try {
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '5h'}, (err, token) => {
            if(err) throw err
    
            return token
        })
    } catch (error) {
        return error
    }
}

module.exports = generateToken