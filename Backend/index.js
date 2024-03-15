const config = require('./config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbname}`
const app = express()
const cookieParser = require("cookie-parser")


mongoose
    .connect(mongoUrl, {})
    .then(() => {
        console.log('MongoDB jest połączone')
    })
    .catch((err) => {
        throw err
    })


app.use(express.json())
app.use(cors())
app.use(cookieParser())

/* API Routes */
const userRoutes = require('./app/routes/UserRoutes')
app.use("/users", userRoutes);

const customerRoutes = require('./app/routes/CustomerRoutes')()
app.use('/', customerRoutes);

const actionRoutes = require('./app/routes/CustomerActionsRoutes')
app.use('/', actionRoutes);

app.listen(config.app.port, () => {
    console.log(`Serwer Node.js chodzi na ${config.db.host}:${config.db.port}/${config.db.dbname}`);
}); 