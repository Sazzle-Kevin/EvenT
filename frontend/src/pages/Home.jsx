import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.results);
      });
  }, []);

  {
    events.map((event) => {
      <p key={event.key}>{event.title}</p>;
    });
  }
}
