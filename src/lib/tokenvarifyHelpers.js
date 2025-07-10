// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { CustomError } from "./customErrors";


// export  const verifyToken = async (req) => {

//   const cookieStore = cookies();
//   const allCookies =await cookieStore.getAll();
//   console.log("All cookies:", allCookies);

//   const token = await cookieStore.get("token")?.value;

//     // const authHeader = req.headers.get("authorization");
  
//     // if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     //   throw new Error("Unauthorized: No token provided");
//     // }
  
//     // const token = authHeader.split(" ")[1];
  
//     console.log("Token received from cookie:", token);    

//     if (!token) {
//       throw new CustomError("Unauthorized: No token provided",401);
//     }

//     try {
//         const decoded = await new Promise((resolve, reject) => {
//             jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//                 if (err) reject(err);
//                 resolve(decoded);
//             });
//         });
//       return decoded;
//     } catch (err) {
//     console.error("JWT verify error:", err); // 👈 Log the actual JWT error
//     throw new Error("Unauthorized: Invalid or malformed token");
//     }
//   };




import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; // for app directory routes

export function verifyToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error('Unauthorized: No token found in cookies');
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}