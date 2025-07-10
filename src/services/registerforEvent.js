 import { CustomError } from "@/lib/customErrors";
import Registration from "@/models/registration.model";

export const registerForEvent = async (registrationData) => {
  
    // Check for existing registration
    const existingRegistration = await Registration.findOne({
      userid: registrationData.userid,
      eventid: registrationData.eventid,
    });

    if (existingRegistration) {
      
      throw new CustomError("Already registered for this event",409)
    }

    // Create new registration
    const newRegistration = new Registration(registrationData);
    return await newRegistration.save();
    
   
};

export const getEventRegistrations = async (eventId) => {
  return await Registration.find({ eventid: eventId });
};