import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartProvider from './CartProvider';
import NavBar from './NavBar';
import Home from './Home';
import Dogs from './pages/Dogs';
import Cats from './pages/Cats';
import Bundles from './pages/Bundles';
import Checkout from './pages/Checkout';
import ScheduleOrder from './pages/ScheduleOrder';
import ScheduledOrders from './pages/ScheduledOrders';
import Cart from './Cart';
import Wishlist from './Wishlist';
import LocationPopup from './LocationPopup';
import WhatsAppButton from './WhatsAppButton';

const App = () => {
  const [showCart, setShowCart] = React.useState(false);
  const [showWishlist, setShowWishlist] = React.useState(false);
  const [showLocationPopup, setShowLocationPopup] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState('');

  // Check if location popup should show on first visit
  React.useEffect(() => {
    const hasSeenLocationPopup = localStorage.getItem('hasSeenLocationPopup');
    if (!hasSeenLocationPopup) {
      setShowLocationPopup(true);
    }
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationPopup(false);
    localStorage.setItem('hasSeenLocationPopup', 'true');
  };

  const handleLocationClick = () => {
    setShowLocationPopup(true);
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <NavBar 
            onCartClick={() => setShowCart(true)}
            onWishlistClick={() => setShowWishlist(true)}
          />
          <Routes>
            <Route path="/" element={<Home selectedLocation={selectedLocation} onLocationClick={handleLocationClick} />} />
            <Route path="/dogs" element={<Dogs />} />
            <Route path="/cats" element={<Cats />} />
            <Route path="/bundles" element={<Bundles />} />
            <Route path="/checkout" element={<Checkout selectedLocation={selectedLocation} />} />
            <Route path="/schedule-order" element={<ScheduleOrder />} />
            <Route path="/scheduled-orders" element={<ScheduledOrders />} />
          </Routes>

          <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
          <Wishlist isOpen={showWishlist} onClose={() => setShowWishlist(false)} />

          <LocationPopup
            isOpen={showLocationPopup}
            onClose={() => setShowLocationPopup(false)}
            onSelectLocation={handleLocationSelect}
          />

          {/* WhatsApp Floating Button */}
          <WhatsAppButton />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;