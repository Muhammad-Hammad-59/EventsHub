"use client";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import InputField from "./fromComponent/InputField";
import FormSection from "./fromComponent/FormSection";
import SelectField from "./fromComponent/SelectField";
import TextareaField from "./fromComponent/TextareaField";
import RadioField from "./fromComponent/RadioField";
import SpeakerForm from "./SpeakerForm";
import AgendaForm from "./AgendaForm";
import Button from "./fromComponent/Button";
import { Input } from "@heroui/react";
import { useEffect, useState } from "react";
import appendFormData from "@/lib/appendFormData";
import LoadingPage from "../LoadingPage";
import { sendFormData } from "@/lib/sendRegFormData";

const eventTypes = [
  { value: "", label: "Select Event Type" },
  { value: "conference", label: "Conference" },
  { value: "workshop", label: "Workshop" },
  { value: "seminar", label: "Seminar" },
  { value: "webinar", label: "Webinar" },
  { value: "meetup", label: "Meetup" },
  { value: "other", label: "Other" },
];

const eventFormats = [
  { value: "", label: "Select Format" },
  { value: "in-person", label: "In-Person" },
  { value: "virtual", label: "Virtual" },
  { value: "hybrid", label: "Hybrid" },
];

const EventRegistrationForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
     
  } = useForm({
    defaultValues: {
      email: "",
      title: "",
      type: "",
      details: "",
      configuration: "",
      timeAndDate: "",
      location: "",
      eventformate: "",
      venuName: "",
      venuAddress: "",
      organizerProfile: "",
      contact: "",
      capacity: "",
      RegistrationDeadline: "",
      isFree: true,
      price: 0,
      coverimage: "",
      Speakers: [],
      agenda: [],
    },
  });

  const isFree = watch("isFree");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Form submission handler
  const onSubmit = async (data) => {
 
    console.log("Form Data:", data);
    

    try {
      setLoading(true);

      const formdata = appendFormData(data)

       console.log("FormData:", formdata);

     const { success, message } = await sendFormData(formdata);

      // const comverImage = data.coverimage
      // console.log ("coverImage", comverImage);
      // console.log("Sending data:", JSON.stringify({ event: data }, null, 2));
      // const response = await fetch("/api/events", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ event: data }),
      // });


      if (success) {
        setMessage(message);
        console.log("Event registered successfully:", message);
     
      } else {
        setMessage(message);
      }




      
      // const result = await response.json();
      // console.log("Response:", result);

      // if (response.ok) {
      //   setMessage("Event registered successfully!");
      //   console.log("Event registered successfully:", result);
      //   reset(); // Reset the form
      // } else {
      //   setMessage(result.message || "Something went wrong");
      // }
    } catch (error) {
      console.log("error in registration", error);
      setMessage("Network error");
    } finally {
      setLoading(false);
    }

    alert("Event registration submitted! Check console for data.");
  };

  { loading &&  <LoadingPage />}
  return (
    <div className="max-w-4xl mt-20 mb-10 bg-backgroundSecondary rounded-2xl  mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Event Registration
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Event Information Section */}
        <FormSection title="Basic Event Information">
          <Controller
            name="title"
            control={control}
            rules={{ required: "Event title is required" }}
            render={({ field }) => (
              <InputField
                label="Event Title"
                id="title"
                error={errors.title?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            rules={{ required: "Event type is required" }}
            render={({ field }) => (
              <SelectField
                label="Event Type"
                id="type"
                options={eventTypes}
                error={errors.type?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="details"
            control={control}
            rules={{ required: "Event details are required" }}
            render={({ field }) => (
              <TextareaField
                label="Event Details"
                id="details"
                error={errors.details?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="configuration"
            control={control}
            rules={{ required: "Event configuration is required" }}
            render={({ field }) => (
              <InputField
                label="Event Configuration"
                id="configuration"
                type="text"
                error={errors.configuration?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="timeAndDate"
            control={control}
            rules={{ required: "Event date and time is required" }}
            render={({ field }) => (
              <InputField
                label="Event Date and Time"
                id="timeAndDate"
                type="datetime-local"
                error={errors.timeAndDate?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="eventformate"
            control={control}
            rules={{ required: "Event format is required" }}
            render={({ field }) => (
              <SelectField
                label="Event Format"
                id="eventformate"
                options={eventFormats}
                error={errors.eventformate?.message}
                required
                {...field}
              />
            )}
          />
        </FormSection>

        {/* Venue Information Section */}
        <FormSection title="Venue Information">
          <Controller
            name="location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <InputField
                label="Location"
                id="location"
                error={errors.location?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="venuName"
            control={control}
            rules={{ required: "Venue name is required" }}
            render={({ field }) => (
              <InputField
                label="Venue Name"
                id="venuName"
                error={errors.venuName?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="venuAddress"
            control={control}
            rules={{ required: "Venue address is required" }}
            render={({ field }) => (
              <TextareaField
                label="Venue Address"
                id="venuAddress"
                error={errors.venuAddress?.message}
                required
                {...field}
              />
            )}
          />
        </FormSection>

        {/* Organizer Information Section */}
        <FormSection title="Organizer Information">
          <Controller
            name="organizerProfile"
            control={control}
            rules={{ required: "Organizer profile is required" }}
            render={({ field }) => (
              <TextareaField
                label="Organizer Profile"
                id="organizerProfile"
                error={errors.organizerProfile?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            name="contact"
            control={control}
            rules={{ required: "Contact information is required" }}
            render={({ field }) => (
              <InputField
                label="Contact Information"
                id="contact"
                error={errors.contact?.message}
                required
                {...field}
              />
            )}
          />
        </FormSection>

        {/* Event Capacity Section */}
        <FormSection title="Event Capacity and Registration">
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <InputField
                label="Maximum Capacity"
                id="capacity"
                type="number"
                min="1"
                error={errors.capacity?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="RegistrationDeadline"
            control={control}
            rules={{ required: "Registration deadline is required" }}
            render={({ field }) => (
              <InputField
                label="Registration Deadline"
                id="RegistrationDeadline"
                type="date"
                error={errors.RegistrationDeadline?.message}
                required
                {...field}
              />
            )}
          />

          <div className="mb-4">
            <p className="block text-sm font-medium text-gray-700 mb-1">
              Is this a free event? *
            </p>
            <div className="flex space-x-4">
              <Controller
                name="isFree"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <>
                    <RadioField
                      id="isFreeYes"
                      value={true}
                      checked={value === true}
                      onChange={() => onChange(true)}
                      label="Yes"
                      {...field}
                    />
                    <RadioField
                      id="isFreeNo"
                      value={false}
                      checked={value === false}
                      onChange={() => onChange(false)}
                      label="No"
                      {...field}
                    />
                  </>
                )}
              />
            </div>
          </div>

          {!isFree && (
            <Controller
              name="price"
              control={control}
              rules={{
                required: !isFree && "Ticket price is required",
                min: { value: 0, message: "Price cannot be negative" },
              }}
              render={({ field }) => (
                <InputField
                  label="Ticket Price ($)"
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  error={errors.price?.message}
                  required
                  {...field}
                />
              )}
            />
          )}
        </FormSection>

        {/* Media Section */}
        <FormSection title="Event Media">
          <Controller
            name="coverimage"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <InputField
                label="Cover Image URL"
                id="coverimage"
                type="file"
                error={errors.coverimage?.message}
                accept="image/*"
                onChange={(e) => onChange(e.target.files[0])}
                {...field}
              />
            )}
          />
        </FormSection>

        {/* Speakers Section */}
        <FormSection title="Event Speakers">
          <SpeakerForm control={control} errors={errors} />
        </FormSection>

        {/* Agenda Section */}
        <FormSection title="Event Agenda">
          <AgendaForm control={control} errors={errors} />
        </FormSection>

        <div className="flex justify-center pt-6">
          <Button type="submit">Submit Registration</Button>
        </div>
      </form>
    </div>
  );
};

export default EventRegistrationForm;
