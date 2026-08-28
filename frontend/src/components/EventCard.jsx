import { useNavigate } from "react-router";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/events/${event.id}`)}
      className="flex flex-col items-center mx-4 my-8 max-w-9/10 w-120 bg-yellow-200 text-black border-orange-300 border-2 shadow-xl shadow-[inset_0_0_4px_black] hover:text-text hover:shadow-[0_0_15px_theme(colors.purple.200)] hover:border-2 hover:border-purple-300 hover:bg-purple-600 hover:scale-101 rounded-[100px] hover:rounded-md overflow-hidden transition-all duration-600 ease-out cursor-pointer group"
    >
      <div className="flex justify-center items-center h-20 w-full border-gray-700 border-b-2 shadow-[inset_0_0_32px_orange]">
        <h2 className="w-6/10 text-2xl text-center ">{event.title}</h2>
      </div>
      <div className="w-full text-text  bg-gray-900/70">
        <div className="flex justify-around px-4 pt-2 pb-2 h-full w-full border-b-1 divide-x">
          <div className="mx-1 w-1/2 text-center">
            <p className="text-center underline">When:</p>
            <p className="w-9/10 truncate">
              {new Date(event.date).toLocaleString()}
            </p>
          </div>
          <div className="mx-1 w-1/2 text-center">
            <p className="text-center underline">Where:</p>
            <p>{event.location}</p>
          </div>
        </div>
        <div className="max-h-0 flex justify-center h-19 w-full mt-6 mb-2 font-serif group-hover:max-h-20 overflow-hidden transition-all duration-600 ease-out">
          <p className="w-7/10 line-clamp-[3]">{event.description}</p>
        </div>
      </div>
    </article>
  );
}
