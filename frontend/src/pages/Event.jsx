import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getEvent, deleteEvent } from "../services/api";

export default function Event() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvent(id)
      .then((data) => setEvent(data))
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!event) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="mt-12 mb-20 w-fit text-center scale-400 text-background text-[clamp(.5rem,4vw,1rem)] font-['Impact'] [-webkit-text-stroke:.4px_theme(--color-surface)] hover:text-red-200/60 hover:scale-408 transition-all duration-1000 ease-in-out cursor-default">
        {event.title}
      </h1>
      <div className="flex flex-col items-center mt-8 max-h-9/10 max-w-9/10 h-500 w-200 h-auto bg-background border-8 border-surface shadow-xl">
        <div className="flex justify-between my-4 pb-2 w-full border-b-2 border-surface divide-x divide-surface">
          <div className="mx-1 w-1/2 text-center">
            <p className="text-center underline">Where:</p>
            <p>{event.location}</p>
          </div>
          <div className="mx-1 w-1/2 text-center">
            <p className="text-center underline">When:</p>
            <p>{new Date(event.date).toLocaleString()}</p>
          </div>
        </div>
        <p className="m-4 max-h-9/10 h-40 w-6/10 font-serif">
          {event.description}
        </p>
      </div>
      <button
        onClick={() => {
          deleteEvent(event.id);
          navigate("/");
        }}
        className="mt-8 py-2 px-4 bg-surface w-fit rounded-[100px] hover:bg-red-400 transition-all duration-600 ease-in-out cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
