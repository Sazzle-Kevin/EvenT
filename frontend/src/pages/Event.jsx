import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { apiClient } from "../utils/apiClient";

function getRandomImage(id) {
  const images = [
    "https://picsum.photos/id/10/800/400",
    "https://picsum.photos/id/11/800/400",
    "https://picsum.photos/id/18/800/400",
    "https://picsum.photos/id/25/800/400",
    "https://picsum.photos/id/30/800/400",
    "https://picsum.photos/id/35/800/400",
    "https://picsum.photos/id/40/800/400",
    "https://picsum.photos/id/45/800/400",
    "https://picsum.photos/id/50/800/400",
    "https://picsum.photos/id/55/800/400",
    "https://picsum.photos/id/60/800/400",
    "https://picsum.photos/id/65/800/400",
    "https://picsum.photos/id/70/800/400",
    "https://picsum.photos/id/75/800/400",
    "https://picsum.photos/id/80/800/400",
    "https://picsum.photos/id/85/800/400",
    "https://picsum.photos/id/90/800/400",
    "https://picsum.photos/id/95/800/400",
    "https://picsum.photos/id/100/800/400",
    "https://picsum.photos/id/105/800/400",
  ];
  return images[Math.abs(parseInt(id)) % images.length];
}

export default function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(`/api/events/${id}`);
        const eventData = response.data;
        setEvent(eventData);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-600 mb-6">{error || "Event not found"}</p>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6 transition-colors"
        >
          ← Back to Events
        </Link>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-xl mb-8">
          <img
            src={getRandomImage(event.id)}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://picsum.photos/800/400";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              {event.category || "Event"}
            </span>
          </div>
        </div>

        {/* Event Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {event.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Details */}
            <div className="space-y-6">
              {event.date && (
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 7V3m8 4V3m-9 8h10a2 2 0 012 2v1m-2 6a2 2 0 01-2 2H9a2 2 0 01-2-2v-1a2 2 0 012-2h6a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
                    <p className="text-gray-700">{formatDate(event.date)}</p>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17.982 18.72S15.85 20 12 20s-3.982-1.28-5.982-4.28A7.969 7.969 0 015 10c0-4.418 3.582-8 8-8s8 3.582 8 8c0 1.32-.38 2.56-1.018 3.72z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-700">{event.location}</p>
                  </div>
                </div>
              )}

              {event.category && (
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M7 7h.01M7 7h.01M7 7h.01zM7 7h.01zM12 12h.01M12 12h.01M12 12h.01M12 12h.01M17 17h.01M17 17h.01M17 17h.01M17 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Category</h3>
                    <p className="text-gray-700">{event.category}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">About this event</h3>
              <p className="text-gray-700 leading-relaxed">
                {event.description || "No description available for this event."}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            ← Back to All Events
          </Link>
          {/* Add to Calendar / Share buttons could go here */}
        </div>
      </div>
    </div>
  );
}
