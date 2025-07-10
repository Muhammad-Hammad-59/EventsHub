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
    capacity: z.number().int().min(1).nullable().default(null),
    isFree: z.boolean().default(true),
    price: z.number().min(0).default(0).refine(val => val >= 0, "Price cannot be negative"),
    registrationCount: z.number().int().min(0).default(0),
    // RegistrationDeadline: z
    //   .string()
    //   .datetime({ message: "Invalid Registration Deadline" }),
    RegistrationDeadline: z.coerce.date()
    .refine(date => date > new Date(), "Deadline must be in the future"),
    createdBy: z.string().min(1),
    agenda: z.array(sessionSchema),
    Speakers: z.array(speakerSchema),
  }),

});
