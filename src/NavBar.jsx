import React, { useContext, useState } from 'react';
import { ShoppingCart, Heart, Phone, Mail, Menu, X, Search } from 'lucide-react';
import { CartContext } from './CartProvider';

const NavBar = ({ onCartClick, onWishlistClick }) => {
  const { getItemCount, wishlistItems } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Dogs', icon: '🐕' },
    { name: 'Cats', icon: '🐱' },
    { name: 'Bundles', icon: '📦' }
  ];

  return (
    <nav className="bg-blue-900 shadow-lg sticky top-0 z-40">
      {/* Top Bar */}
      <div className="bg-blue-800 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+20 123 456 789</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>info@mryelp.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Free delivery on orders over 500 EGP!</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mr-4 border-4 border-red-500">
              <div className="text-center">
                <div className="text-blue-900 font-bold text-xs">MR.YELP</div>
                <div className="text-blue-900 text-xs">🐕</div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-yellow-400">MR.YELP</h1>
              <p className="text-xs text-white">SHOP HERE YOUR PETS CHEER</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" size={20} />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none bg-white text-gray-800"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onWishlistClick}
              className="relative p-2 text-white hover:text-yellow-400 transition-colors"
            >
              <Heart size={24} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 text-white hover:text-yellow-400 transition-colors"
            >
              <ShoppingCart size={24} />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Categories - Desktop */}
        <div className="hidden md:flex border-t border-yellow-400 py-4">
          <div className="flex gap-8">
            {categories.map(category => (
              <button
                key={category.name}
                className="flex items-center gap-2 px-4 py-2 text-white hover:text-yellow-400 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-900 border-t border-yellow-400">
          <div className="px-4 py-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200" size={20} />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none bg-white text-gray-800"
                />
              </div>
            </div>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.name}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-white hover:bg-blue-800 rounded-lg"
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;