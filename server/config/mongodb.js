import mongoose from "mongoose";
//connect to the mongodb database
const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>console.log ('Database connected'))
    await mongoose.connect(`${process.env.MONGO_URI}/ New folder`)
  }
export default connectDB 