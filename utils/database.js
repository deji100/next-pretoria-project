import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    // CHECK IF DB IS CONNECTED
    if (isConnected) {
        console.log("mongodb is connected");
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "promptopia",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true

        console.log('mongodb is connected.');
    }catch (err) {
        console.log(err)
    }
}