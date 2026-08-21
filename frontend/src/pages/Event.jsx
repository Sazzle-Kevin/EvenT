import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { apiClient } from "../utils/apiClient";

export default function Event() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(`/api/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Event not found.");
        } else if (err.message === "Network Error") {
          setError("Unable to connect to the server.");
        } else {
          setError("Failed to load event details.");
        }
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-500 mb-6 inline-block"
        >
          ← Back to Events
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {event.title || event.name}
          </h1>

          <div className="space-y-4 text-gray-700">
            {event.date && (
              <p>
                <strong className="text-gray-900">Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}

            {event.location && (
              <p>
                <strong className="text-gray-900">Location:</strong>{" "}
                {event.location}
              </p>
            )}

            {event.description && (
              <div>
                <strong className="text-gray-900">Description:</strong>
                <p className="mt-2">{event.description}</p>
              </div>
            )}

            {event.category && (
              <p>
                <strong className="text-gray-900">Category:</strong>{" "}
                {event.category}
              </p>
            )}

            {event.attendees && event.attendees.length > 0 && (
              <p>
                <strong className="text-gray-900">Attendees:</strong>{" "}
                {event.attendees.length}{" "}
                {event.attendees.length === 1 ? "person" : "people"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
