import React, { useState, createContext } from 'react';

// Create the CartContext
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [rewardPoints, setRewardPoints] = useState(0); // 1 point = 1 EGP
  const [user, setUser] = useState(null); // User authentication state
  const [orderHistory, setOrderHistory] = useState([]); // User order history
  const [scheduledOrders, setScheduledOrders] = useState([]); // User scheduled orders

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Rewards: earn 2% of order total as points (updated from 8%)
  const awardPointsForTotal = (orderTotal) => {
    if (!user) return 0; // Only logged-in users can earn points
    const earned = Math.floor(orderTotal * 0.02);
    setRewardPoints(prev => prev + earned);
    return earned;
  };

  const getRewardPoints = () => rewardPoints;

  // Authentication functions
  const login = (email, password) => {
    // In a real app, this would validate against a backend
    // For demo purposes, we'll simulate a successful login
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      joinDate: new Date().toISOString()
    };
    setUser(userData);
    return { success: true, user: userData };
  };

  const signup = (email, password) => {
    // In a real app, this would create a new user account
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      joinDate: new Date().toISOString()
    };
    setUser(userData);
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    setRewardPoints(0);
    setOrderHistory([]);
  };

  const addOrderToHistory = (order) => {
    if (user) {
      setOrderHistory(prev => [order, ...prev]);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlistItems,
      rewardPoints,
      user,
      orderHistory,
      scheduledOrders,
      addToCart,
      removeFromCart,
      updateQuantity,
      addToWishlist,
      getTotalPrice,
      getItemCount,
      awardPointsForTotal,
      getRewardPoints,
      clearCart,
      login,
      signup,
      logout,
      addOrderToHistory,
      setUser,
      setRewardPoints,
      setScheduledOrders
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Export both the provider and context
export default CartProvider;
export { CartContext };