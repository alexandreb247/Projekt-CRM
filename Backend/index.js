const config = require('./config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbname}`
const app = express()

mongoose
    .connect(mongoUrl, {})
    .then(() => {
        console.log('MongoDB is connected')
    })
    .catch((err) => {
        throw err
    })


app.use(express.json())
app.use(cors())

app.listen(config.app.port, () => {
    console.log('Server Node.js is up and running');
}); 