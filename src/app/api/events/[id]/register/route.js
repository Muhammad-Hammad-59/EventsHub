import { connectDB } from "@/lib/dbConfig";
import { handleApiError } from "@/lib/errorHandlers";
import { verifyToken } from "@/lib/tokenvarifyHelpers";
import { validate } from "@/lib/validate";
import { registrationSchema } from "@/lib/validators/registration";
import { registerForEvent } from "@/services/registerforEvent";
import { NextResponse } from "next/server";



export async function POST(req, { params }){
    try {
    await connectDB();
    
    const decoded = await verifyToken(req);

    const data = {
        ...await req.json(),
        userid: decoded.id,
        eventid: params.id
      };

      console.log("data in register for event",data)
    
      
  
    const validDate = await  validate(registrationSchema,data)

    const saveRegistration = await  registerForEvent(validDate)

    return NextResponse.json(
        { message: "Register success", Registration: saveRegistration},
        { status: 200}
    )

   } catch (error) {
     
    return handleApiError(error, "Registration failed");
   }

}