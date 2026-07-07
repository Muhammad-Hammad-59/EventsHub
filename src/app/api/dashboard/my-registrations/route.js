import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig";
import Registration from "@/models/registration.model";
import Event from "@/models/event.model";
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

export async function GET() {
  try {
    await connectDB();
    const user = getUserFromCookie();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const registrations = await Registration.find({ userid: user.id })
      .populate("eventid")
      .sort({ createdAt: -1 })
      .lean();

    // Filter out registrations where event was deleted
    const validRegistrations = registrations
      .filter((r) => r.eventid)
      .map((r) => ({
        _id: r._id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        paymentStatus: r.paymentStatus,
        registeredAt: r.createdAt,
        event: r.eventid,
      }));

    return NextResponse.json({
      message: "Registrations fetched successfully",
      registrations: validRegistrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
