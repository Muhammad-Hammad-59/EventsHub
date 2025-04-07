import mongoose from "mongoose";


const paymentSchem = mongoose.Schema({
    registrationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Registration", 
        required: true 
    },
    amount: {
         type: Number, 
         required: true 
        },
    data: { 
        type: String,
        required: true 
    },
    method: { 
        type: String, 
        required: true 
    },
    transactionId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["Pending", "Completed", "Failed"], 
        required: true
    }
})


const PaymentRecord = mongoose.model("PaymentRecord" , paymentSchem)

module.exports = PaymentRecord