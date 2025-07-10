import { z } from 'zod';

export const speakerSchema = z.object({
  // _id: z.string().min(1, "Speaker ID is required"),
  name: z.string().min(1, "Speaker name is required"),
  profileImage: z.string().url("Profile Image must be a valid URL"),
  bio: z.string().min(1, "Bio is required"),
  expertise: z.string().min(1, "Expertise is required"),
  socialMedia: z.object({
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    personalWebsite: z.string().url().optional(),
  }),
});