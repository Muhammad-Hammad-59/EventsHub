import mongoose from "mongoose";
 

const UserSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        
    },
    createdEvents: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Event",
        default: []
    }]
} )

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;