import mongoose from "mongoose";
import dotenv from "dotenv/config";

const { MONGODB_URI } = process.env;

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(
            MONGODB_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB successfully connected to: ${url}`); 
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}

export default conectarDB



