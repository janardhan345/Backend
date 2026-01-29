import dotenv from "dotenv"
import connectDB from "./config/database.js"
import app from "./app.js"

dotenv.config()

const startServer = async ()=>{
    try{
        await connectDB()

        app.on("error", (error) => {
            console.log("Error", error);
            throw error;
        });

        app.listen(process.env.PORT || 5000, ()=>{
            console.log(`Server is running currently on Port: 
                ${process.env.PORT}`);
        });
    } catch(error){
        console.log("MongoDB connection Failed!", error);
    }
} 

startServer();