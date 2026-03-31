import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserAttendance } from '../services/api';

const Attendance = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    
    fetchAttendance();
  }, [user, navigate]);

  const fetchAttendance = async () => {
    if (!user) return;
    try {
      const response = await getUserAttendance(user.USER_ID);
      setAttendance(response.data);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">My Attendance</h1>
        <p className="text-slate-400">Track your attendance across registered events</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="bg-slate-800 h-48 rounded-xl" />)}
        </div>
      ) : attendance.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendance.map((record, i) => (
            <div key={i} className="bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm">Event</p>
                  <p className="text-white font-bold text-lg">{record.EVENT_NAME}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                  record.ATTENDANCE_STATUS === 'Present'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {record.ATTENDANCE_STATUS}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-slate-400 text-xs">Session</p>
                  <p className="text-slate-300 text-sm">{record.SESSION_NAME}</p>
                </div>

                {record.START_TIME && (
                  <div>
                    <p className="text-slate-400 text-xs">Session Time</p>
                    <p className="text-slate-300 text-sm">
                      {new Date(record.START_TIME).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })} - {new Date(record.END_TIME).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-white/10 rounded-xl p-12 text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-400 text-lg mb-2">No Attendance Records</p>
          <p className="text-slate-500">You haven't registered for any events yet or attendance hasn't been marked.</p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
