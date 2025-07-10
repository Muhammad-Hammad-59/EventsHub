 
 "use client"
import { useState } from "react";
import FormSection from "./fromComponent/FormSection";
import InputField from "./fromComponent/InputField";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify"; 

export default function RegisterForEvent() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const toastId = toast.loading("Processing registration...");

    try{
        const response  = await fetch("/api/events/67f3e3adf2e812442f3ce8d0/register", {
            method: "POST",
            header: {
                "content_Type": "application/json",

            },
            body:JSON.stringify(data),
            credentials: "include",
        })

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
        }

        const result = await response.json();
        console.log("Registered Successfully:", result);
       
         
         
        toast.update(toastId, {
            render: "Registered successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });



    }catch(error){
        console.log("Error in Register for event",error)
        toast.update(toastId, {
            render: error.message || "Registration failed",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
    }
    


  };

  return (
    <div className="max-w-4xl mt-20 mb-10 bg-backgroundSecondary rounded-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Event Registration
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection title="Register for Event">
          {/* Name */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <InputField
                label="Name"
                id="name"
                placeholder="Enter your name"
                error={errors.name}
                {...field}
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <InputField
                label="Email"
                id="email"
                placeholder="Enter your email"
                error={errors.email}
                {...field}
              />
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <InputField
                label="Phone"
                id="phone"
                placeholder="Enter your phone number"
                error={errors.phone}
                {...field}
              />
            )}
          />
        </FormSection>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
