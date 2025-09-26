import React from 'react';
import { MapPin, Truck, Shield, Headphones } from 'lucide-react';
import ProductCard from './ProductCard';
import { Phone, Mail } from 'lucide-react';

const Home = ({ selectedLocation }) => {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Dog Food - Chicken & Rice 15kg",
      price: 850,
      originalPrice: 950,
      discount: 10,
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 128,
      category: "Dry Food"
    },
    {
      id: 2,
      name: "Interactive Cat Toy Set",
      price: 120,
      image: "https://images.unsplash.com/photo-1544827425-6e5b4a0b2566?w=300&h=300&fit=crop",
      rating: 5,
      reviews: 89,
      category: "Pet Toys"
    },
    {
      id: 3,
      name: "Premium Cat Litter 10L",
      price: 95,
      originalPrice: 110,
      discount: 15,
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 203,
      category: "Cat Litter"
    },
    {
      id: 4,
      name: "Dog Collar & Leash Set",
      price: 180,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 156,
      category: "Accessories"
    },
    {
      id: 5,
      name: "Wet Cat Food Variety Pack",
      price: 200,
      image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=300&fit=crop",
      rating: 5,
      reviews: 74,
      category: "Wet Food"
    },
    {
      id: 6,
      name: "Pet Care Grooming Kit",
      price: 320,
      originalPrice: 380,
      discount: 20,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 91,
      category: "Pets Care"
    }
  ];

  const categories = [
    { name: "Pet Toys", icon: "🎾", color: "bg-red-500" },
    { name: "Cat Litter", icon: "🏠", color: "bg-blue-800" },
    { name: "Wet Food", icon: "🥫", color: "bg-yellow-400" },
    { name: "Dry Food", icon: "🍖", color: "bg-blue-900" },
    { name: "Accessories", icon: "🎀", color: "bg-red-500" },
    { name: "Pets Care", icon: "🧴", color: "bg-yellow-400" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-red-500 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-white">
              <div className="text-center">
                <div className="text-blue-900 font-bold text-2xl">MR.YELP</div>
                <div className="text-blue-900 text-3xl">🐕</div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">Welcome to Mr. Yelp</h1>
            <p className="text-2xl mb-8 opacity-90">SHOP HERE YOUR PETS CHEER</p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <MapPin className="text-yellow-400" size={24} />
              <span className="text-lg">
                {selectedLocation ? `Delivering to ${selectedLocation.name || selectedLocation}` : 'Select your location for delivery'}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <Truck size={20} />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <Shield size={20} />
                <span>Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <Headphones size={20} />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        {/* Paw pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23ffffff' opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${category.color} p-6 rounded-xl text-center hover:shadow-lg transition-shadow cursor-pointer group`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our top-rated products for your beloved pets</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Mr. Yelp?</h2>
            <p className="text-yellow-400">We're committed to keeping your pets happy and healthy</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-blue-900" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-yellow-400">Free delivery on orders over 500 EGP. Same-day delivery available in major cities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-900" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-yellow-400">All products are carefully selected and quality-tested for your pets' safety and health.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-blue-900" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-yellow-400">Our pet experts are always ready to help you choose the best products for your pets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-3 border-2 border-red-500">
                  <div className="text-center">
                    <div className="text-blue-900 font-bold text-xs">MR.YELP</div>
                    <div className="text-blue-900 text-xs">🐕</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400">MR.YELP</h3>
                  <p className="text-xs text-gray-400">SHOP HERE YOUR PETS CHEER</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">Your trusted partner in pet care. We provide quality products to keep your pets happy and healthy.</p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-800">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600">
                  <span className="text-sm">i</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Dogs</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Cats</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Bundles</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Sale</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Size Guide</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-3">
                  <Phone size={16} />
                  <span>+20 123 456 789</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} />
                  <span>info@mryelp.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} />
                  <span>Alexandria, Egypt</span>
                </div>
              </div>
              <div className="mt-6">
                <h5 className="font-semibold mb-2 text-yellow-400">Newsletter</h5>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-700 rounded-l-lg focus:outline-none focus:bg-gray-600 text-white"
                  />
                  <button className="bg-red-500 px-4 py-2 rounded-r-lg hover:bg-red-600 transition-colors text-white">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mr. Yelp. All rights reserved. Made with ❤️ for pet lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;