import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig";
import Event from "@/models/event.model";
import Registration from "@/models/registration.model";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

function getUserFromCookie() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch {
    return null;
  }
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    const user = getUserFromCookie();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { eventId } = await params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json({ message: "Invalid event ID" }, { status: 400 });
    }

    // Verify the user owns this event
    const event = await Event.findById(eventId).lean();
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    if (event.createdBy?.toString() !== user.id) {
      return NextResponse.json({ message: "You are not the owner of this event" }, { status: 403 });
    }

    const registrants = await Registration.find({ eventid: eventId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      message: "Registrants fetched successfully",
      event: { _id: event._id, title: event.title, coverimage: event.coverimage },
      registrants,
    });
  } catch (error) {
    console.error("Error fetching registrants:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
