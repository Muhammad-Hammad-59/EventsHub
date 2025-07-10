 
import { validate } from '@/lib/validate';
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
  capacity:{ type: Number, default: null, min: 1 },
  isFree: { type: Boolean, default: true},
  price: { type: Number, default: 0, min: 0},
  registrationCount: { type: Number, default: 0, min: 0 },
  RegistrationDeadline: { type: Date, required: true },
  agenda: [AgendaSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  Speakers: [SpeakerSchema]
}, { timestamps: true });

const Speaker = mongoose.models.Speaker || mongoose.model("Speaker", SpeakerSchema);
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;



// new field for event 

// capacity: { 
//     type: Number, 
//     default: null, // null means unlimited capacity
//     min: 1,
//     validate: {
//       validator: Number.isInteger,
//       message: '{VALUE} is not an integer value'
//     }
//   },
//   isFree: { 
//     type: Boolean, 
//     default: true 
//   },
//   price: {
//     type: Number,
//     default: 0,
//     min: 0
//   },
//   registrationCount: {
//     type: Number,
//     default: 0,
//     min: 0
//   }