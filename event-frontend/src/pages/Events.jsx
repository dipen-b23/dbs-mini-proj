import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Upcoming Events</h1>
          <p className="text-slate-400 mt-1">Discover workshops, conferences, and meetups</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm border border-white/10 hover:border-indigo-500 transition-all">All</button>
          <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-xl text-sm border border-white/10 hover:border-indigo-500 transition-all">Technology</button>
          <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-xl text-sm border border-white/10 hover:border-indigo-500 transition-all">Business</button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1,2,3].map(i => <div key={i} className="bg-slate-800 h-72 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;