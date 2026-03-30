import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserRegistrations, submitFeedback } from '../services/api';

const Feedback = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchRegistrations();
  }, [user, navigate]);

  const fetchRegistrations = async () => {
    try {
      const response = await getUserRegistrations(user.USER_ID);
      setRegistrations(response.data);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
      setMessage('Failed to load your registered events');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedEvent) {
      setMessage('Please select an event');
      return;
    }
    if (!rating) {
      setMessage('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      const response = await submitFeedback(selectedEvent.REGISTRATION_ID, rating, comment);
      if (response.data.success) {
        setSubmitted(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.error('Feedback error:', error);
      setMessage('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 pt-24">
        <div className="bg-slate-800 p-10 rounded-2xl text-center border border-white/5 max-w-md">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
          <p className="text-slate-400">Your feedback helps us improve our events. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Event Feedback</h1>
        <p className="text-slate-400 mb-8">Share your experience with events you attended</p>

        {loading ? (
          <div className="bg-slate-800 rounded-2xl p-6 border border-white/5 animate-pulse">
            <div className="h-12 bg-slate-700 rounded-lg mb-4" />
          </div>
        ) : registrations.length === 0 ? (
          <div className="bg-slate-800 rounded-2xl p-6 border border-white/5 text-center">
            <p className="text-slate-400 mb-4">You haven't registered for any events yet.</p>
            <a href="/events" className="text-indigo-400 hover:text-indigo-300">Browse events →</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-800 rounded-2xl p-6 border border-white/5 space-y-6">
            {/* Event Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Select Event</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {registrations.map((reg) => (
                  <label key={reg.REGISTRATION_ID} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-pointer border border-white/5 hover:border-indigo-500/30">
                    <input 
                      type="radio" 
                      name="event" 
                      value={reg.REGISTRATION_ID}
                      checked={selectedEvent?.REGISTRATION_ID === reg.REGISTRATION_ID}
                      onChange={() => setSelectedEvent(reg)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-white">{reg.EVENT_NAME}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(reg.EVENT_DATE).toLocaleDateString()} • {reg.TICKET_NAME}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Star Rating */}
            {selectedEvent && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">How was your experience?</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-slate-900 border border-white/10 hover:border-indigo-500/50"
                      >
                        <svg 
                          className={`w-6 h-6 transition-colors ${star <= rating ? 'text-yellow-400' : 'text-slate-600'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Additional Comments</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    placeholder="What did you enjoy? What can we improve?"
                  />
                </div>

                {message && (
                  <div className={`text-sm p-3 rounded-lg ${
                    message.includes('Failed') 
                      ? 'bg-red-500/20 text-red-300' 
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300"
                >
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;

