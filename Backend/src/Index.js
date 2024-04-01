const DATABASE_CONNECTION = require('./Database/Connection')
const PORT = 5000
const app = require('./app')
const dotenv = require('dotenv')

dotenv.config({
    path:'./.env'
})

DATABASE_CONNECTION()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server connected on port :${PORT}`)
        })
    })
    .catch(() => {
        console.log('error while connecting to server')
    })
