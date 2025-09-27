import React, { useContext, useState } from 'react';
import { ShoppingCart, X, Calendar } from 'lucide-react';
import { CartContext } from './CartProvider';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-sm md:max-w-md h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-blue-800">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base truncate">{item.name}</h4>
                      <p className="text-red-500 font-semibold text-sm md:text-base">{item.price} EGP</p>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 md:w-8 md:h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm"
                      >
                        -
                      </button>
                      <span className="w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 md:w-8 md:h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg md:text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-xl md:text-2xl font-bold text-red-500">{getTotalPrice().toFixed(2)} EGP</span>
                </div>
                
                {/* Schedule Order Button - Only show if total > 300 EGP */}
                {getTotalPrice() > 300 && (
                  <button
                    className="w-full bg-blue-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mb-3 flex items-center justify-center gap-2"
                    onClick={() => {
                      onClose();
                      navigate('/schedule-order');
                    }}
                  >
                    <Calendar size={18} />
                    Schedule Order
                  </button>
                )}
                
                <button
                  className="w-full bg-red-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;