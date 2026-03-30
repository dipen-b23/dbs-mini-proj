import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl" />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-xl" />

      <div className="relative z-10">

        <div className="relative h-44 overflow-hidden">
          <img src={event.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <span className="absolute top-3 right-3 px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">
            {event.category}
          </span>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-2">{event.name}</h3>

          <p className="text-slate-300 text-sm mb-4">
            {event.venue}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">${event.price}</span>

            <Link
              to={`/events/${event.id}`}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm transition hover:scale-[1.02]"
            >
              View
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventCard;
