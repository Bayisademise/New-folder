import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import { clerkWebhooks } from "./controller/webooks.js";
app.post('/clerk',express.json(),clerkWebhooks)
const app = express()
await connectDB()
app.use(cors())
app.get('/',(req,res)=>res.send("Api is working"))
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} `)
})