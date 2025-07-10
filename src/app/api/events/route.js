import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/dbConfig";
import { validate } from "@/lib/validate";
import { eventSchema } from "@/lib/validators/eventSchema";
import { eventUpdateSchema } from "@/lib/validators/eventUpdateSchema";
import { ObjectId } from 'mongodb';
import { verifyToken } from "@/lib/tokenvarifyHelpers";
import { handleApiError } from "@/lib/errorHandlers";
import { createEvent,
    deleteEvent,
    getEvents,
    getSingleEvent,
    updateEvent
 } from "@/services/eventService";

 
 import formidable from 'formidable';
 import { IncomingForm } from 'formidable';

 import cloudinary from '@/lib/cloudinary'; 
import { category } from "@/components/home/home";

 export const config = {
  api: {
    bodyParser: false, // Disallow default body parsing
  },
};

connectDB();

//    <======= create new event ======>

// export async function POST(req) {
//     try {
//       // Verify user authentication
//       const decoded = verifyToken();
//       if (!decoded) {
//         return NextResponse.json(
//           { message: "Authentication required" },
//           { status: 401 }
//         );
//       }

//       const userId = decoded.id;
//       console.log("userId", userId);

//       if (!userId) {
//         return new Response(JSON.stringify({ message: 'Invalid user session' }), {
//           status: 401,
//         });
//       }
  
//       // Validate request data
//       // const validData = validate(eventSchema, await req.json());
      
//       // console.log("validData", validData);
//       const data = await req.json();
//       console.log("data recive form frontend:",data)

//       // const eventData = {
//       //   ...data.event,
//       //   createdBy: userId // attach user ID to event
//       // };

//       const eventData = {
//         ...data,
//         event: {
//           ...data.event,
//           createdBy: userId
//         }
//       }

//       // Create the event
//       // const result = await createEvent(validData);
//       const result = await createEvent(eventData);   
//       console.log("result", result);

//       return NextResponse.json(
//         { message: "Event created successfully", event: result.event },
//         { status: 201 }
//       );
//     } catch (error) {
//       return handleApiError(error, "Error creating event");
//     }
//   }

// pages/api/events/index.js

 


// Optional: Cloudinary config (if you want to upload images)
 
