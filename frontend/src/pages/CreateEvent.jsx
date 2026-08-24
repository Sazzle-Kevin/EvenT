import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { apiClient } from "../utils/apiClient";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // The backend expects date as ISO string
      const response = await apiClient.post("/api/events", {
        title,
        description,
        date: new Date(date).toISOString(),
        location,
      });

      const newEventId = response.data.id;
      navigate(`/events/${newEventId}`);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Your session has expired. Please sign in again.");
      } else if (err.response?.status === 400) {
        const message = err.response.data?.message || err.response.data?.error || "Invalid data. Please check your input.";
        setError(message);
      } else if (err.message === "Network Error") {
        setError("Unable to connect to the server.");
      } else {
        setError("Failed to create event. Please try again.");
      }
      console.error("Error creating event:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            to="/"
            className="text-[#8A9A76] hover:text-[#636367] inline-block"
          >
            ← Back to Events
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create New Event
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Event Title *
              </label>
              <input
                type="text"
                id="title"
                required
                minLength={3}
                maxLength={255}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#8A9A76] focus:border-[#8A9A76]"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                maxLength={5000}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#8A9A76] focus:border-[#8A9A76]"
                placeholder="Describe your event..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date & Time *
              </label>
              <input
                type="datetime-local"
                id="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#8A9A76] focus:border-[#8A9A76]"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location *
              </label>
              <input
                type="text"
                id="location"
                required
                maxLength={255}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#8A9A76] focus:border-[#8A9A76]"
                placeholder="Enter event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-[#8A9A76] hover:bg-[#636367] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8A9A76] disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
