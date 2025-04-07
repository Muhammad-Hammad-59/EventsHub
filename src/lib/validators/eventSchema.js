import { z } from "zod";
import { speakerSchema } from "./speakerSchema";
import { sessionSchema } from "./sessionSchema";

export const eventSchema = z.object({
  event: z.object({
    title: z.string().min(1),
    type: z.string().min(1),
    details: z.string().min(1),
    configuration: z.string().min(1),
    timeAndDate: z.string().datetime({ message: "Invalid date-time" }),
    location: z.string().min(1),
    eventformate: z.enum(["inperson", "virtual", "hybrid"]),
    venuName: z.string().min(1),
    venuAddress: z.string().min(1),
    coverimage: z.string().url(),
    organizerProfile: z.string().min(1),
    contact: z.string().min(1),
    RegistrationDeadline: z
      .string()
      .datetime({ message: "Invalid Registration Deadline" }),
    createdBy: z.string().min(1),
  }),

  agenda: z.array(sessionSchema),
  Speakers: z.array(speakerSchema),
});
