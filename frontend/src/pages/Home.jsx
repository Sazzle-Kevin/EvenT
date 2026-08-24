import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { apiClient } from "../utils/apiClient";
import DynamicText from "../components/DynamicText";

const getRandomImage = (event) =>
  `https://picsum.photos/seed/event-${event.id}/400/300`;

// Bento-Seeds: bestimme die relative Größe der Karten
// Format: { width: 'col-span-X', height: 'row-span-Y' }
// width: 1 (schmal) | 2 (1.5x breit) | 3 (doppelt breit)
// height: 1 (normal) | 2 (doppelt hoch)
const BENTO_SIZES = [
  { w: 2, h: 1 }, // breit, normal
  { w: 1, h: 2 }, // schmal, hoch
  { w: 1, h: 1 }, // schmal, normal
  { w: 3, h: 1 }, // doppelt breit, normal
  { w: 1, h: 1 }, // schmal, normal
  { w: 2, h: 2 }, // breit, hoch
  { w: 1, h: 1 }, // schmal, normal
  { w: 2, h: 1 }, // breit, normal
  { w: 1, h: 2 }, // schmal, hoch
];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const videoRef = useRef(null);

  // Robustes autoplay
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
      {/* Background-Video: fixed am Viewport-Rand */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full aspect-video sm:h-screen object-cover object-top z-0"
        onEnded={(e) => {
          const v = e.target;
          v.pause();
          v.currentTime = v.duration - 0.1;
        }}
      >
        <source src="/videos/hero-location-bg.mp4" type="video/mp4" />
      </video>

      {/* Hero-Headline */}
      <div className="absolute inset-x-0 top-16 z-30 flex items-center justify-center sm:h-[calc(100vh-4rem)]">
        <DynamicText />
      </div>

      {/* Bento-Grid: Content Layer unterhalb */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-[56.25vw] sm:pt-[120vh] pb-32">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">No events available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[20rem] sm:auto-rows-[24rem]">
            {events.map((event, index) => {
              const size = BENTO_SIZES[index % BENTO_SIZES.length];
              // col-span-3 Karten: breiter Bild-Bereich
              // row-span-2 Karten: doppelter Platz für größeres Bild
              const imgHeightClass =
                size.w === 3 ? "h-56" :
                size.h === 2 ? "h-64" : "h-40";

              return (
                <Link
                  key={event.id}
                  to={`/events/${event.id}`}
                  className={`group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-white no-underline shadow-xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 col-span-${size.w} row-span-${size.h} h-[20rem] sm:h-[24rem]`}
                >
                  <div className="flex flex-col h-full">
                    {/* Bild-Bereich — dynamisch hoch */}
                    <div className={`relative ${imgHeightClass} overflow-hidden flex-shrink-0`}>
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

                    {/* Text-Bereich — unterhalb Bild */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-xl text-white mb-2 line-clamp-1 group-hover:text-[#8A9A76] transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-2 mb-3 flex-1">
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
      </div>
    </div>
  );
}
