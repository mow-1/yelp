import React, { useState } from 'react';
import CartProvider from './CartProvider';
import NavBar from './NavBar';
import Home from './Home';
import LocationPopup from './LocationPopup';
import Cart from './Cart';
import Wishlist from './Wishlist';

const App = () => {
  const [showLocationPopup, setShowLocationPopup] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationPopup(false);
  };

  return (
    <CartProvider>
      <div className="App">
        <NavBar 
          onCartClick={() => setShowCart(true)}
          onWishlistClick={() => setShowWishlist(true)}
        />
        
        <Home selectedLocation={selectedLocation} />

        <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
        <Wishlist isOpen={showWishlist} onClose={() => setShowWishlist(false)} />

        <LocationPopup
          isOpen={showLocationPopup}
          onClose={() => setShowLocationPopup(false)}
          onSelectLocation={handleLocationSelect}
        />
      </div>
    </CartProvider>
  );
};

export default App;