import mongoose from "mongoose";

const mongodbIndex = async () => {
    const connectionInstance = await mongoose.connect(process.env.MONGO_DB);

    try {
        console.log(`\n MongoDB Connected!. HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error!.", error);
        process.exit(1);
    }
}

export default mongodbIndex;