const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const dotenv = require("dotenv").config()
const {initializePassport} = require('./passportConfig')
initializePassport(passport)
// Importing Routes
const hcRoutes = require('./routes/hcRoutes')
const hcUploadRoutes = require('./routes/hcUploadRoutes')
// Connection to MongoDB Atlas
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@hamro-paper.w2ufwiu.mongodb.net/${process.env.MONGODB_ATLAS_COLLECTION}`
// Connection to Database
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Serving on port ${process.env.PORT} `)
        })

        console.log("Connected to MongoDB Atlas open")
    })
    .catch((err) => {
        console.log("error found")
        console.log(err)
    })

// Configuration for express
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.session())
app.get('/',(req,res)=> {
    res.redirect('/faculty')
})

// Hamro Course Faculty Routes
app.use('/faculty', hcRoutes)
// Hamro Course Upload Routes
app.use('/upload', hcUploadRoutes)
app.get('/about',(req,res)=> {
    res.render('about')
})
app.get('/notes',(req,res)=> {
    res.render('index')
})
