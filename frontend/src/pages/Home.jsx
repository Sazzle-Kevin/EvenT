import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { apiClient } from "../utils/apiClient";
import DynamicText from "../components/DynamicText";

const getRandomImage = (event) => {
  // picsum.photos/seed/{id}: JEDE ID → anderes, unabhängiges Bild (neutrale Natur/Abstract)
  // source.unsplash.com wird NICHT genutzt (cachet pro Query → alle Karten = gleich)
  return `https://picsum.photos/seed/event-${event.id}/400/300`;
};

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const videoRef = useRef(null);

  // Robustes autoplay: Safari blockiert autoplay auf localhost,
  // also versuchen wir .play() nach dem Mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.play().catch(() => {
        // Autoplay blockiert — Browser erlaubt es nach User-Interaktion
      });
    };

    // Sofort versuchen, und auch auf User-Event warten
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

        if (response.data && typeof response.data === 'object') {
          if (Array.isArray(response.data.results)) {
            eventsData = response.data.results;
          } else if (Array.isArray(response.data)) {
            eventsData = response.data;
          }
        }

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
      {/* Background-Video: fixed am Viewport-Rand, z-0 */}
      {/* 16:9 Aspect-Ratio auf Mobile, 100vh auf Desktop */}
      {/* onEnded: pausiert beim letzten Frame (frozen) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full aspect-video sm:h-screen object-cover object-top z-0"
        onEnded={(e) => {
          // Video endet → pausiere beim letzten Frame
          const v = e.target;
          v.pause();
          v.currentTime = v.duration - 0.1;
        }}
      >
        <source src="/videos/hero-location-bg.mp4" type="video/mp4" />
      </video>

      {/* Hero-Headline: zentriert im Hero-Bereich (über Video + Header) */}
      <div className="absolute inset-x-0 top-16 z-30 flex items-center justify-center sm:h-[calc(100vh-4rem)]">
        <DynamicText />
      </div>

      {/* Content Layer: Event-Karten unterhalb des Hero-Videos */}
      {/* 16:9 Höhe auf Mobile (aspect-ratio), 120vh auf Desktop */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-[56.25vw] sm:pt-[120vh] pb-32">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">No events available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-y-8 sm:gap-6 md:gap-12">
            {events.map((event) => {
              return (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="group block bg-white/10 backdrop-blur-xl rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-white/10 h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getRandomImage(event)}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/fallback-${event.id}/400/300`;
                      }}
                    />
                    <span className="absolute top-2 left-2 rounded-md bg-[#DDC49A]/90 px-2 py-1 font-medium text-xs text-[#636367]">
                      {event.category || "Event"}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-[#8A9A76] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2 mb-3">
                      {event.description || "No description available"}
                    </p>
                    {event.location && (
                      <p className="text-[#8A9A76] text-xs flex items-center">📍 {event.location}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
