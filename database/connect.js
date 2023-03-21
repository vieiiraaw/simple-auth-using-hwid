require('colors')
const mongoose = require('mongoose')
require('dotenv').config({
    path: "./.env"
})

try {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("[Successfully] ".green + `mongoose connected.`);
} catch {
    console.log("[Failed] ".red + `mongoose not connected.`);
}