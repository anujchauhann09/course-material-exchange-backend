const bcrypt = require('bcrypt')

async function cryptPassword(password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

async function comparePassword(password, userPassword) {
    return await bcrypt.compare(password, userPassword)
}

module.exports = {cryptPassword, comparePassword}