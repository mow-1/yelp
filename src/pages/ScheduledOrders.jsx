import React, { useContext, useState } from 'react';
import { CartContext } from '../CartProvider';
import { Calendar, CreditCard, Truck, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScheduledOrders = () => {
  const { user, scheduledOrders, setScheduledOrders } = useContext(CartContext);
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  // Sample scheduled orders data (in real app, this would come from backend)
  const [localScheduledOrders, setLocalScheduledOrders] = useState([
    {
      id: 1,
      orderNumber: 'MRY-SUB-001',
      total: 850.00,
      recurringPrice: 782.00,
      billingCycle: 'monthly',
      paymentMethod: 'card',
      nextDelivery: '2024-02-15',
      status: 'active',
      items: [
        { name: 'Premium Dog Food - Chicken & Rice 15kg', quantity: 1, price: 850 }
      ],
      startDate: '2024-01-15'
    },
    {
      id: 2,
      orderNumber: 'MRY-SUB-002',
      total: 1200.00,
      recurringPrice: 1104.00,
      billingCycle: 'monthly',
      paymentMethod: 'cod',
      nextDelivery: '2024-02-20',
      status: 'active',
      items: [
        { name: 'Cat Litter - Premium 20kg', quantity: 2, price: 600 },
        { name: 'Wet Cat Food - Mixed Pack', quantity: 1, price: 600 }
      ],
      startDate: '2024-01-20'
    }
  ]);

  const handleCancelOrder = (orderId) => {
    setOrderToCancel(orderId);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = () => {
    setLocalScheduledOrders(prev => 
      prev.map(order => 
        order.id === orderToCancel 
          ? { ...order, status: 'cancelled' }
          : order
      )
    );
    setShowCancelModal(false);
    setOrderToCancel(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />;
      case 'cancelled': return <X size={16} />;
      case 'paused': return <AlertCircle size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be signed in to view your scheduled orders.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const activeOrders = localScheduledOrders.filter(order => order.status === 'active');
  const cancelledOrders = localScheduledOrders.filter(order => order.status === 'cancelled');

    return (
      <div className="min-h-screen py-8 px-4" style={{
        backgroundImage: `url(${require('../assets/Mr.Yelp_Brand_assets[1]_7.jpg')})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '420px 420px'
      }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 brand-text-gradient">📅 Scheduled Orders 📅</h1>
          <p className="text-gray-600 text-lg">Manage your subscription orders and delivery schedule! 🚚</p>
        </div>

        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Active Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">#{order.orderNumber}</span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-red-500 font-semibold">{item.price} EGP</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Billing Cycle:</span>
                      <span className="font-medium capitalize">{order.billingCycle}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Payment Method:</span>
                      <div className="flex items-center gap-1">
                        {order.paymentMethod === 'card' ? <CreditCard size={16} /> : <Truck size={16} />}
                        <span className="font-medium capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Next Delivery:</span>
                      <span className="font-medium">{new Date(order.nextDelivery).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Recurring Price:</span>
                      <span className="font-bold text-green-600">{order.recurringPrice.toFixed(2)} EGP</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  >
                    Cancel Subscription
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cancelled Orders */}
        {cancelledOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Cancelled Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cancelledOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 opacity-75">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">#{order.orderNumber}</span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-red-500 font-semibold">{item.price} EGP</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Started:</span>
                      <span className="font-medium">{new Date(order.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Original Price:</span>
                      <span className="font-bold text-gray-600">{order.total.toFixed(2)} EGP</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Orders */}
        {localScheduledOrders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Scheduled Orders</h2>
            <p className="text-gray-600 mb-6">
              You don't have any active subscriptions. Start a subscription to enjoy automatic delivery and savings!
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Cancel Subscription</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to cancel this subscription? You will lose the 8% discount on future orders and automatic delivery will stop.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={confirmCancelOrder}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledOrders;
