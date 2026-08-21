import { useState, useEffect } from "react";
import { Link } from "react-router";
import { apiClient } from "../utils/apiClient";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // API returns paginated response: { results: [...], totalCount, totalPages, ... }
        const response = await apiClient.get("/api/events");
        let eventsData = [];
        
        // Handle both paginated and array responses
        if (response.data && typeof response.data === 'object') {
          if (Array.isArray(response.data.results)) {
            eventsData = response.data.results;
          } else if (Array.isArray(response.data)) {
            eventsData = response.data;
          }
        }

        // Sort events chronologically (by date)
        const sortedEvents = [...eventsData].sort(
          (a, b) => new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt)
        );

        setEvents(sortedEvents);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("No events found.");
        } else if (err.message === "Network Error") {
          setError(
            "Unable to connect to the server. Please make sure the API is running."
          );
        } else {
          setError("Failed to load events. Please try again later.");
        }
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Upcoming Events
        </h1>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {event.description || "No description available"}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10a2 2 0 012 2v1m-2 6a2 2 0 01-2 2H9a2 2 0 01-2-2v-1a2 2 0 012-2h6a2 2 0 012 2z"
                      />
                    </svg>
                    <span>
                      {event.date
                        ? new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : new Date(event.createdAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.982 18.72S15.85 20 12 20s-3.982-1.28-5.982-4.28A7.969 7.969 0 015 10c0-4.418 3.582-8 8-8s8 3.582 8 8c0 1.32-.38 2.56-1.018 3.72z"
                        />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
