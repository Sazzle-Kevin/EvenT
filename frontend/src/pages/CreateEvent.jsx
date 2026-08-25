import { useState } from "react";
import { useNavigate } from "react-router";
import { createEvent } from "../services/api";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await createEvent({
        title,
        description,
        date,
        location,
        latitude: Number(latitude),
        longitude: Number(longitude),
      });

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
      />

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
      />

      <input
        type="datetime-local"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Location"
      />

      <button disabled={loading}>
        {loading ? "Creating..." : "Create Event"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}
