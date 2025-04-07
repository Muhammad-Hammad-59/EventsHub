import {connectDB} from "@/lib/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



connectDB()


export async function POST(request){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log("register reqbody value",reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        console.log(`salt value in register: ${salt}`)
        const hashedPassword = await bcryptjs.hash(password, salt)
        console.log(`hashpassword value in register: ${salt}`)



        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
 

        

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}