import React, { useContext, useState } from 'react';
import { ShoppingCart, Heart, Phone, Mail, Menu, X, User, Calendar } from 'lucide-react';
import { CartContext } from './CartProvider';
import { Link, NavLink } from 'react-router-dom';
import Logo from './assets/Mr.Yelp_Brand_assets[1]_1.jpg';
import AuthModal from './AuthModal';

const NavBar = ({ onCartClick, onWishlistClick }) => {
  const { getItemCount, wishlistItems, rewardPoints, user } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  // search removed for now

  // categories row removed

  return (
    <nav className="shadow-lg sticky top-0 z-40" style={{background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)'}}>
      {/* Top Promo Bar */}
      <div className="py-2 px-4" style={{background: 'linear-gradient(135deg, #FFC107 0%, #F4CF62 100%)'}}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 items-center text-xs md:text-sm">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-semibold" style={{color: '#1E2A44'}}>Free Shipping</span>
            <span style={{color: '#1E2A44'}}>for orders over 1000 EGP (Cairo & Giza)</span>
          </div>
          <div className="hidden md:flex items-center justify-center gap-2">
            <span className="font-semibold" style={{color: '#1E2A44'}}>Same-day Delivery</span>
            <span style={{color: '#1E2A44'}}>for orders before 2 PM (Cairo & Giza)</span>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-4">
            <div className="flex items-center gap-2">
              <Phone size={14} style={{color: '#1E2A44'}} />
              <span style={{color: '#1E2A44'}}>10am-10pm</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Mail size={14} style={{color: '#1E2A44'}} />
              <span style={{color: '#1E2A44'}}>info@mryelp.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Mr. Yelp" className="w-16 h-16 object-contain rounded-full mr-4 border-4" style={{borderColor: '#FFC107', background: '#F5E8C7'}} />
              <div>
                <h1 className="text-2xl font-bold" style={{color: '#FFC107'}}>MR.YELP</h1>
                <p className="text-xs" style={{color: '#F5E8C7'}}>SHOP HERE YOUR PETS CHEER</p>
              </div>
            </Link>
          </div>

          {/* Center Nav */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6">
            <NavLink to="/dogs" className={({isActive}) => `px-3 py-2 rounded-lg transition-colors ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`} style={({isActive}) => isActive ? {background: '#B71C1C'} : {}}>Dogs</NavLink>
            <NavLink to="/cats" className={({isActive}) => `px-3 py-2 rounded-lg transition-colors ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`} style={({isActive}) => isActive ? {background: '#B71C1C'} : {}}>Cats</NavLink>
            <NavLink to="/bundles" className={({isActive}) => `px-3 py-2 rounded-lg transition-colors ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`} style={({isActive}) => isActive ? {background: '#B71C1C'} : {}}>Bundles</NavLink>
            {user && (
              <NavLink to="/scheduled-orders" className={({isActive}) => `px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`} style={({isActive}) => isActive ? {background: '#B71C1C'} : {}}>
                <Calendar size={16} />
                Scheduled Orders
              </NavLink>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-2 font-semibold px-3 py-1 rounded-lg" style={{background: '#FFC107', color: '#1E2A44'}}>
                <span>Points:</span>
                <span>{rewardPoints}</span>
              </div>
            )}
            <button
              onClick={onWishlistClick}
              className="relative p-2 transition-colors"
              style={{color: '#F5E8C7'}}
              aria-label="Open wishlist"
              title="Wishlist"
            >
              <Heart size={24} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{background: '#1E2A44'}}>
                  {wishlistItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowAuthModal(true)}
              className="relative p-2 transition-colors"
              style={{color: '#F5E8C7'}}
              aria-label="Account"
              title={user ? 'Account' : 'Login/Sign Up'}
            >
              <User size={24} />
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 transition-colors"
              style={{color: '#F5E8C7'}}
              aria-label="Open cart"
              title="Cart"
            >
              <ShoppingCart size={24} />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{background: '#1E2A44'}}>
                  {getItemCount()}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              style={{color: '#F5E8C7'}}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              title={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Categories row removed */}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t" style={{background: '#B71C1C', borderColor: '#FFC107'}}>
          <div className="px-4 py-4">
            <div className="space-y-2">
              <NavLink to="/dogs" onClick={()=>setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg transition-colors" style={{color: '#F5E8C7'}}>Dogs</NavLink>
              <NavLink to="/cats" onClick={()=>setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg transition-colors" style={{color: '#F5E8C7'}}>Cats</NavLink>
              <NavLink to="/bundles" onClick={()=>setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg transition-colors" style={{color: '#F5E8C7'}}>Bundles</NavLink>
              {user && (
                <NavLink to="/scheduled-orders" onClick={()=>setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg flex items-center gap-2 transition-colors" style={{color: '#F5E8C7'}}>
                  <Calendar size={16} />
                  Scheduled Orders
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
};

export default NavBar;