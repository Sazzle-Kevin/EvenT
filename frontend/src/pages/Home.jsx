import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvents()
      .then((data) => {
        const sorted = data.results.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );

        setEvents(sorted);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="flex flex-col items-center">
      <h2 className="mt-12 mb-20 w-fit text-center scale-400 text-background text-[clamp(.5rem,4vw,1rem)] font-['Impact'] [-webkit-text-stroke:.4px_theme(--color-surface)] hover:text-purple-200/90 hover:scale-408 transition-all duration-1000 ease-in-out cursor-default">
        Even<strong>T</strong>s
      </h2>

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </main>
  );
}
