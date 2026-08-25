import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getEvent } from "../services/api";

export default function Event() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvent(id)
      .then((data) => {
        setEvent(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>{event.title}</h1>

      <p>{event.description}</p>

      <p>{event.location}</p>

      <p>{new Date(event.date).toLocaleString()}</p>
    </main>
  );
}
