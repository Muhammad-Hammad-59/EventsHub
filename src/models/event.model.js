// import mongoose from "mongoose";

// const SpeakerSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     experience: { type: String, required: true },
//     img: { type: String, required: true },
//     socialMedia: { type: String, required: true },
//     expertise: { type: String, required: true },
// });

// const AgendaSchema = new mongoose.Schema({
//     speaker: { type: mongoose.Schema.Types.ObjectId, ref: "Speaker", required: true },
//     timeSlot: { type: String, required: true },
//     date: { type: Date, required: true },
//     duration: { type: String, required: true },
// });

// const EventSchema = new mongoose.Schema({
//     title: {
//          type: String, 
//          required: true 
//         },
//     createdBy: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "User", 
//         required: true 
//     },
//     type: { 
//         type: String, 
//         required: true 
//     },
//     speakers: [SpeakerSchema],
//     details: { 
//         type: String, 
//         required: true 
//     },
//     agenda: [AgendaSchema],
//     configuration: { 
//         type: String, 
//         required: true 
//     },
//     // registrations: [{ 
//     //     type: mongoose.Schema.Types.ObjectId, 
//     //     ref: "Registration" 
//     // }],
//     timeAndDate: { 
//         type: Date, 
//         required: true 
//     },
//     city: {
//         type: String,
//         required: true
//     },
//     location: { 
//         type: String, 
//         required: true 
//     },
//     online: { 
//         type: Boolean, 
//         required: true 
//     },
//     coverimage: { 
//         type: String, 
//         required: true
//     },
//     organizerProfile: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'User'
//     }],
//     contact: { 
//         type: String, 
//         required: true 
//     },
// }, { timestamps: true });


// // const Event = mongoose.model("Event" , EventSchema)

// // module.exports = Event

// const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
// export default Event;



import mongoose from 'mongoose';

const SocialMediaSchema = new mongoose.Schema({
  linkedin: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  personalWebsite: { type: String }
}, { _id: false });

const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileImage: { type: String, required: true },
  bio: { type: String },
  expertise: { type: String, required: true },
  socialMedia: SocialMediaSchema
});

const AgendaSchema = new mongoose.Schema({
  sessionName: { type: String, required: true },
  speaker: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Speaker' },
  date: { type: Date, required: true },
  starttime: { type: String, required: true },
  endtime: { type: String, required: true },
  sessiondetail: { type: String },
  duration: { type: String, required: true }
});

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  details: { type: String, required: true },
  configuration: { type: String, required: true },
  timeAndDate: { type: Date, required: true },
  location: { type: String, required: true },
  eventformate: { type: String, required: true },
  venuName: { type: String, required: true },
  venuAddress: { type: String, required: true },
  coverimage: { type: String, required: false},
  organizerProfile: { type: String, required: true },
  contact: { type: String, required: true },
  RegistrationDeadline: { type: Date, required: true },
  agenda: [AgendaSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  Speakers: [SpeakerSchema]
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;