export async function POST(req) {
 
  const form = new IncomingForm({
    multiples: true, // Handle multiple files
    uploadDir: './public/uploads', // Temporary upload directory for files
    keepExtensions: true, // Keep file extensions
  });

  
  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error("Form Parse Error:", err);
          reject(err); // Reject promise on error
        } else {
          resolve({ fields, files });
        }
      });
    });

    console.log("Fields:", fields);
    console.log("Files:", files);

    // ========= Your existing processing =========

    // Upload cover image
    let coverImageUrl = "";
    if (files.coverimage) {
      const coverUpload = await cloudinary.uploader.upload(files.coverimage.filepath, {
        folder: "eventhub/coverimages",
      });
      coverImageUrl = coverUpload.secure_url;
      console.log("Cover Image URL:", coverImageUrl);
    }

    // Handle speakers
    const speakers = [];
    const speakersCount = Object.keys(fields).filter((key) => key.startsWith("Speakers[")).length / 7;

    for (let i = 0; i < speakersCount; i++) {
      let profileImageUrl = "";

      if (files[`Speakers[${i}][profileImage]`]) {
        const speakerUpload = await cloudinary.uploader.upload(
          files[`Speakers[${i}][profileImage]`].filepath,
          { folder: "eventhub/speakers" }
        );
        profileImageUrl = speakerUpload.secure_url;
      }

      speakers.push({
        name: fields[`Speakers[${i}][name]`],
        bio: fields[`Speakers[${i}][bio]`],
        expertise: fields[`Speakers[${i}][expertise]`],
        socialMedia: {
          linkedin: fields[`Speakers[${i}][socialMedia][linkedin]`] || "",
          twitter: fields[`Speakers[${i}][socialMedia][twitter]`] || "",
          facebook: fields[`Speakers[${i}][socialMedia][facebook]`] || "",
        },
        profileImage: profileImageUrl,
      });
    }

    // Handle agenda
    const agenda = [];
    const agendaCount = Object.keys(fields).filter((key) => key.startsWith("agenda[")).length / 6;

    for (let i = 0; i < agendaCount; i++) {
      agenda.push({
        sessionName: fields[`agenda[${i}][sessionName]`],
        date: fields[`agenda[${i}][date]`],
        starttime: fields[`agenda[${i}][starttime]`],
        endtime: fields[`agenda[${i}][endtime]`],
        duration: fields[`agenda[${i}][duration]`],
        sessiondetail: fields[`agenda[${i}][sessiondetail]`],
      });
    }

    const event = {
      email: fields.email,
      title: fields.title,
      type: fields.type,
      details: fields.details,
      configuration: fields.configuration,
      timeAndDate: fields.timeAndDate,
      location: fields.location,
      eventformate: fields.eventformate,
      venuName: fields.venuName,
      venuAddress: fields.venuAddress,
      organizerProfile: fields.organizerProfile,
      contact: fields.contact,
      capacity: fields.capacity,
      RegistrationDeadline: fields.RegistrationDeadline,
      isFree: fields.isFree,
      price: fields.price,
      coverimage: coverImageUrl,
      speakers,
      agenda,
    };

    console.log("Final Event Data:", event);

    // ======== Save to DB if needed ========
    // await EventModel.create(event);

    return NextResponse.json({ message: "Event Created Successfully", event }, { status: 200 });
  } catch (error) {
    console.error("Error while handling event creation:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}




//    <======= get single and multiple event pagination ======>

  export async function GET(req) {
    try {
      const url = new URL(req.url);
      const eventId = url.searchParams.get("id");
      console.log(" event id ", eventId);
      // If an ID is provided, get a single event
      if (eventId) {
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
          return NextResponse.json(
            { message: "Invalid event ID format" },
            { status: 400 }
          );
        }
        
        const event = await getSingleEvent(eventId);
        return NextResponse.json({
          message: "Event fetched successfully",
          event
        });
      }
      
      // Otherwise, get filtered events
      const params = {
        page: parseInt(url.searchParams.get("page")) || 1,
        limit: parseInt(url.searchParams.get("limit")) || 10,
        type: url.searchParams.get("type"),
        createdBy: url.searchParams.get("createdBy"),
        search: url.searchParams.get("search"),
        category: url.searchParams.get("category")
      };
      
      const result = await getEvents(params);
      
      return NextResponse.json({
        message: "Events fetched successfully",
        ...result
      });
    } catch (error) {
      return handleApiError(error, "Error retrieving events");
    }
  }


//    ======= update event ======
 
  export async function PUT(req) {
      try {
        // Verify user authentication
        const decoded = verifyToken(req);
        if (!decoded) {
          return NextResponse.json(
            { message: "Authentication required" },
            { status: 401 }
          );
        }
        
        const url = new URL(req.url);
        const eventId = url.searchParams.get("id");
        
        if (!eventId || !mongoose.Types.ObjectId.isValid(eventId)) {
          return NextResponse.json(
            { message: "Valid event ID is required" },
            { status: 400 }
          );
        }
        
        // Validate update data
        const updateData = await req.json();
        const validData = validate(eventUpdateSchema, updateData);
        validData.userId = decoded.id;
        
        // Update the event
        const result = await updateEvent(eventId, validData);
        
        return NextResponse.json({
          message: "Event updated successfully",
          event: result
        });
      } catch (error) {
        return handleApiError(error, "Error updating event");
      }
    }


//    ======= delete event ======

    export async function DELETE(req) {
        try {
          // Verify user authentication
          const decoded = verifyToken(req);
          if (!decoded) {
            return NextResponse.json(
              { message: "Authentication required" },
              { status: 401 }
            );
          }
          
          const url = new URL(req.url);
          const eventId = url.searchParams.get("id");
          
          if (!eventId || !mongoose.Types.ObjectId.isValid(eventId)) {
            return NextResponse.json(
              { message: "Valid event ID is required" },
              { status: 400 }
            );
          }
          
          // Delete the event
          await deleteEvent(eventId, decoded.id);
          
          return NextResponse.json({
            message: "Event deleted successfully"
          });
        } catch (error) {
          return handleApiError(error, "Error deleting event");
        }
      }