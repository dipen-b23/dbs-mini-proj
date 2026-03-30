import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserRegistrations } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login', { replace: true });
      return;
    }
    
    fetchRegistrations();
  }, [user, navigate]);

  const fetchRegistrations = async () => {
    if (!user) return;
    try {
      const response = await getUserRegistrations(user.USER_ID);
      setRegistrations(response.data);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  // If user is not loaded yet, show nothing (will redirect)
  if (!user) {
    return null;
  }

  const actions = [
    { title: "Browse Events", link: "/events" },
    { title: "My Registrations", link: "/events" },
    { title: "Leave Feedback", link: "/feedback" }
  ];

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-white mb-8">
        Welcome, {user.NAME}
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {actions.map((item, i) => (
          <Link key={i} to={item.link} className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-xl" />
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-white mb-2">{item.title}</h2>
              <p className="text-slate-300 text-sm">Explore feature</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Your Registrations */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Your Event Registrations</h2>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {[1,2,3].map(i => <div key={i} className="bg-slate-800 h-24 rounded-xl" />)}
          </div>
        ) : registrations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {registrations.map((reg, i) => (
              <div key={i} className="bg-slate-800/50 border border-white/10 rounded-xl p-4 hover:border-indigo-500/50 transition">
                <p className="text-white font-semibold">{reg.EVENT_NAME}</p>
                <p className="text-slate-400 text-sm">{new Date(reg.EVENT_DATE).toLocaleDateString()}</p>
                <p className="text-indigo-400 text-xs mt-2">Ticket: {reg.TICKET_NAME}</p>
                <span className={`inline-block mt-3 px-2 py-1 rounded text-xs font-semibold ${
                  reg.REGISTRATION_STATUS === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {reg.REGISTRATION_STATUS}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No registrations yet. <Link to="/events" className="text-indigo-400 hover:text-indigo-300">Browse events</Link></p>
        )}
      </div>

    </div>
  );
};

export default Dashboard;