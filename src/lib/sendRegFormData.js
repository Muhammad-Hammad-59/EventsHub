// export  const sendFormData = async (formData) => {
//     try {
//       const response = await fetch("/api/events", {
//         method: "POST",
//         body: formData, // Do not manually set 'Content-Type'
//       });
  
//       const result = await response.json();
//       console.log("Server Response:", result);
  
//       if (response.ok) {
//         return { success: true, message: "Event registered successfully!" };
//       } else {
//         return { success: false, message: result.message || "Something went wrong" };
//       }
//     } catch (error) {
//       console.error("Error in registration:", error);
//       return { success: false, message: "Network error" };
//     }
//   };
  


export const sendFormData = async (formData) => {
  try {
    const response = await fetch("/api/events/registerevent", {
      method: "POST",
      body: formData,
    });

    const text = await response.text();
    const result = text ? JSON.parse(text) : {};

    console.log("Server Response in frontend:", result);

    if (response.ok) {
      return { success: true, message: result.message || "Event registered successfully!" };
    } else {
      return { success: false, message: result.message || "Something went wrong" };
    }
  } catch (error) {
    console.error("Error in registration:", error);
    return { success: false, message: "Network error" };
  }
};
