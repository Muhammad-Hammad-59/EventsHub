import { NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/dbConfig";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request){

    try {
        const reqBody =await request.json();
        const {email,password} = reqBody


           // Get redirect URL from query params
        const { searchParams } = new URL(request.url);
        const redirect = searchParams.get("redirect") || "/"; // Default to home

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({message: "user not found", check: "checked"},{status: 400})
        }

    
        const validatepssword = await bcryptjs.compare(password,user.password)
        

        if(!validatepssword){
            return NextResponse.json(
                {
                    message: "invalid password",
                    success: false
                },
                {
                    status: 402
                }
            )
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "login success",
            success: true,
            token: token,
        })

        response.cookies.set("token", token, { httpOnly: true, })

         // Send Location header with redirect URL
        response.headers.set("Location", redirect);

        return response

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}

 