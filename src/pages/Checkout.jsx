import React, { useContext, useState } from 'react';
import { CartContext } from '../CartProvider';
import { CreditCard, Truck, Shield, Lock, CheckCircle, MapPin, User, Phone, Home } from 'lucide-react';

const Checkout = ({ selectedLocation }) => {
  const { cartItems, getTotalPrice, awardPointsForTotal, clearCart, user, rewardPoints } = useContext(CartContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    deliveryType: 'local', // 'local' or 'nationwide'
    paymentMethod: 'cash',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    usePoints: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const total = getTotalPrice();
  
  // New delivery fee logic based on selected location
  const getDeliveryFee = () => {
    if (total >= 400) return 0; // Free delivery for orders 400 EGP or more
    
    // Use selected location to determine delivery fee
    if (selectedLocation) {
      if (selectedLocation === 'All over Egypt') {
        return 100; // Nationwide delivery
      } else {
        return 40; // Local delivery (Madinaty, New Cairo, 3rd Branch)
      }
    }
    
    // Fallback to form selection if no location is selected
    return formData.deliveryType === 'local' ? 40 : 100;
  };
  
  const deliveryFee = getDeliveryFee();
  const subtotal = total + deliveryFee;
  
  // Points redemption logic
  const availablePoints = user ? rewardPoints : 0;
  const pointsToUse = formData.usePoints ? Math.min(availablePoints, subtotal) : 0;
  const finalTotal = subtotal - pointsToUse;

  const steps = [
    { id: 1, title: 'Information', icon: User },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: CheckCircle }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    if (formData.paymentMethod === 'card') {
      // Redirect to Paymob for card payments
      // This will be implemented later with actual Paymob integration
      window.location.href = 'https://paymob.com/checkout'; // Temporary redirect
      return;
    }
    
    // For cash on delivery, simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Only award points after successful payment
    const earnedPoints = awardPointsForTotal(total);
    setOrderNumber(`MRY-${Date.now()}`);
    setOrderComplete(true);
    setIsProcessing(false);
    
    // Clear cart after successful order
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-blue-900 font-semibold">Order Number: {orderNumber}</p>
              <p className="text-blue-700">Total: {finalTotal.toFixed(2)} EGP</p>
              {user && (
                <p className="text-green-600 font-semibold">+{Math.floor(total * 0.02)} points earned!</p>
              )}
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

    return (
      <div className="min-h-screen" style={{
        backgroundImage: `url(${require('../assets/Mr.Yelp_Brand_assets[1]_7.jpg')})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '420px 420px'
      }}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-red-500">
                <div className="text-center">
                  <div className="text-blue-900 font-bold text-xs">MR.YELP</div>
                  <div className="text-blue-900 text-xs">🐕</div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900 brand-text-gradient">🛒 Checkout 🛒</h1>
                <p className="text-gray-600">Complete your order! 🎉</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-red-500 text-white' : 
                        isCompleted ? 'bg-green-500 text-white' : 
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span className={`ml-2 font-medium ${
                        isActive ? 'text-red-500' : isCompleted ? 'text-green-500' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Information */}
              {currentStep === 1 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Contact Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your full address"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location</label>
                      {selectedLocation ? (
                        <div className="p-4 border-2 border-green-500 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="font-medium text-green-800">Delivering to: {selectedLocation}</div>
                              <div className="text-sm text-green-600">
                                {selectedLocation === 'All over Egypt' ? 'Nationwide delivery - 100 EGP' : 'Local delivery - 40 EGP'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex space-x-4">
                          <label className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            formData.deliveryType === 'local' 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}>
                            <input
                              type="radio"
                              name="deliveryType"
                              value="local"
                              checked={formData.deliveryType === 'local'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className="font-medium">Local Delivery</div>
                              <div className="text-sm text-gray-600">Cairo & Giza - 40 EGP</div>
                            </div>
                          </label>
                          
                          <label className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            formData.deliveryType === 'nationwide' 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}>
                            <input
                              type="radio"
                              name="deliveryType"
                              value="nationwide"
                              checked={formData.deliveryType === 'nationwide'}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className="font-medium">Nationwide</div>
                              <div className="text-sm text-gray-600">All over Egypt - 100 EGP</div>
                            </div>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <label className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethod === 'cash' 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <Truck className="w-5 h-5 mr-3 text-gray-600" />
                          <div>
                            <div className="font-medium">Cash on Delivery</div>
                            <div className="text-sm text-gray-600">Pay when your order arrives</div>
                          </div>
                        </div>
                      </label>
                      
                      <label className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethod === 'card' 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                          <div>
                            <div className="font-medium">Credit/Debit Card</div>
                            <div className="text-sm text-gray-600">Pay securely online</div>
                          </div>
                        </div>
                      </label>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Name on card"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Points Redemption - Only for logged-in users */}
                  {user && availablePoints > 0 && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-blue-900">Use Your Points</h3>
                          <p className="text-sm text-gray-600">You have {availablePoints} points available</p>
                        </div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="usePoints"
                            checked={formData.usePoints}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700">Apply Points</span>
                        </label>
                      </div>
                      {formData.usePoints && (
                        <div className="mt-2 text-sm text-green-600">
                          You'll save {pointsToUse} EGP with your points!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Review Your Order
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">Delivery Information</h3>
                      <p className="text-gray-700">{formData.fullName}</p>
                      <p className="text-gray-700">{formData.address}</p>
                      <p className="text-gray-700">{formData.city}</p>
                      <p className="text-gray-700">{formData.phone}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">Payment Method</h3>
                      <p className="text-gray-700">
                        {formData.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    currentStep === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      'Complete Order'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-900">{(item.price * item.quantity).toFixed(2)} EGP</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{total.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'Free' : `${deliveryFee.toFixed(2)} EGP`}</span>
                </div>
                {formData.usePoints && pointsToUse > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Points Applied</span>
                    <span>-{pointsToUse.toFixed(2)} EGP</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-blue-900">
                  <span>Total</span>
                  <span>{finalTotal.toFixed(2)} EGP</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center text-yellow-700">
                  <Lock className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <p className="text-sm text-yellow-600 mt-1">
                  Your payment information is encrypted and secure.
                </p>
              </div>
              
              {user ? (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">You'll earn {Math.floor(total * 0.02)} points</span> with this purchase!
                  </p>
                </div>
              ) : (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-yellow-800">
                      <span className="font-medium">You could earn {Math.floor(total * 0.02)} points</span> if you sign in!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // This would open the login modal
                      window.location.href = '/login';
                    }}
                    className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                  >
                    Sign In Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



