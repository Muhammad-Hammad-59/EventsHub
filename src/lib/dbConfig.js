// import mongoose from "mongoose";


// const MONGODB_URI= process.env.MONGODB_URI

// if(!MONGODB_URI){
//   throw new Error("⚠️ MONGODB_URI is missing in .env.local");
// }


// export const connectDB = async ()=>{
//   try {
//     console.log(mongoose.connection)
//     if (mongoose.connection.readyState >= 1) {
//       console.log("✅ MongoDB already connected");
//       return;
//     }

//     await mongoose.connect(MONGODB_URI , {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("✅ MongoDB connected successfully");



//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     throw new Error("Failed to connect to MongoDB");
//   }
// }


import mongoose from 'mongoose';

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}