import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getAdminStats, 
  getAdminEvents, 
  getAdminRegistrations, 
  getAdminPayments, 
  getAdminFeedback, 
  getAdminAttendance,
  getUsers,
  addUser,
  addEvent
} from '../services/api';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state for adding user
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', roleId: 3 });
  const [addingUser, setAddingUser] = useState(false);

  // Form state for adding event
  const [newEvent, setNewEvent] = useState({ 
    eventName: '', 
    description: '', 
    eventDate: '', 
    venueId: 1,
    categoryId: 1
  });
  const [addingEvent, setAddingEvent] = useState(false);

  useEffect(() => {
    if (user?.USER_ID) {
      fetchAllData();
    }
  }, [user?.USER_ID]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const userId = user.USER_ID;
      const [statsRes, usersRes, eventsRes, regsRes, paymentsRes, feedbackRes, attendanceRes] = await Promise.all([
        getAdminStats(userId),
        getUsers(),
        getAdminEvents(userId),
        getAdminRegistrations(userId),
        getAdminPayments(userId),
        getAdminFeedback(userId),
        getAdminAttendance(userId)
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data);
      setEvents(eventsRes.data);
      setRegistrations(regsRes.data);
      setPayments(paymentsRes.data);
      setFeedback(feedbackRes.data);
      setAttendance(attendanceRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      alert('Failed to fetch admin data. Make sure you are logged in as an admin.');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, color }) => (
    <div className={`bg-${color}-900/20 border border-${color}-500/30 rounded-xl p-6`}>
      <p className="text-slate-400 text-sm mb-2">{title}</p>
      <p className={`text-3xl font-bold text-${color}-400`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert('Please fill all fields');
      return;
    }

    setAddingUser(true);
    try {
      const result = await addUser({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        roleId: parseInt(newUser.roleId)
      });
      
      alert(`User added successfully! ID: ${result.data.userId}`);
      setNewUser({ name: '', email: '', password: '', roleId: 3 });
      fetchAllData(); // Refresh users list
    } catch (error) {
      alert(`Failed to add user: ${error.response?.data?.error || error.message}`);
    } finally {
      setAddingUser(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.eventName || !newEvent.eventDate || !newEvent.venueId || !newEvent.categoryId) {
      alert('Please fill all required fields');
      return;
    }

    setAddingEvent(true);
    try {
      const result = await addEvent(user.USER_ID, {
        eventName: newEvent.eventName,
        description: newEvent.description,
        eventDate: newEvent.eventDate,
        venueId: parseInt(newEvent.venueId),
        categoryId: parseInt(newEvent.categoryId)
      });
      
      alert(`Event created successfully! ID: ${result.data.eventId}`);
      setNewEvent({ eventName: '', description: '', eventDate: '', venueId: 1, categoryId: 1 });
      fetchAllData(); // Refresh events list
    } catch (error) {
      alert(`Failed to create event: ${error.response?.data?.error || error.message}`);
    } finally {
      setAddingEvent(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">Manage events, registrations, and track analytics</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        {['dashboard', 'users', 'events', 'registrations', 'payments', 'feedback', 'attendance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading admin data...</div>
      ) : (
        <>
          {/* Dashboard Stats */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats.totalUsers} color="blue" />
                <StatCard title="Total Events" value={stats.totalEvents} color="purple" />
                <StatCard title="Total Registrations" value={stats.totalRegistrations} color="green" />
                <StatCard title="Total Revenue" value={`₹${stats.totalRevenue?.toLocaleString()}`} color="amber" />
              </div>

              <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Activity Summary</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Latest Registrations</p>
                    <div className="space-y-2">
                      {registrations.slice(0, 3).map((reg, i) => (
                        <div key={i} className="bg-slate-700/50 p-3 rounded-lg text-sm">
                          <p className="text-white font-semibold">{reg.USER_NAME}</p>
                          <p className="text-slate-400">{reg.EVENT_NAME}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Latest Payments</p>
                    <div className="space-y-2">
                      {payments.slice(0, 3).map((payment, i) => (
                        <div key={i} className="bg-slate-700/50 p-3 rounded-lg text-sm">
                          <p className="text-white font-semibold">₹{payment.AMOUNT}</p>
                          <p className="text-slate-400">{payment.PAYMENT_STATUS}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Add User Form */}
              <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Add New User</h2>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="bg-slate-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-400"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="bg-slate-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-400"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="bg-slate-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-400"
                    />
                    <select
                      value={newUser.roleId}
                      onChange={(e) => setNewUser({ ...newUser, roleId: e.target.value })}
                      className="bg-slate-700 border border-white/10 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="1">Admin</option>
                      <option value="2">Organizer</option>
                      <option value="3">Student</option>
                      <option value="4">Volunteer</option>
                      <option value="5">Faculty</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={addingUser}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                  >
                    {addingUser ? 'Adding...' : 'Add User'}
                  </button>
                </form>
              </div>

              {/* Users List Table */}
              <div className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-900/50 border-b border-white/10">
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">ID</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Role ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-slate-700/50 transition">
                          <td className="px-4 py-3 text-white font-semibold">{user.USER_ID}</td>
                          <td className="px-4 py-3 text-white">{user.NAME}</td>
                          <td className="px-4 py-3 text-slate-300">{user.EMAIL}</td>
                          <td className="px-4 py-3 text-slate-400">{user.ROLE_ID}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'events' && (
            <div className="space-y-6">
              {/* Add Event Form */}
              <div className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Create New Event</h2>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Event Name"
                      value={newEvent.eventName}
                      onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
                      className="bg-slate-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-400"
                    />
                    <input
                      type="date"
                      placeholder="Event Date"
                      value={newEvent.eventDate}
                      onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                      className="bg-slate-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-400"
                    />
                    <select
                      value={newEvent.venueId}
                      onChange={(e) => setNewEvent({ ...newEvent, venueId: e.target.value })}
                      className="bg-slate-700 border border-white/10 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="1">Auditorium A</option>
                      <option value="2">Seminar Hall B</option>
                      <option value="3">Conference Room C</option>
                      <option value="4">Multipurpose Hall D</option>
                      <option value="5">Open Air Amphitheater</option>
                    </select>
                    <select
                      value={newEvent.categoryId}
                      onChange={(e) => setNewEvent({ ...newEvent, categoryId: e.target.value })}
                      className="bg-slate-700 border border-white/10 rounded-lg px-4 py-2 text-white"
                    >
                      <option value="1">Workshop</option>
                      <option value="2">Seminar</option>
                      <option value="3">Hackathon</option>
                      <option value="4">Cultural Event</option>
                      <option value="5">Sports</option>
                      <option value="6">Competition</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Description (optional)"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full bg-slate-700 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-400"
                    rows="3"
                  />
                  <button
                    type="submit"
                    disabled={addingEvent}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                  >
                    {addingEvent ? 'Creating...' : 'Create Event'}
                  </button>
                </form>
              </div>

              {/* Events List Table */}
              <div className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-900/50 border-b border-white/10">
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Event Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Category</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Organizer</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Date</th>
                        <th className="px-4 py-3 text-left font-semibold text-slate-300">Registrations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-slate-700/50 transition">
                          <td className="px-4 py-3 text-white font-semibold">{event.EVENT_NAME}</td>
                          <td className="px-4 py-3 text-slate-300">{event.CATEGORY_NAME || 'N/A'}</td>
                          <td className="px-4 py-3 text-slate-400">{event.ORGANIZER_NAME || 'N/A'}</td>
                          <td className="px-4 py-3 text-slate-400">
                            {new Date(event.EVENT_DATE).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-indigo-400 font-semibold">{event.TOTAL_REGISTRATIONS || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Registrations Table */}
          {activeTab === 'registrations' && (
            <div className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-900/50 border-b border-white/10">
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">User</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Event</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Ticket</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Payment</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-slate-700/50 transition">
                        <td className="px-4 py-3 text-white font-semibold">{reg.USER_NAME}</td>
                        <td className="px-4 py-3 text-slate-300">{reg.EVENT_NAME}</td>
                        <td className="px-4 py-3 text-slate-400">{reg.TICKET_NAME}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            reg.REGISTRATION_STATUS === 'Confirmed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {reg.REGISTRATION_STATUS}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            reg.PAYMENT_STATUS === 'Completed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {reg.PAYMENT_STATUS || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          {new Date(reg.REGISTRATION_DATE).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payments Table */}
          {activeTab === 'payments' && (
            <div className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-900/50 border-b border-white/10">
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">User</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Event</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Amount</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Method</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-slate-700/50 transition">
                        <td className="px-4 py-3 text-white font-semibold">{payment.USER_NAME}</td>
                        <td className="px-4 py-3 text-slate-300">{payment.EVENT_NAME}</td>
                        <td className="px-4 py-3 text-indigo-400 font-semibold">₹{payment.AMOUNT}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            payment.PAYMENT_STATUS === 'Completed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {payment.PAYMENT_STATUS}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">{payment.PAYMENT_METHOD || 'N/A'}</td>
                        <td className="px-4 py-3 text-slate-400">
                          {payment.PAYMENT_DATE ? new Date(payment.PAYMENT_DATE).toLocaleDateString() : 'Pending'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Feedback Table */}
          {activeTab === 'feedback' && (
            <div className="space-y-4">
              {feedback.length > 0 ? (
                feedback.map((fb, i) => (
                  <div key={i} className="bg-slate-800/50 border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-white font-semibold">{fb.USER_NAME}</p>
                        <p className="text-slate-400 text-sm">{fb.EVENT_NAME}</p>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i <= fb.RATING ? 'text-yellow-400' : 'text-slate-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-300">{fb.COMMENTS}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-8">No feedback yet</p>
              )}
            </div>
          )}

          {/* Attendance Table */}
          {activeTab === 'attendance' && (
            <div className="bg-slate-800/50 border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-900/50 border-b border-white/10">
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">User</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Event</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Session</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((att, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-slate-700/50 transition">
                        <td className="px-4 py-3 text-white font-semibold">{att.USER_NAME}</td>
                        <td className="px-4 py-3 text-slate-300">{att.EVENT_NAME}</td>
                        <td className="px-4 py-3 text-slate-400 max-w-xs truncate">{att.SESSION_NAME}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            att.ATTENDANCE_STATUS === 'Present' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {att.ATTENDANCE_STATUS}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
