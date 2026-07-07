"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import InputField from "@/components/form/fromComponent/InputField";
import FormSection from "@/components/form/fromComponent/FormSection";
import SelectField from "@/components/form/fromComponent/SelectField";
import TextareaField from "@/components/form/fromComponent/TextareaField";
import RadioField from "@/components/form/fromComponent/RadioField";
import Button from "@/components/form/fromComponent/Button";

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

export default function EditEventPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const isFree = watch("isFree");

  // Fetch event data and populate form
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/events?id=${id}`, { credentials: "include" });
        const data = await res.json();
        if (res.ok && data.event) {
          setEvent(data.event);
          // Format dates for datetime-local and date inputs
          const td = data.event.timeAndDate ? new Date(data.event.timeAndDate).toISOString().slice(0, 16) : "";
          const rd = data.event.RegistrationDeadline ? new Date(data.event.RegistrationDeadline).toISOString().slice(0, 10) : "";

          reset({
            title: data.event.title || "",
            type: data.event.type || "",
            details: data.event.details || "",
            configuration: data.event.configuration || "",
            timeAndDate: td,
            location: data.event.location || "",
            eventformate: data.event.eventformate || "",
            venuName: data.event.venuName || "",
            venuAddress: data.event.venuAddress || "",
            organizerProfile: data.event.organizerProfile || "",
            contact: data.event.contact || "",
            capacity: data.event.capacity || "",
            RegistrationDeadline: rd,
            isFree: data.event.isFree ?? true,
            price: data.event.price || 0,
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating event...");
    try {
      const res = await fetch(`/api/events?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        toast.update(toastId, { render: "Event updated successfully!", type: "success", isLoading: false, autoClose: 2000 });
        setTimeout(() => router.push("/dashboard/my-events"), 1500);
      } else {
        toast.update(toastId, { render: result.message || "Update failed", type: "error", isLoading: false, autoClose: 3000 });
      }
    } catch (err) {
      console.error(err);
      toast.update(toastId, { render: "Update failed", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-textSecondary font-medium">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <p className="text-textSecondary mb-4">Event not found</p>
        <Link href="/dashboard/my-events" className="text-accent font-semibold hover:underline">
          Back to My Events
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto"
    >
      {/* Page Header with Back Button */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 pb-6 border-b border-borderColor"
      >
        <Link href="/dashboard/my-events" className="flex items-center gap-2 text-accent hover:text-accent/80 transition font-semibold mb-4">
          <ArrowLeftIcon className="w-4 h-4" />
          Back to My Events
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
            <PencilSquareIcon className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-textPrimary">Edit Event</h1>
        </div>
        <p className="text-textSecondary text-sm mt-3">Update event details to keep everything current and engaging.</p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-2xl border border-borderColor p-8 sm:p-10"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <FormSection title="Basic Event Information">
            <Controller
              name="title"
              control={control}
              rules={{ required: "Event title is required" }}
              render={({ field }) => (
                <InputField
                  label="Event Title"
                  id="edit-title"
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
                  id="edit-type"
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
                  id="edit-details"
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
                  id="edit-configuration"
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
                  id="edit-timeAndDate"
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
                  id="edit-eventformate"
                  options={eventFormats}
                  error={errors.eventformate?.message}
                  required
                  {...field}
                />
              )}
            />
          </FormSection>

          <FormSection title="Venue Information">
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <InputField
                  label="Location"
                  id="edit-location"
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
                  id="edit-venuName"
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
                  id="edit-venuAddress"
                  error={errors.venuAddress?.message}
                  required
                  {...field}
                />
              )}
            />
          </FormSection>

          <FormSection title="Organizer Information">
            <Controller
              name="organizerProfile"
              control={control}
              rules={{ required: "Organizer profile is required" }}
              render={({ field }) => (
                <TextareaField
                  label="Organizer Profile"
                  id="edit-organizerProfile"
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
                  id="edit-contact"
                  error={errors.contact?.message}
                  required
                  {...field}
                />
              )}
            />
          </FormSection>

          <FormSection title="Capacity & Registration">
            <Controller
              name="capacity"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Maximum Capacity"
                  id="edit-capacity"
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
                  id="edit-RegistrationDeadline"
                  type="date"
                  error={errors.RegistrationDeadline?.message}
                  required
                  {...field}
                />
              )}
            />
            <div className="mb-4">
              <p className="block text-sm font-medium text-textPrimary mb-3">Is this a free event? *</p>
              <div className="flex space-x-6">
                <Controller
                  name="isFree"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={value === true}
                          onChange={() => onChange(true)}
                          className="w-4 h-4 accent-accent"
                          {...field}
                        />
                        <span className="text-sm font-medium text-textSecondary">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={value === false}
                          onChange={() => onChange(false)}
                          className="w-4 h-4 accent-accent"
                          {...field}
                        />
                        <span className="text-sm font-medium text-textSecondary">No</span>
                      </label>
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
                    id="edit-price"
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

          <div className="flex items-center justify-between pt-8 border-t border-borderColor">
            <p className="text-xs text-textMuted font-medium">All fields marked with * are required</p>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-accent to-accent/80 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-accent/20"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </span>
              ) : (
                "Update Event"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
