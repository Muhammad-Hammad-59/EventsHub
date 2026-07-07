import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig";
import Event from "@/models/event.model";
import Registration from "@/models/registration.model";
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

export async function GET(req) {
  try {
    await connectDB();
    const user = getUserFromCookie();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    const filter = { createdBy: user.id };

    const [events, total] = await Promise.all([
      Event.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Event.countDocuments(filter),
    ]);

    // Get registration counts for each event
    const eventIds = events.map((e) => e._id);
    const regCounts = await Registration.aggregate([
      { $match: { eventid: { $in: eventIds } } },
      { $group: { _id: "$eventid", count: { $sum: 1 } } },
    ]);

    const regCountMap = {};
    regCounts.forEach((r) => {
      regCountMap[r._id.toString()] = r.count;
    });

    const eventsWithCounts = events.map((e) => ({
      ...e,
      registrationCount: regCountMap[e._id.toString()] || 0,
    }));

    return NextResponse.json({
      message: "Events fetched successfully",
      events: eventsWithCounts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching my events:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
