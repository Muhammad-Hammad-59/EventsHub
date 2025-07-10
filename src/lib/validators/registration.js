import { z } from "zod";

// ObjectId validator (24 hex chars)
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: "Invalid ObjectId",
});

export const registrationSchema = z.object({
  userid: objectId,
  eventid: objectId,
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  paymentStatus: z.boolean().optional().default(false),
  paymentDetail: objectId.optional()
}).refine(
  (data) => {
    if (data.paymentStatus === true && !data.paymentDetail) {
      return false;
    }
    return true;
  },
  {
    message: "Payment detail is required if payment status is true",
    path: ["paymentDetail"],
  }
);
