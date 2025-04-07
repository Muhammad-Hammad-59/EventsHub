import { z } from 'zod';

export const sessionSchema = z.object({
  sessionName: z.string().min(1, "Session name is required"),
  speaker: z.string().min(1, "Speaker ID is required"),
  date: z.string().date({ message: "Invalid session date format" }),
  starttime: z.string().min(1, "Start time is required"),
  endtime: z.string().min(1, "End time is required"),
  sessiondetail: z.string().min(1, "Session details are required"),
  duration: z.string().min(1, "Duration is required"),
});