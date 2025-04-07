import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig"
import { validate } from "@/lib/validate";
import { eventSchema } from "@/lib/validators/eventSchema";
import User from "@/models/userModel";
 
import Event from "@/models/event.model.js"
 

connectDB();



export async function POST(req){

    try {
         
        const validData = validate(eventSchema, await req.json())
        console.log("data : ", validData); 

        const {event,speakers,agenda} = validData;
        const userId = event.createdBy;
         
      

          // Check if the user has already created 3 events
        const user = await User.findById(userId);
        if (!user) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
        }

          // If the user already has 3 events, return an error
        if (user.createdEvents.length >= 3) {
            return NextResponse.json(
            { message: "You cannot create more than 3 events" },
            { status: 400 }
            );
        }

         
        const newEvent = new Event({
            ...event,
            speakers,
            agenda
        })

        const saveEvent = await newEvent.save();
        console.log("save envet response:",saveEvent)

         // Add the new event ID to the user's createEvents array
        await User.findByIdAndUpdate(
            userId,
            { $push: { createdEvents: saveEvent._id } },
            { new: true }
        );


        return NextResponse.json(
            { message: "Event created successfully" , event: saveEvent },
            { status: 201 }
        )



    } catch (error) {
        console.log("Error creating event:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
          );
    }

    
}