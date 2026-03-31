import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { processPayment } from '../services/api';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const data = location.state;
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [message, setMessage] = useState('');

  if (!data || !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white pt-24">
        <div className="text-center">
          <p className="text-lg mb-4">No payment information found</p>
          <a href="/events" className="text-indigo-400 hover:text-indigo-300">Back to Events</a>
        </div>
      </div>
    );
  }

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
      setMessage('❌ Please fill all payment fields');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const response = await processPayment(
        data.registrationId,
        data.amount,
        'Card'
      );

      if (response.data.success) {
        setMessage('✅ Payment successful! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setMessage('❌ Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-black pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
        <p className="text-slate-400 mb-8">Complete your registration and payment</p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <form onSubmit={handlePayment} className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={cardData.cardName}
                  onChange={handleCardChange}
                  placeholder={user.NAME}
                  className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleCardChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardData.expiryDate}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardData.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    maxLength="3"
                    className="w-full px-4 py-2 bg-slate-900 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.includes('✅') 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Pay $${data.amount}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 sticky top-28">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-slate-400 text-sm">Event</p>
                  <p className="text-white font-medium">{data.eventName}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Ticket Type</p>
                  <p className="text-white font-medium">{data.ticketName}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-slate-300 text-sm">
                  <span>Subtotal</span>
                  <span>${data.amount}</span>
                </div>
                <div className="flex justify-between text-slate-300 text-sm">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-white/10 pt-2 mt-2 flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>${data.amount}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                <p className="text-xs text-indigo-300">
                  ✓ Your registration is confirmed. Please complete payment to finalize.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;
