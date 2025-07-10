// // /lib/validators/eventSchema.js
// import { z } from 'zod';

// export const eventUpdateSchema = z.object({
//   userId: z.string().optional(), // to validate authorization
//   event: z.object({
//     title: z.string().optional(),
//     type: z.string().optional(),
//     details: z.string().optional(),
//     configuration: z.string().optional(),
//     timeAndDate: z.string().datetime().optional(),
//     location: z.string().optional(),
//     eventformate: z.string().optional(),
//     venuName: z.string().optional(),
//     venuAddress: z.string().optional(),
//     coverimage: z.string().optional(),
//     organizerProfile: z.string().optional(),
//     contact: z.string().optional(),
//     RegistrationDeadline: z.string().datetime().optional(),
//   }).optional(),

//   speakers: z.array(
//     z.object({
//       name: z.string().optional(),
//       profileImage: z.string().optional(),
//       bio: z.string().optional(),
//       expertise: z.string().optional(),
//       socialMedia: z.object({
//         linkedin: z.string().optional(),
//         twitter: z.string().optional(),
//         instagram: z.string().optional(),
//         personalWebsite: z.string().optional()
//       }).optional()
//     })
//   ).optional(),

//   agenda: z.array(
//     z.object({
//       sessionName: z.string().optional(),
//       speaker: z.string().optional(),
//       date: z.string().datetime().optional(),
//       starttime: z.string().optional(),
//       endtime: z.string().optional(),
//       sessiondetail: z.string().optional(),
//       duration: z.string().optional()
//     })
//   ).optional()
// });


import { z } from "zod";
import { speakerSchema } from "./speakerSchema";
import { sessionSchema } from "./sessionSchema";

export const eventUpdateSchema = z.object({
  event: z.object({
    title: z.string().min(1).optional(),
    type: z.string().min(1).optional(),
    details: z.string().min(1).optional(),
    configuration: z.string().min(1).optional(),
    timeAndDate: z.string().datetime({ message: "Invalid date-time" }).optional(),
    location: z.string().min(1).optional(),
    eventformate: z.enum(["inperson", "virtual", "hybrid"]).optional(),
    venuName: z.string().min(1).optional(),
    venuAddress: z.string().min(1).optional(),
    coverimage: z.string().url().optional(),
    organizerProfile: z.string().min(1).optional(),
    contact: z.string().min(1).optional(),
    RegistrationDeadline: z
      .string()
      .datetime({ message: "Invalid Registration Deadline" })
      .optional(),
    createdBy: z.string().min(1).optional(),
  }).partial(),

  agenda: z.array(sessionSchema.partial()).optional(),
  Speakers: z.array(speakerSchema.partial()).optional(),

  userId: z.string().min(1),
});
