
import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    registrationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Registration", 
        required: true 
    },
    eventid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    userName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    }
 
});


const Ticket = mongoose.model("Ticket" , TicketSchema)

module.exports = Ticket 