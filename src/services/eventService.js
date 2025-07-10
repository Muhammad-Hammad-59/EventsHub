import mongoose from "mongoose";
import Event from "@/models/event.model.js";
import User from "@/models/userModel";
import { AuthorizationError, NotFoundError, ValidationError } from "@/lib/customErrors";
 


// export async function createEvent(validData) {
//     const { event, Speakers, agenda } = validData;
//     const userId = event.createdBy;
//     console.log("validate data:",validData)

//     console.log("event and speaker data",event, " and speaker" , Speakers)
//     // Check if userId is valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       throw new ValidationError("Invalid user ID format");
//     }
    
//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       throw new NotFoundError("User not found");
//     }
    
//     // // Check event limit
//     // if (user.createdEvents.length >= 3) {
//     //   throw new ValidationError("You cannot create more than 3 events");
//     // }
    
//     // Create new event
//     const newEvent = new Event({
//       ...event,
//       agenda,
//       Speakers
//     });
    
//     const savedEvent = await newEvent.save();
    
//     // Add event to user's created events
//     await User.findByIdAndUpdate(
//       userId,
//       { $push: { createdEvents: savedEvent._id } },
//       { new: true }
//     );
    
//     return { event: savedEvent };
//   }


export async function createEvent(validData) {
  const event  = validData;
 
  console.log("event data in created event function",event)

  const userId = event.createdBy;
 
 

  // 1. Check if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ValidationError("Invalid user ID format");
  }
  
  // 2. Find user
  const user = await User.findById(userId);
  if (!user) {
      throw new NotFoundError("User not found");
  }
  
  // (optional) Event limit checking
  
  // 3. Create Event
  const newEvent = new Event({
      ...event,  // event already includes speakers and agenda
  });
 console.log(" new event object data:",newEvent)
  const savedEvent = await newEvent.save();
console.log
  // 4. Add event to user's createdEvents array
  await User.findByIdAndUpdate(
      userId,
      { $push: { createdEvents: savedEvent._id } },
      { new: true }
  );

  // 5. Return the saved event
  return { event: savedEvent };
}


//   ======== Update an event =======

export async function updateEvent(eventId, updateData) {
    const { event: updatedEventData, Speakers, agenda, userId } = updateData;
    
    // Find the event
    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      throw new NotFoundError("Event not found");
    }
    
    // Check if user is authorized to update
    if (existingEvent.createdBy.toString() !== userId) {
      throw new AuthorizationError("You are not authorized to update this event");
    }
    


    const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
            ...updatedEventData,
            Speakers,
            agenda
        },
        { new: true }
    );

    return updatedEvent;
  }



//   ===== Get events with optional filtering and pagination ====

  export async function getEvents(params) {
    const { page, limit, type, createdBy,search,category } = params;
    const skip = (page - 1) * limit;
    
    // Build filter object dynamically
    const filter = {};
    if (type) filter.type = type;
    if (createdBy) {
      if (!mongoose.Types.ObjectId.isValid(createdBy)) {
        throw new Val("Invalid creator ID format");
      }
      filter.createdBy = createdBy;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    
    if (category) query.category = category;

    // Get events with pagination
    const events = await Event.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "username email");
    
    const total = await Event.countDocuments(filter);
    
    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      events,
    };
  }
  

//  ====== Get a single event by ID =====

  export async function getSingleEvent(eventId) {
    const event = await Event.findById(eventId)
      .populate("createdBy", "username email")
      .populate("agenda.speaker", "name title image socialMedia");
      
    if (!event) {
      throw new NotFoundError("Event not found");
    }
    
    return event;
  }



//    ======= Delete an event ======

  export async function deleteEvent(eventId, userId) {
    // Find the event
    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      throw new NotFoundError("Event not found");
    }
    
    // Check if user is authorized to delete
    if (existingEvent.createdBy.toString() !== userId) {
      throw new AuthorizationError("You are not authorized to delete this event");
    }
    
    // Delete the event
    await Event.findByIdAndDelete(eventId);
    
    // Remove event ID from user's createdEvents array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { createdEvents: eventId } }
    );
    
    return true;
  }