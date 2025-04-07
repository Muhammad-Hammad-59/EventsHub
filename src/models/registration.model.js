import mongoose from "mongoose";
import { stringify } from "postcss";

const registrationSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    eventid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event"
    },
    name: {
        type: string,
        required: true,
    },
    email: {
        type: string,
        required: true,
    },
    phone: {
        type: string,
        required: true,
    },
    paymentDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentRecord"
    }
})

const Registration = mongoose.model("Registration" , registrationSchema)

module.exports = Registration



// import mongoose from "mongoose";

// const EventSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     type: { type: String, required: true },
//     details: { type: String, required: true },
//     registrationFee: { type: Number, default: 0 }, // 0 means no registration fee
//     paymentDetails: {
//         type: {
//             transactionId: { type: String, required: true },
//             paymentMethod: { type: String, required: true },
//             amount: { type: Number, required: true },
//         },
//         required: function () {
//             // paymentDetails is required only if registrationFee > 0
//             return this.registrationFee > 0;
//         },
//     },
//     registrationStatus: {
//         type: String,
//         enum: ["pending", "complete"],
//         default: "pending",
//     },
// }, { timestamps: true });

// // Middleware to set registrationStatus to "complete" if there is no registration fee
// EventSchema.pre("save", function (next) {
//     if (this.registrationFee === 0) {
//         this.registrationStatus = "complete";
//     }
//     next();
// });

// const Event = mongoose.model("Event", EventSchema);

// export default Event;