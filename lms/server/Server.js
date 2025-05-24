import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongobd.js'
import { clerkWebhooks } from './controllers/webhooks.js'
//initailize express
const app = express()
//connect to database
await connectDB()
//middleware
app.use(cors())
//Routes
app.get('/',(req,res)=>res.send("Api Working"))
app.post('/clerk', express.json(),clerkWebhooks)
//port
const PORT = process.env.PORT || 500
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})