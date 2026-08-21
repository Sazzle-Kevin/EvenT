import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { apiClient } from "../utils/apiClient";

// Unsplash-Bilder für Events - themenspezifisch basierend auf Kategorie/Location
const EVENT_IMAGES = {
  music: [
    "https://images.unsplash.com/photo-1516205669094-6c2f3f4f1f1f?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519501025249-3f2a1f4d0b4a?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506126902345-4eb7a5c1f44e?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-152364723-4c587e6a6a4f?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1545918594-4f8b5a9b7a88?w=400&h=300&fit=crop&q=80",
  ],
  food: [
    "https://images.unsplash.com/photo-1504674979558-1c5058c5227e?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9591d1c502?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1414235022488-01f1bbaef29f?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552533231-4e093609d4d9?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544982533-e5f7bff360dc?w=400&h=300&fit=crop&q=80",
  ],
  festival: [
    "https://images.unsplash.com/photo-1544533993-7a4d0ab5f1c7?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1533174739678-2066e9e79ae2?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571366019794-e8e83b99b10c?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519671482456-39747ad2cc09?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531254396167-b5b0b4d6b6e3?w=400&h=300&fit=crop&q=80",
  ],
  nightlife: [
    "https://images.unsplash.com/photo-1519052537532-b0f456e9c109?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517245679678-7a9d2ec9f44a?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1547693434-1b7e9ba54e30?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1520203552211-e6edba42c586?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1480044966906-36ca6e85e11a?w=400&h=300&fit=crop&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1544533993-852356289020?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516483638261-f40452f5b98c?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df901b0c8e9?w=400&h=300&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560269490-488616d81425?w=400&h=300&fit=crop&q=80",
  ],
};

// Helper: Bestimme Kategorie aus Titel/Description
const getEventCategory = (event) => {
  const text = `${event.title || ""} ${event.description || ""} ${event.category || ""}`.toLowerCase();
  if (text.includes("music") || text.includes("concert") || text.includes("festival") && text.includes("music")) return "music";
  if (text.includes("food") || text.includes("culinary") || text.includes("restaurant") || text.includes("cuisine")) return "food";
  if (text.includes("festival") || text.includes("carnival") || text.includes("parade")) return "festival";
  if (text.includes("night") || text.includes("club") || text.includes("party") || text.includes("drink")) return "nightlife";
  return "default";
};

const getRandomImage = (event) => {
  const category = getEventCategory(event);
  const images = EVENT_IMAGES[category];
  return images[Math.abs(event.id) % images.length];
};
const getRandomRating = (id) => [4.8, 4.9, 4.7, 4.95, 4.85, 4.75, 4.92, 4.88, 4.96, 4.83][Math.abs(id) % 10];
const getRandomReviewCount = (id) => (Math.abs(id) % 200) + 10;

