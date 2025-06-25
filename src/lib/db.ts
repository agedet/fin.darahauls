import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URL is missing");
}

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    };

    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.error("Error connecting to DB:", error);
        throw new Error("Failed to connect to DB");
    }
};

export default connectDB;