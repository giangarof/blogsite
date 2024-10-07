import mongoose from "mongoose";

const connectDB = async () => {
    // try {
    //     const conn = await mongoose.connect(process.env.DB_URI)
    //     console.log(`MongoDB connected: ${conn.connection.host}`)
    // } catch (error) {
    //     console.log(`Error: ${error.message}`)
    //     process.exit(1)
    // }
    mongoose.connect(process.env.DB_URI)
        .then(() => console.log('connected with mongodb'))
        .catch((error) => console.error(error))
    
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error:"))
    db.once('open', () => {
        console.log('Database connected')
    });
}

export default connectDB;