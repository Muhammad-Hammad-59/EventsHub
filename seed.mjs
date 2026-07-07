// seed.mjs — Run with: node seed.mjs
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

// Define schema inline to avoid ESM/path alias issues
const SocialMediaSchema = new mongoose.Schema({
  linkedin: String,
  twitter: String,
  instagram: String,
  personalWebsite: String,
}, { _id: false });

const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileImage: { type: String, required: true },
  bio: String,
  expertise: { type: String, required: true },
  socialMedia: SocialMediaSchema,
});

const AgendaSchema = new mongoose.Schema({
  sessionName: { type: String, required: true },
  speaker: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "Speaker" },
  date: { type: Date, required: true },
  starttime: { type: String, required: true },
  endtime: { type: String, required: true },
  sessiondetail: String,
  duration: { type: String, required: true },
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
  coverimage: { type: String, required: false },
  organizerProfile: { type: String, required: true },
  contact: { type: String, required: true },
  capacity: { type: Number, default: null, min: 1 },
  isFree: { type: Boolean, default: true },
  price: { type: Number, default: 0, min: 0 },
  registrationCount: { type: Number, default: 0, min: 0 },
  RegistrationDeadline: { type: Date, required: true },
  agenda: [AgendaSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  Speakers: [SpeakerSchema],
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

const dummyEvents = [
  {
    title: "AI & Machine Learning Summit 2026",
    type: "conference",
    details: "Join top researchers and industry leaders for a deep dive into artificial intelligence, machine learning, and the future of automation. Featuring hands-on workshops, panel discussions, and networking sessions with pioneers shaping the AI landscape.",
    configuration: "Multi-track keynote and workshop sessions",
    timeAndDate: new Date("2026-07-15T09:00:00Z"),
    location: "San Francisco, CA",
    eventformate: "hybrid",
    venuName: "Moscone Center",
    venuAddress: "747 Howard St, San Francisco, CA 94103, USA",
    coverimage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    organizerProfile: "TechForward Inc.",
    contact: "info@techforward.io",
    capacity: 500,
    isFree: false,
    price: 149,
    registrationCount: 0,
    RegistrationDeadline: new Date("2026-07-10T23:59:00Z"),
    agenda: [
      { sessionName: "Opening Keynote: The State of AI", date: new Date("2026-07-15"), starttime: "9:00 AM", endtime: "10:00 AM", sessiondetail: "Overview of current AI trends and breakthroughs", duration: "1 hour" },
      { sessionName: "Workshop: Building with LLMs", date: new Date("2026-07-15"), starttime: "10:30 AM", endtime: "12:00 PM", sessiondetail: "Hands-on session on integrating large language models", duration: "1.5 hours" },
    ],
    Speakers: [
      { name: "Dr. Sarah Chen", profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80", bio: "AI Research Lead at DeepMind", expertise: "Artificial Intelligence", socialMedia: { linkedin: "https://linkedin.com/in/sarahchen", twitter: "https://twitter.com/sarahchen_ai" } },
      { name: "James Rodriguez", profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", bio: "ML Engineer and author of 'Practical Deep Learning'", expertise: "Machine Learning", socialMedia: { linkedin: "https://linkedin.com/in/jamesrodriguezml" } },
    ],
  },
  {
    title: "Summer Music Festival 2026",
    type: "other",
    details: "Three days of incredible live music featuring top artists from around the world. From rock to electronic, jazz to hip-hop, experience the ultimate summer music celebration with food vendors, art installations, and camping.",
    configuration: "Multi-stage outdoor festival",
    timeAndDate: new Date("2026-08-20T16:00:00Z"),
    location: "Austin, TX",
    eventformate: "inperson",
    venuName: "Zilker Metropolitan Park",
    venuAddress: "2207 Lou Neff Rd, Austin, TX 78746, USA",
    coverimage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    organizerProfile: "SoundWave Events",
    contact: "hello@soundwaveevents.com",
    capacity: 5000,
    isFree: false,
    price: 89,
    registrationCount: 0,
    RegistrationDeadline: new Date("2026-08-15T23:59:00Z"),
    agenda: [
      { sessionName: "Gates Open & Welcome DJ Set", date: new Date("2026-08-20"), starttime: "4:00 PM", endtime: "5:00 PM", sessiondetail: "Opening performances and welcome", duration: "1 hour" },
      { sessionName: "Headliner Performance", date: new Date("2026-08-20"), starttime: "8:00 PM", endtime: "10:00 PM", sessiondetail: "Main stage headliner concert", duration: "2 hours" },
    ],
    Speakers: [
      { name: "DJ Echo", profileImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&q=80", bio: "International touring DJ and producer", expertise: "Electronic Music", socialMedia: { instagram: "https://instagram.com/djecho" } },
    ],
  },
  {
    title: "Startup Pitch & Networking Night",
    type: "meetup",
    details: "An evening of innovation and connection. Watch 10 startups pitch their ideas to a panel of investors, then network with founders, VCs, and tech professionals over cocktails and appetizers.",
    configuration: "Pitch competition + networking",
    timeAndDate: new Date("2026-06-25T18:00:00Z"),
    location: "New York, NY",
    eventformate: "inperson",
    venuName: "WeWork Hudson Yards",
    venuAddress: "500 West 33rd St, New York, NY 10001, USA",
    coverimage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    organizerProfile: "NYC Founders Hub",
    contact: "events@nycfoundershub.com",
    capacity: 150,
    isFree: true,
    price: 0,
    registrationCount: 0,
    RegistrationDeadline: new Date("2026-06-23T23:59:00Z"),
    agenda: [
      { sessionName: "Startup Pitches (Batch 1)", date: new Date("2026-06-25"), starttime: "6:00 PM", endtime: "7:00 PM", sessiondetail: "5 startups pitch to the investor panel", duration: "1 hour" },
      { sessionName: "Networking & Cocktails", date: new Date("2026-06-25"), starttime: "7:30 PM", endtime: "9:30 PM", sessiondetail: "Open networking with drinks and appetizers", duration: "2 hours" },
    ],
    Speakers: [
      { name: "Maria Lopez", profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80", bio: "Partner at Sequoia Capital", expertise: "Venture Capital", socialMedia: { linkedin: "https://linkedin.com/in/marialopezvc" } },
    ],
  },
  {
    title: "Full-Stack Web Development Bootcamp",
    type: "workshop",
    details: "An intensive 2-day workshop covering modern full-stack web development with React, Next.js, Node.js, and MongoDB. Perfect for developers looking to level up their skills with hands-on projects and expert guidance.",
    configuration: "Hands-on workshop with live coding",
    timeAndDate: new Date("2026-09-10T09:00:00Z"),
    location: "Chicago, IL",
    eventformate: "hybrid",
    venuName: "General Assembly Chicago",
    venuAddress: "444 N Wabash Ave, Chicago, IL 60611, USA",
    coverimage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    organizerProfile: "CodeMasters Academy",
    contact: "learn@codemasters.dev",
    capacity: 40,
    isFree: false,
    price: 249,
    registrationCount: 0,
    RegistrationDeadline: new Date("2026-09-05T23:59:00Z"),
    agenda: [
      { sessionName: "React & Next.js Fundamentals", date: new Date("2026-09-10"), starttime: "9:00 AM", endtime: "12:00 PM", sessiondetail: "Deep dive into React hooks, SSR, and App Router", duration: "3 hours" },
      { sessionName: "Backend with Node.js & MongoDB", date: new Date("2026-09-10"), starttime: "1:00 PM", endtime: "4:00 PM", sessiondetail: "Building REST APIs and database integration", duration: "3 hours" },
    ],
    Speakers: [
      { name: "Alex Turner", profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", bio: "Senior Engineer at Vercel", expertise: "Full-Stack Development", socialMedia: { twitter: "https://twitter.com/alexturnerdev" } },
    ],
  },
  {
    title: "City Marathon & Fitness Expo 2026",
    type: "other",
    details: "Lace up for the biggest marathon of the year! Featuring 5K, 10K, half marathon, and full marathon categories along with a fitness expo showcasing the latest in sports nutrition, gear, and wellness.",
    configuration: "Outdoor marathon + indoor expo",
    timeAndDate: new Date("2026-10-05T06:00:00Z"),
    location: "Los Angeles, CA",
    eventformate: "inperson",
    venuName: "Santa Monica Pier",
    venuAddress: "200 Santa Monica Pier, Santa Monica, CA 90401, USA",
    coverimage: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80",
    organizerProfile: "FitCity Events",
    contact: "run@fitcityevents.com",
    capacity: 3000,
    isFree: false,
    price: 45,
    registrationCount: 0,
    RegistrationDeadline: new Date("2026-09-30T23:59:00Z"),
    agenda: [
      { sessionName: "Marathon Start (Full & Half)", date: new Date("2026-10-05"), starttime: "6:00 AM", endtime: "6:30 AM", sessiondetail: "Staggered start for full and half marathon runners", duration: "30 min" },
      { sessionName: "Fitness Expo Opens", date: new Date("2026-10-05"), starttime: "8:00 AM", endtime: "4:00 PM", sessiondetail: "Browse 50+ vendor booths", duration: "8 hours" },
    ],
    Speakers: [
      { name: "Coach Mike Davis", profileImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80", bio: "Olympic marathon coach and fitness author", expertise: "Sports & Fitness", socialMedia: { instagram: "https://instagram.com/coachmike" } },
    ],
  },
  {
    title: "Gourmet Food & Wine Tasting Festival",
    type: "other",
    details: "Indulge in an unforgettable culinary experience featuring top chefs, artisan food vendors, sommelier-led wine tastings, and live cooking demonstrations. A celebration of food, culture, and community.",
    configuration: "Outdoor festival with tasting stations",
    timeAndDate: new Date("2026-07-30T11:00:00Z"),
    location: "Napa Valley, CA",
    eventformate: "inperson",
    venuName: "Robert Mondavi Winery",
    venuAddress: "7801 St Helena Hwy, Oakville, CA 94562, USA",
    coverimage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    organizerProfile: "Taste & Culture Co.",
    contact: "events@tasteculture.co",
    capacity: 800,
    isFree: false,
    price: 65,
    registrationCount: 0,
    RegistrationDeadline: new Date("2026-07-25T23:59:00Z"),
    agenda: [
      { sessionName: "Live Cooking Demo: Italian Fusion", date: new Date("2026-07-30"), starttime: "12:00 PM", endtime: "1:00 PM", sessiondetail: "Watch a Michelin-starred chef prepare signature dishes", duration: "1 hour" },
      { sessionName: "Wine Pairing Masterclass", date: new Date("2026-07-30"), starttime: "2:00 PM", endtime: "3:30 PM", sessiondetail: "Learn the art of pairing wines with food", duration: "1.5 hours" },
    ],
    Speakers: [
      { name: "Chef Isabella Moretti", profileImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&q=80", bio: "Michelin-starred chef and TV personality", expertise: "Culinary Arts", socialMedia: { instagram: "https://instagram.com/chefisabella" } },
    ],
  },
  {
    title: "Contemporary Art Exhibition Opening",
    type: "seminar",
    details: "Experience the opening night of a groundbreaking contemporary art exhibition featuring works by 20 emerging artists. Enjoy guided tours, artist talks, live music, and a champagne reception.",
    configuration: "Gallery exhibition + talks",
    timeAndDate: new Date("2026-08-12T17:00:00Z"),
    location: "Miami, FL",
    eventformate: "inperson",
    venuName: "Pérez Art Museum Miami",
    venuAddress: "1103 Biscayne Blvd, Miami, FL 33132, USA",
    coverimage: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80",
    organizerProfile: "ArtHouse Collective",
    contact: "gallery@arthousecollective.com",
    capacity: 200,
    isFree: true,
    price: 0,
    registrationCount: 0,
    RegistrationDeadline: new Date("2026-08-10T23:59:00Z"),
    agenda: [
      { sessionName: "Gallery Tour with Curator", date: new Date("2026-08-12"), starttime: "5:00 PM", endtime: "6:00 PM", sessiondetail: "Guided tour through the exhibition", duration: "1 hour" },
      { sessionName: "Artist Talk: The Future of Art", date: new Date("2026-08-12"), starttime: "6:30 PM", endtime: "7:30 PM", sessiondetail: "Panel discussion with featured artists", duration: "1 hour" },
    ],
    Speakers: [
      { name: "Elena Vasquez", profileImage: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&q=80", bio: "Contemporary artist and gallery curator", expertise: "Visual Arts", socialMedia: { instagram: "https://instagram.com/elenavasquezart" } },
    ],
  },
  {
    title: "Mindfulness & Wellness Retreat",
    type: "seminar",
    details: "A transformative weekend retreat focused on mindfulness, yoga, meditation, and holistic wellness. Disconnect from the digital world and reconnect with yourself through guided sessions and nature walks.",
    configuration: "Multi-session retreat",
    timeAndDate: new Date("2026-09-20T08:00:00Z"),
    location: "Sedona, AZ",
    eventformate: "inperson",
    venuName: "Enchantment Resort",
    venuAddress: "525 Boynton Canyon Rd, Sedona, AZ 86336, USA",
    coverimage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    organizerProfile: "Inner Peace Foundation",
    contact: "retreat@innerpeace.org",
    capacity: 50,
    isFree: false,
    price: 350,
    registrationCount: 0,
    RegistrationDeadline: new Date("2026-09-15T23:59:00Z"),
    agenda: [
      { sessionName: "Morning Yoga & Meditation", date: new Date("2026-09-20"), starttime: "8:00 AM", endtime: "9:30 AM", sessiondetail: "Start the day with gentle yoga and guided meditation", duration: "1.5 hours" },
      { sessionName: "Nature Walk & Mindfulness", date: new Date("2026-09-20"), starttime: "10:00 AM", endtime: "12:00 PM", sessiondetail: "Guided mindful walk through Boynton Canyon", duration: "2 hours" },
    ],
    Speakers: [
      { name: "Dr. Priya Patel", profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", bio: "Certified yoga therapist and wellness coach", expertise: "Mindfulness & Wellness", socialMedia: { personalWebsite: "https://drpriyapatel.com" } },
    ],
  },
  {
    title: "Cybersecurity Webinar: Protecting Your Business",
    type: "webinar",
    details: "Learn essential cybersecurity strategies for businesses of all sizes. Expert speakers will cover threat detection, incident response, data protection regulations, and building a security-first culture.",
    configuration: "Online webinar with Q&A",
    timeAndDate: new Date("2026-06-18T14:00:00Z"),
    location: "Online",
    eventformate: "virtual",
    venuName: "Zoom Webinar",
    venuAddress: "Virtual Event — Link sent upon registration",
    coverimage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    organizerProfile: "SecureNet Academy",
    contact: "learn@securenetacademy.com",
    capacity: 1000,
    isFree: true,
    price: 0,
    registrationCount: 0,
    RegistrationDeadline: new Date("2026-06-17T23:59:00Z"),
    agenda: [
      { sessionName: "Threat Landscape Overview", date: new Date("2026-06-18"), starttime: "2:00 PM", endtime: "2:45 PM", sessiondetail: "Understanding the current cybersecurity threat landscape", duration: "45 min" },
      { sessionName: "Live Q&A with Security Experts", date: new Date("2026-06-18"), starttime: "3:00 PM", endtime: "3:30 PM", sessiondetail: "Ask your cybersecurity questions to the panel", duration: "30 min" },
    ],
    Speakers: [
      { name: "Kevin Shaw", profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80", bio: "Former NSA analyst and cybersecurity consultant", expertise: "Cybersecurity", socialMedia: { linkedin: "https://linkedin.com/in/kevinshawsec" } },
    ],
  },
  {
    title: "Digital Marketing Masterclass 2026",
    type: "workshop",
    details: "Master the latest digital marketing strategies including SEO, social media marketing, paid advertising, content creation, and analytics. Ideal for marketers, business owners, and entrepreneurs looking to grow their online presence.",
    configuration: "Interactive workshop with case studies",
    timeAndDate: new Date("2026-08-05T10:00:00Z"),
    location: "Seattle, WA",
    eventformate: "hybrid",
    venuName: "The Collective Seattle",
    venuAddress: "400 Dexter Ave N, Seattle, WA 98109, USA",
    coverimage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    organizerProfile: "GrowthHackers Pro",
    contact: "hello@growthhackerspro.com",
    capacity: 80,
    isFree: false,
    price: 99,
    registrationCount: 0,
    RegistrationDeadline: new Date("2026-08-01T23:59:00Z"),
    agenda: [
      { sessionName: "SEO & Content Strategy", date: new Date("2026-08-05"), starttime: "10:00 AM", endtime: "11:30 AM", sessiondetail: "Building a sustainable organic growth engine", duration: "1.5 hours" },
      { sessionName: "Paid Ads That Convert", date: new Date("2026-08-05"), starttime: "12:00 PM", endtime: "1:30 PM", sessiondetail: "Google Ads & Meta Ads best practices for ROI", duration: "1.5 hours" },
    ],
    Speakers: [
      { name: "Rachel Kim", profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80", bio: "CMO at GrowthHackers Pro, ex-Google marketer", expertise: "Digital Marketing", socialMedia: { twitter: "https://twitter.com/rachelkimmarketing" } },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing events
    await Event.deleteMany({});
    console.log("🗑️  Cleared existing events");

    // Insert new events
    const result = await Event.insertMany(dummyEvents);
    console.log(`🌱 Seeded ${result.length} dummy events successfully!`);

    result.forEach((e) => {
      console.log(`   → ${e.title} (${e.type})`);
    });
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seed();
