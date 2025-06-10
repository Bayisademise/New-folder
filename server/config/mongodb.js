import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database connected"));
    mongoose.connection.on("error", (err) => console.error("Database error:", err));
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;