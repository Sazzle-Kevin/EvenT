import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { apiClient } from "../utils/apiClient";
import DynamicText from "../components/DynamicText";

const getRandomImage = (event) =>
  `https://picsum.photos/seed/event-${event.id}/400/300`;

// Bento-Grid: Jede Karte hat eigene Höhe — organisch, nicht gleichmäßig
const CARD_HEIGHTS = [
  "h-[28rem]", "h-[20rem]", "h-[32rem]", "h-[24rem]",
  "h-[28rem]", "h-[36rem]", "h-[20rem]", "h-[24rem]",
];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.play().catch(() => {});
    };

    attemptPlay();
    document.addEventListener("click", attemptPlay, { once: true });
    document.addEventListener("scroll", attemptPlay, { once: true });

    return () => {
      document.removeEventListener("click", attemptPlay);
      document.removeEventListener("scroll", attemptPlay);
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get("/api/events");
        let eventsData = [];
        if (response.data && typeof response.data === "object") {
          if (Array.isArray(response.data.results)) {
            eventsData = response.data.results;
          } else if (Array.isArray(response.data)) {
            eventsData = response.data;
          }
        }
        const sortedEvents = [...eventsData].sort(
          (a, b) =>
            new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt)
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

    // Listen for search-event from Header
    let searchTimeout;
    const handleSearch = (e) => {
      const query = e.detail.query;
      if (searchTimeout) clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        if (query && query.trim().length >= 2) {
          setSearchLoading(true);
          apiClient
            .get("/api/events/search", { params: { q: query.trim() } })
            .then((res) => {
              setEvents(res.data);
            })
            .catch(() => {
              // Search failed — keep showing existing events
            })
            .finally(() => setSearchLoading(false));
        } else if (!query || query.trim().length === 0) {
          // Clear search → re-fetch all events with loading state
          setLoading(true);
          setEvents([]);
          setSearchLoading(false);
          fetchEvents();
        }
      }, 500);
    };

    window.addEventListener("search-event", handleSearch);

    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
      window.removeEventListener("search-event", handleSearch);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#64B5F6] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A9A76] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#64B5F6] text-white">
        <div className="text-center p-6 bg-red-900/30 border border-[#8A9A76]/30 rounded-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#8A9A76] text-white rounded-md hover:bg-[#636367]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#64B5F6]">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="metadata"
        className="fixed inset-0 w-full aspect-video sm:h-screen object-cover object-top z-0"
        onEnded={(e) => {
          const v = e.target;
          v.pause();
          v.currentTime = v.duration - 0.1;
        }}
      >
        <source src="/videos/hero-location-bg.webm" type="video/webm; codecs=vp9" />
        <source src="/videos/hero-location-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-x-0 top-16 z-30 flex items-center justify-center sm:h-[calc(100vh-4rem)]">
        <DynamicText />
      </div>

      {/* Spacer: damit Karten unterhalb des Hero-Video-Bereichs erscheinen */}
      <div className="h-screen sm:h-[120vh] w-full" />

      {/* Bento-Grid: CSS Columns für gleichmäßigen Whitespace + unterschiedliche Kartenhöhen */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-8 pb-32">
        {searchLoading && (
          <div className="text-center py-8 text-white/70">
            <p>Searching events...</p>
          </div>
        )}
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">
              {searchLoading ? "Searching..." : "No events available yet."}
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6">
            {events.map((event, index) => {
              const heightClass = CARD_HEIGHTS[index % CARD_HEIGHTS.length];

              return (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className={`mb-6 block group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-white no-underline shadow-xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 ${heightClass} break-inside-avoid`}
                >
                  <div className="absolute inset-0 flex flex-col">
                    <div className="relative h-48 flex-shrink-0 overflow-hidden">
                      <img
                        src={getRandomImage(event)}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/seed/fallback-${event.id}/400/300`;
                        }}
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-[#DDC49A]/90 px-2.5 py-1 font-medium text-xs text-[#636367]">
                        {event.category || "Event"}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-xl text-white mb-2 line-clamp-1 group-hover:text-[#8A9A76] transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-3 mb-3 flex-1">
                        {event.description || "No description available"}
                      </p>
                      {event.location && (
                        <p className="text-[#8A9A76] text-xs flex items-center mt-auto">
                          📍 {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
