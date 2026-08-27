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
    <div className="flex flex-col items-center">
      <h2 className="mt-12 mb-20 w-fit text-center scale-400 text-background text-[clamp(.5rem,4vw,1rem)] font-['Impact'] [-webkit-text-stroke:.4px_theme(--color-surface)] hover:text-yellow-200/90 hover:scale-408 transition-all duration-1000 ease-in-out cursor-default">
        Your Event
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-2 h-auto max-w-9/10 w-140 border-surface border-2"
      >
        <div className="w-full">
          <div className="flex justify-between items-center my-4 ">
            <div className="w-1/2">
              <label for="title" className="w-fit cursor-pointer">
                Title:{" "}
              </label>
            </div>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Title"
              className="p-2 pl-4 w-1/2 bg-surface"
            />
          </div>
          <div className="flex justify-between items-center my-4 ">
            <div className="w-1/2">
              <label for="description" className="w-fit cursor-pointer">
                Description:{" "}
              </label>
            </div>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description"
              className="p-2 pl-4 w-1/2 bg-surface"
            />
          </div>
          <div className="flex justify-between items-center my-4 ">
            <div className="w-1/2 ">
              <label for="date" className="w-fit cursor-pointer cursor-pointer">
                Date:{" "}
              </label>
            </div>
            <input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="p-2 pl-4 w-1/2 bg-surface"
            />
          </div>
          <div className="flex justify-between items-center my-4 ">
            <div className="w-1/2">
              <label for="location" className="w-fit cursor-pointer">
                Location:{" "}
              </label>
            </div>
            <input
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Location"
              className="p-2 pl-4 w-1/2 bg-surface"
            />
          </div>
        </div>
        <button
          disabled={loading}
          className="mt-8 py-2 px-4 bg-surface w-fit rounded-[100px] hover:bg-yellow-200 hover:text-black transition-all duration-600 ease-in-out cursor-pointer"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
        {error && <p className="mt-6 text-red-300">{error}</p>}
      </form>
    </div>
  );
}
