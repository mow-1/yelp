import React, { useContext, useState } from 'react';
import { CartContext } from '../CartProvider';
import { Calendar, CreditCard, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScheduleOrder = () => {
  const { cartItems, getTotalPrice, clearCart, user, setRewardPoints } = useContext(CartContext);
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const total = getTotalPrice();
  const firstMonthPrice = total;
  const recurringPrice = total * 0.92; // 8% discount for recurring orders
  const savings = total - recurringPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'card') {
      // Redirect to Paymob for card payments
      window.location.href = 'https://paymob.com/checkout';
      return;
    }

    // For cash on delivery, simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Award points for the first payment
    const earnedPoints = Math.floor(total * 0.02);
    setRewardPoints(prev => prev + earnedPoints);

    setOrderComplete(true);
    setIsProcessing(false);

    // Clear cart after successful order
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Scheduled Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your subscription has been activated. You'll receive your first order soon and recurring orders will be delivered automatically.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>Next delivery:</strong> {billingCycle === 'monthly' ? 'Next month' : 'Next year'}
            </p>
            <p className="text-sm text-blue-800">
              <strong>Recurring price:</strong> {recurringPrice.toFixed(2)} EGP (8% discount applied)
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

    return (
      <div className="min-h-screen py-8 px-4" style={{
        backgroundImage: `url(${require('../assets/Mr.Yelp_Brand_assets[1]_7.jpg')})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '420px 420px'
      }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 brand-text-gradient">⏰ Schedule Your Order ⏰</h1>
          <p className="text-gray-600 text-lg">Set up automatic delivery and save 8% on recurring orders! 💰</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-red-500 font-semibold">{item.price} EGP</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{total.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>First Month:</span>
                  <span>{firstMonthPrice.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>Recurring Price:</span>
                  <span>{recurringPrice.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Monthly Savings:</span>
                  <span>{savings.toFixed(2)} EGP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Setup */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Subscription Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Billing Cycle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Billing Cycle</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    billingCycle === 'monthly' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="billingCycle"
                      value="monthly"
                      checked={billingCycle === 'monthly'}
                      onChange={(e) => setBillingCycle(e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-medium">Monthly</div>
                      <div className="text-sm text-gray-600">Every month</div>
                    </div>
                  </label>
                  
                  <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    billingCycle === 'annually' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="billingCycle"
                      value="annually"
                      checked={billingCycle === 'annually'}
                      onChange={(e) => setBillingCycle(e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-medium">Annually</div>
                      <div className="text-sm text-gray-600">Every year</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'card' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <CreditCard className="w-6 h-6 mr-3" />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">Secure payment via Paymob</div>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === 'cod' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <Truck className="w-6 h-6 mr-3" />
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive your order</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Subscription Benefits:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 8% discount on all recurring orders</li>
                  <li>• Automatic delivery scheduling</li>
                  <li>• Earn points on every payment</li>
                  <li>• Cancel anytime</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Start Subscription - ${firstMonthPrice.toFixed(2)} EGP`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleOrder;
