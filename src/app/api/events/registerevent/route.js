import { NextResponse } from "next/server";

// // import path from "path";
// // import { Readable } from "stream";

import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/dbConfig";
import { createEvent } from "@/services/eventService";
import { Readable } from "stream";
import { verifyToken } from "@/lib/tokenvarifyHelpers";

export async function POST(req) {
  await connectDB();

  try {
    const decoded = verifyToken();
    if (!decoded) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = decoded.id;
    console.log("Uesr Id:", userId);
    const formData = await req.formData();

    // Simple fields
    const eventData = {
      title: formData.get("title"),
      location: formData.get("location"),
      details: formData.get("details"),
      capacity: formData.get("capacity"),
      type: formData.get("type"),
      eventformate: formData.get("eventformate"),
      RegistrationDeadline: formData.get("RegistrationDeadline"),
      contact: formData.get("contact"),
      email: formData.get("email"),
      organizerProfile: formData.get("organizerProfile"),
      venuName: formData.get("venuName"),
      venuAddress: formData.get("venuAddress"),
      configuration: formData.get("configuration"),
      price: formData.get("price"),
      timeAndDate: formData.get("timeAndDate"),
      isFree: formData.get("isFree") === "true",
      createdBy: userId,
    };

    // Upload cover image
    const coverImageFile = formData.get("coverimage");
    if (coverImageFile && typeof coverImageFile.arrayBuffer === "function") {
      const buffer = Buffer.from(await coverImageFile.arrayBuffer());

      const coverUploadStream = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "eventhub/events/cover" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        Readable.from(buffer).pipe(stream);
      });

      eventData.coverimage = coverUploadStream.secure_url;
    }

    // Handle Speakers
    const speakers = [];
    let index = 0;
    while (formData.has(`Speakers[${index}][name]`)) {
      const name = formData.get(`Speakers[${index}][name]`);
      const bio = formData.get(`Speakers[${index}][bio]`);
      const expertise = formData.get(`Speakers[${index}][expertise]`);
      const profileimage = formData.get(`Speakers[${index}][profileImage]`);
      const socialMedia = {
        twitter: formData.get(`Speakers[${index}][socialMedia][twitter]`) || "",
        linkedin:
          formData.get(`Speakers[${index}][socialMedia][linkedin]`) || "",
        instagram:
          formData.get(`Speakers[${index}][socialMedia][instagram]`) || "",
        personalWebsite:
          formData.get(`Speakers[${index}][socialMedia][personalWebsite]`) || "",
      };

      let profileImage = "";
      if (profileimage && typeof profileimage.arrayBuffer === "function") {
        const buffer = Buffer.from(await profileimage.arrayBuffer());

        const speakerUpload = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "eventhub/events/speakers" },
            (err, result) => (err ? reject(err) : resolve(result))
          );
          Readable.from(buffer).pipe(stream);
        });

        profileImage = speakerUpload.secure_url;
      }

      speakers.push({
        name,
        bio,
        expertise,
        socialMedia,
        profileImage,
      });

      index++;
    }

    eventData.Speakers = speakers;

    // Handle Agenda
    const agenda = [];
    index = 0;
    while (formData.has(`agenda[${index}][sessionName]`)) {
      agenda.push({
        sessionName: formData.get(`agenda[${index}][sessionName]`),
        date: formData.get(`agenda[${index}][date]`),
        starttime: formData.get(`agenda[${index}][starttime]`),
        endtime: formData.get(`agenda[${index}][endtime]`),
        duration: formData.get(`agenda[${index}][duration]`),
        sessiondetail: formData.get(`agenda[${index}][sessiondetail]`),
      });
      index++;
    }

    eventData.agenda = agenda;

    const result = await createEvent(eventData);

    return NextResponse.json({
      message: "Event created successfully",
      result: result,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
