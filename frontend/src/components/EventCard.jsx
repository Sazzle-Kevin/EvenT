import { useNavigate } from "react-router";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/events/${event.id}`)}
      className="mx-4 my-8"
    >
      <h2 className="my-2 text-center text-yellow-100">{event.title}</h2>

      <p>{new Date(event.date).toLocaleString()}</p>

      <p>{event.location}</p>

      <p>{event.description}</p>
    </article>
  );
}
