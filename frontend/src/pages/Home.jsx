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
    <main>
      <h1>Events</h1>

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </main>
  );
}
