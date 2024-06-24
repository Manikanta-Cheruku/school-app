const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const PORT = 3500;
const app = express()
const cors = require("cors")

const userRoute = require("./routes/user")


app.use(express.json())
app.use(cors())

dotenv.config()


async function dbConnect(){

    try{
     await mongoose.connect(process.env.MONGOOSE_URI)
     console.log("Db Connected Successfully!!!")

    }
    catch(err)
    {
        console.log(`db Connection error ${err.message}`)
    }

}

dbConnect()

app.get('/',(req,res) => {
    res.send("<h1>Hello let's start building the application</h1>")
})

app.use('/user', userRoute)





app.listen(PORT,() => {
    console.log(`Server started listening at ${PORT}`)
})