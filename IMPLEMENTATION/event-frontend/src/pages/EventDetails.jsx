import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEventById, registerForEvent } from '../services/api';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await getEventById(id);
        setEvent(response.data);
        // Set default ticket if available
        if (response.data.tickets && response.data.tickets.length > 0) {
          setSelectedTicket(response.data.tickets[0].TICKET_ID);
        }
      } catch (err) {
        console.error(err);
        setMessage('Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, user, navigate]);

  const handleRegister = async () => {
    if (!selectedTicket) {
      setMessage('Please select a ticket type');
      return;
    }

    setRegistering(true);
    try {
      const response = await registerForEvent(event.EVENT_ID, user.USER_ID, selectedTicket);
      if (response.data.success) {
        setMessage('✅ Successfully registered! Proceeding to payment...');
        // Get the ticket price
        const selectedTicketData = event.tickets.find(t => t.TICKET_ID === selectedTicket);
        
        setTimeout(() => {
          navigate('/payment', {
            state: {
              registrationId: response.data.registrationId,
              eventName: event.EVENT_NAME,
              ticketName: selectedTicketData?.TICKET_NAME,
              amount: selectedTicketData?.PRICE || 0,
              eventId: event.EVENT_ID
            }
          });
        }, 1500);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('❌ Failed to register. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  if (!event) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Event not found</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-7xl mx-auto">
          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30 mb-3">
            Event Registration
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{event.EVENT_NAME}</h1>
          <div className="flex flex-wrap gap-4 text-slate-300 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {new Date(event.EVENT_DATE).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Event Details</h2>
            <p className="text-slate-300 leading-relaxed">
              {event.DESCRIPTION || 'This is an exciting event. Register now to secure your spot!'}
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <p><strong>Venue:</strong> {event.VENUE_NAME} ({event.BUILDING})</p>
              <p><strong>Capacity:</strong> {event.CAPACITY} seats</p>
              <p><strong>Organizer:</strong> {event.ORGANIZER_NAME}</p>
              <p><strong>Category:</strong> {event.CATEGORY_NAME}</p>
              <p><strong>Registrations:</strong> {event.TOTAL_REGISTRATIONS} attendees</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Ticket Types</h2>
            <div className="space-y-3">
              {event.tickets && event.tickets.length > 0 ? (
                event.tickets.map((ticket, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-pointer border border-white/5 hover:border-indigo-500/30">
                    <input 
                      type="radio" 
                      name="ticket" 
                      value={ticket.TICKET_ID}
                      checked={selectedTicket === ticket.TICKET_ID}
                      onChange={(e) => setSelectedTicket(parseInt(e.target.value))}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-white">{ticket.TICKET_NAME}</p>
                      <p className="text-sm text-slate-400">${ticket.PRICE} ({ticket.QUANTITY_AVAILABLE} available)</p>
                    </div>
                  </label>
                ))
              ) : (
                <p className="text-slate-400">No ticket types available</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-slate-800 rounded-2xl p-6 border border-white/5 shadow-xl">
            <div className="mb-6">
              <p className="text-sm text-slate-400 mb-1">Price</p>
              <div className="text-3xl font-bold text-indigo-400">
                ${selectedTicket && event.tickets ? event.tickets.find(t => t.TICKET_ID === selectedTicket)?.PRICE || '0' : '0'}
              </div>
            </div>

            <button 
              onClick={handleRegister}
              disabled={registering || !selectedTicket}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:scale-[1.02] mb-4"
            >
              {registering ? 'Registering...' : 'Register Now'}
            </button>

            {message && (
              <div className={`text-center text-sm p-3 rounded-lg ${
                message.includes('✅') 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-red-500/20 text-red-300'
              }`}>
                {message}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-400">
                <strong>Logged in as:</strong> {user.NAME}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;