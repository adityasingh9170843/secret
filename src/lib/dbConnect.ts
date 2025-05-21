import mongoose from "mongoose";



type ConnectionObject = {
    isConnected?: number;
}

const connection : ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if(connection.isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
        
        connection.isConnected =db.connections[0].readyState
        console.log("MongoDB connected")
    }catch(err){
        console.error("MongoDB connection error:", err);    
        process.exit(1)
    }
}

export default dbConnect;