const EventCard = ({ event }) => {
  const rating = getRandomRating(event.id);
  const reviewCount = getRandomReviewCount(event.id);
  return (
    <div className="group relative flex h-full w-[260px] flex-col overflow-hidden rounded-xl border-0 bg-white/10 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
        <img src={getRandomImage(event)} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" onError={(e) => { e.target.src = "https://picsum.photos/400/300"; }} />
        <button className="absolute top-2 right-2 z-10 rounded-full bg-white/80 p-1.5 text-[#636367] backdrop-blur-sm hover:bg-white/90" type="button" aria-label="Add to favorites">
          <svg className="h-4 w-4 stroke-[2px] fill-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8v4a2 2 0 01-2 2h-2.586a1 1 0 00-.707.293l-4.414 4.414a1 1 0 01-1.414 0L5.293 13.293a1 1 0 00-.707-.293H2a2 2 0 01-2-2V8a2 2 0 012-2h2.586a1 1 0 00.707-.293l1.414-1.414a1 1 0 00.707-.293H18a2 2 0 012 2z" /></svg>
          <span className="sr-only">Add to favorites</span>
        </button>
        <span className="absolute top-2 left-2 rounded-md bg-[#DDC49A]/90 px-1.5 py-0.5 font-medium text-[#636367] text-xs">Original</span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h3 className="font-medium text-sm tracking-tight line-clamp-1 text-white">{event.title}</h3>
          <p className="text-[#8A9A76] text-xs tracking-tight mt-1 line-clamp-1">{event.location}</p>
        </div>
        <div className="mt-2 flex items-center gap-0.5 text-xs">
          <svg className="h-3 w-3 fill-current text-[#DDC49A]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 4 9.27l6.91-1.01L12 2z" /></svg>
          <span className="text-white">{rating.toFixed(2)}</span>
          <span className="text-[#8A9A76]">·</span>
          <span className="text-[#8A9A76]">({reviewCount})</span>
          <span className="ml-auto text-white">€ {(Math.abs(event.id) % 100) + 20} / guest</span>
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = ({ title, items }) => {
  const scrollContainer = useRef(null);
  const handleScrollLeft = () => { if (scrollContainer.current) scrollContainer.current.scrollBy({ left: -320, behavior: "smooth" }); };
  const handleScrollRight = () => { if (scrollContainer.current) scrollContainer.current.scrollBy({ left: 320, behavior: "smooth" }); };

  return (
    <div className="w-full py-4">
      <div className="mx-auto max-w-[1760px] px-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-medium text-lg tracking-tight md:text-xl text-white">{title}</h2>
          <div className="flex items-center gap-1">
            <button className="h-7 w-7 rounded-full border border-white/20 text-white hover:bg-white/10" onClick={handleScrollLeft} type="button" aria-label="Scroll left">◀</button>
            <button className="h-7 w-7 rounded-full border border-white/20 text-white hover:bg-white/10" onClick={handleScrollRight} type="button" aria-label="Scroll right">▶</button>
            <Link className="ml-1 hidden font-medium text-xs text-white hover:underline md:block" to="/#all-events">Show all</Link>
          </div>
        </div>
        <div className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2" ref={scrollContainer} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {items.map((item) => (
            <div className="w-[240px] flex-none snap-start md:w-[260px]" key={item.id}>
              <Link className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#8A9A76] focus-visible:ring-offset-2" to={`/events/${item.id}`}>
                <EventCard event={item} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);
  // Sofort die Dauer setzen (9.24s = 207206.mp4), nicht warten auf loadedmetadata
  const [videoDuration, setVideoDuration] = useState(9.24);

  // Video starten + Progress für Fade-In
  useEffect(() => {
    const video = videoRef.current;
    // Sofort Progress setzen (nicht warten auf Video-Ref!)
    setVideoProgress(0);

    if (!video) {
      // Fallback: 9.24s langsame Animation
      setVideoProgress(0); // starte von 0
      const startTime = Date.now();
      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        setVideoProgress(Math.min(elapsed / 5, 1)); // 5 Sekunden
        if (elapsed < 5) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
      return;
    }

    // Sofort starten
    video.autoplay = true;
    video.muted = true;

    // Active polling: Sync video progress every frame (not waiting for timeupdate)
    let rafId = null;
    const syncProgress = () => {
      const duration = video.duration || 9.24;
      const progress = video.currentTime / duration;
      setVideoProgress(Math.min(progress || 0, 1));
      rafId = requestAnimationFrame(syncProgress);
    };
    rafId = requestAnimationFrame(syncProgress);

    // Autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((e) => {
        console.log("Video autoplay blocked:", e);
        // Sofortiger Progress-Fallback
        const startTime = Date.now();
        const animate = () => {
          const elapsed = (Date.now() - startTime) / 1000;
          setVideoProgress(Math.min(elapsed / 9.24, 1));
          if (elapsed < 9.24) {
            requestAnimationFrame(animate);
          } else {
            setVideoProgress(1);
          }
        };
        requestAnimationFrame(animate);
      });
    }

    // playing: Video-Dauer updaten
    video.addEventListener("playing", () => {
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration);
      }
    });

    video.addEventListener("ended", () => setVideoProgress(1));
    video.addEventListener("error", () => {
      setTimeout(() => setVideoProgress(1), 5000);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener("playing", () => {});
      video.removeEventListener("ended", () => {});
      video.removeEventListener("error", () => {});
    };
  }, []);

  // Events laden
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get("/api/events");
        let eventsData = [];
        if (response.data && typeof response.data === "object") {
          if (Array.isArray(response.data.results)) eventsData = response.data.results;
          else if (Array.isArray(response.data)) eventsData = response.data;
        }
        const sortedEvents = [...eventsData].sort((a, b) => new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt));
        setEvents(sortedEvents);
      } catch (err) {
        if (err.response?.status === 404) setError("No events found.");
        else if (err.message === "Network Error") setError("Unable to connect to the server.");
        else setError("Failed to load events.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-center text-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A9A76] mx-auto mb-4"></div><p>Loading events...</p></div></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><div className="text-center p-8 bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md border border-white/10"><div className="text-4xl mb-4">⚠️</div><p className="text-[#8A9A76] mb-6">{error}</p><button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#8A9A76] text-white rounded-lg hover:bg-[#8A9A76]/90 transition-colors">Retry</button></div></div>;

  return (
    <div className="min-h-screen relative bg-gray-900">
      {/* Video Background - FIXED, fullscreen width */}
      <div className="fixed inset-0 w-screen h-screen z-0">
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          ref={videoRef}
        >
          <source src="/videos/hero-banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Layer - 5s Fade-In synchronized mit Video */}
      <div
        className="relative z-10"
        style={{
          opacity: videoProgress,
          transition: `opacity 5s linear`,
        }}
      >
        {/* Hero Text Section */}
        <div className="flex flex-col items-center justify-center text-center min-h-screen px-4 pt-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">Discover Amazing Events</h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto text-white/90 drop-shadow-lg">From music festivals to culinary experiences, find your next unforgettable adventure.</p>
          </div>
        </div>

        {/* Carousel Sections */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto">
            <ExperienceSection title="Upcoming Events ›" items={events.slice(0, 7)} />
            <ExperienceSection title="Popular Experiences ›" items={events.slice(7, 14)} />
          </div>
        </div>

        {/* Show all events grid */}
        <div id="all-events" className="max-w-7xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">All Events</h2>
          {events.length === 0 ? (
            <div className="text-center py-12"><span className="text-4xl mb-4 block">📭</span><p className="text-white/70">No events available yet.</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((event) => (
                <Link key={event.id} to={`/events/${event.id}`} className="group block bg-white/10 backdrop-blur-xl rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-white/10">
                  <div className="relative h-48 overflow-hidden">
                    <img src={getRandomImage(event)} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" onError={(e) => { e.target.src = "https://picsum.photos/400/300"; }} />
                    <span className="absolute top-2 left-2 rounded-md bg-[#DDC49A]/90 px-2 py-1 font-medium text-xs text-[#636367]">{event.category || "Event"}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-[#8A9A76] transition-colors">{event.title}</h3>
                    <p className="text-white/70 text-sm line-clamp-2 mb-3">{event.description || "No description available"}</p>
                    {event.location && (<p className="text-[#8A9A76] text-xs flex items-center">📍 {event.location}</p>)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="h-20"></div>
      </div>

      {/* Video Fade-Out (Last 2 Seconds) */}
      <div
        className="fixed inset-0 z-5 pointer-events-none"
        style={{
          opacity: Math.max(0, (videoProgress - 0.78) * 4.5), // Fade out from 78% to 100% progress
          transition: `opacity 0.1s linear`,
          background: 'black',
        }}
      />
    </div>
  );
}
