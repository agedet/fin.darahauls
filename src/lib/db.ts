import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is missing");
}

// Connection state tracking
let isConnected = false;
let connectionPromise: Promise<typeof mongoose> | null = null;

const connectDB = async (): Promise<typeof mongoose> => {
    // Return existing connection if already connected
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log("✅ MongoDB already connected");
        return mongoose;
    }

    // Return existing connection promise if connection is in progress
    if (connectionPromise) {
        console.log("🔄 MongoDB connection in progress, waiting...");
        return connectionPromise;
    }

    // Create new connection promise
    connectionPromise = mongoose.connect(MONGODB_URI, {
        maxPoolSize: 10, // Maximum number of connections in the pool
        serverSelectionTimeoutMS: 5000, // Timeout for server selection
        socketTimeoutMS: 45000, // Timeout for socket operations
        bufferCommands: false, // Disable mongoose buffering
    });

    try {
        const connection = await connectionPromise;
        isConnected = true;
        console.log("✅ MongoDB connected successfully");
        
        // Set up connection event listeners
        setupConnectionListeners();
        
        return connection;
    } catch (error) {
        isConnected = false;
        connectionPromise = null;
        
        // Handle specific MongoDB connection errors
        if (error instanceof Error) {
            if (error.name === 'MongoNetworkError') {
                console.error("❌ MongoDB Network Error:", error.message);
                throw new Error(`Database connection failed: Network error - ${error.message}`);
            } else if (error.name === 'MongoServerSelectionError') {
                console.error("❌ MongoDB Server Selection Error:", error.message);
                throw new Error(`Database connection failed: Server selection error - ${error.message}`);
            } else if (error.name === 'MongoParseError') {
                console.error("❌ MongoDB Parse Error:", error.message);
                throw new Error(`Database connection failed: Invalid connection string - ${error.message}`);
            } else if (error.name === 'MongoTimeoutError') {
                console.error("❌ MongoDB Timeout Error:", error.message);
                throw new Error(`Database connection failed: Connection timeout - ${error.message}`);
            } else {
                console.error("❌ MongoDB Connection Error:", error.message);
                throw new Error(`Database connection failed: ${error.message}`);
            }
        } else {
            console.error("❌ Unknown MongoDB connection error:", error);
            throw new Error("Database connection failed: Unknown error occurred");
        }
    }
};

const setupConnectionListeners = () => {
    const connection = mongoose.connection;

    // Connection events
    connection.on('connected', () => {
        console.log("✅ MongoDB connection established");
        isConnected = true;
    });

    connection.on('error', (error) => {
        console.error("❌ MongoDB connection error:", error);
        isConnected = false;
        connectionPromise = null;
    });

    connection.on('disconnected', () => {
        console.log("⚠️ MongoDB connection disconnected");
        isConnected = false;
        connectionPromise = null;
    });

    connection.on('reconnected', () => {
        console.log("🔄 MongoDB connection reestablished");
        isConnected = true;
    });

    connection.on('close', () => {
        console.log("🔒 MongoDB connection closed");
        isConnected = false;
        connectionPromise = null;
    });

    // Handle process termination
    process.on('SIGINT', async () => {
        await disconnectDB();
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        await disconnectDB();
        process.exit(0);
    });
};

const disconnectDB = async (): Promise<void> => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log("✅ MongoDB connection closed gracefully");
        }
        isConnected = false;
        connectionPromise = null;
    } catch (error) {
        console.error("❌ Error closing MongoDB connection:", error);
        throw new Error("Failed to close database connection");
    }
};

const getConnectionStatus = (): {
    isConnected: boolean;
    readyState: number;
    readyStateText: string;
} => {
    const readyStates = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };

    return {
        isConnected,
        readyState: mongoose.connection.readyState,
        readyStateText: readyStates[mongoose.connection.readyState as keyof typeof readyStates] || 'unknown'
    };
};

export { connectDB, disconnectDB, getConnectionStatus };
export default connectDB;