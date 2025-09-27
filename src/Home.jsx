import React, { useContext } from 'react';
import { MapPin, Truck, Shield, Headphones } from 'lucide-react';
import ProductCard from './ProductCard';
import { Phone, Mail } from 'lucide-react';
import Logo from './assets/Mr.Yelp_Brand_assets[1]_1.jpg';
import Bg7 from './assets/Mr.Yelp_Brand_assets[1]_7.jpg';
import { CartContext } from './CartProvider';
// Pick first available hero background from assets 5, 3, then 7
let heroBg;
try { heroBg = require('./assets/Mr.Yelp_Brand_assets[1]_5.jpg'); } catch(e) {}
if (!heroBg) { try { heroBg = require('./assets/Mr.Yelp_Brand_assets[1]_3.jpg'); } catch(e) {} }
if (!heroBg) { try { heroBg = require('./assets/Mr.Yelp_Brand_assets[1]_7.jpg'); } catch(e) {} }
const Home = ({ selectedLocation, onLocationClick }) => {
  const { addToCart } = useContext(CartContext);
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

  // New Arrivals Products (matching Petfast.shop structure)
  const newArrivals = [
    {
      id: 7,
      name: "Sheba Wet Food for Cat with Chicken 85g",
      brand: "Sheba",
      price: 120,
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop",
      category: "Cat Food"
    },
    {
      id: 8,
      name: "Lucky Dog Beef Snack For Adult Dogs 8pcs 889g",
      brand: "Lucky",
      price: 299,
      image: "https://images.unsplash.com/photo-1544827425-6e5b4a0b2566?w=300&h=300&fit=crop",
      category: "Dog Treats"
    },
    {
      id: 9,
      name: "Vitakraft Beef Stick + Venison Treat For Dogs 12g",
      brand: "Vitakraft",
      price: 69,
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop",
      category: "Dog Treats"
    },
    {
      id: 10,
      name: "Lucky Creamy For Cat with Poultry, Liver, Salmon 120g",
      brand: "Lucky",
      price: 350,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop",
      category: "Cat Treats"
    },
    {
      id: 11,
      name: "Smax Adult Cat Dry Food 4KG",
      brand: "Smax",
      price: 630,
      image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop",
      category: "Cat Food"
    },
    {
      id: 12,
      name: "Smax Puppy Dry Food for Large Breeds 5kg",
      brand: "Smax",
      price: 680,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop",
      category: "Dog Food"
    }
  ];

  // Best Selling Products
  const bestSelling = [
    {
      id: 13,
      name: "Catsome Grain Free Tuna & Salmon Cat Canned Food Jelly 80g",
      brand: "Catsome",
      price: 125,
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop",
      category: "Cat Food",
      isBestSelling: true
    },
    {
      id: 14,
      name: "Petmetro Milk + Duck For Kitten Can 155Ml",
      brand: "Petmetro",
      price: 120,
      image: "https://images.unsplash.com/photo-1544827425-6e5b4a0b2566?w=300&h=300&fit=crop",
      category: "Cat Food",
      isBestSelling: true
    },
    {
      id: 15,
      name: "Wanpy Creamy Treat for Cats 70g - 5 pieces - chicken",
      brand: "Wanpy",
      price: 160,
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop",
      category: "Cat Treats",
      isBestSelling: true
    },
    {
      id: 16,
      name: "K9 Dental Sticks with Mint for Dogs X4 Sticks - 80gm",
      brand: "K9",
      price: 55,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop",
      category: "Dog Treats",
      isBestSelling: true
    }
  ];

  // Featured Brands
  const brands = [
    { name: "Sheba", logo: "https://dummyimage.com/120x40/D32F2F/ffffff&text=Sheba" },
    { name: "Lucky", logo: "https://dummyimage.com/120x40/FFC107/1E2A44&text=Lucky" },
    { name: "Vitakraft", logo: "https://dummyimage.com/120x40/F5E8C7/1E2A44&text=Vitakraft" },
    { name: "Smax", logo: "https://dummyimage.com/120x40/D32F2F/ffffff&text=Smax" },
    { name: "Catsome", logo: "https://dummyimage.com/120x40/FFC107/1E2A44&text=Catsome" },
    { name: "Petmetro", logo: "https://dummyimage.com/120x40/F5E8C7/1E2A44&text=Petmetro" }
  ];

  // Load icon images from src/assets by filename so the image itself is the button
  const requireFirst = (fileNames) => {
    for (const name of fileNames) {
      try {
        return require(`./assets/${name}`);
      } catch (e) {}
    }
    return '';
  };
  const dogCategories = [
    { name: "Pet Toys", iconSrc: requireFirst(['Pet Toys.png', 'Pet Toys.jpg']), category: "Toys", subcategory: "" },
    { name: "Dry Food", iconSrc: requireFirst(['Dry Food.png', 'Dry Food.jpg']), category: "Food", subcategory: "Dry Food" },
    { name: "Wet Food", iconSrc: requireFirst(['Wet food.png', 'Wet food.jpg']), category: "Food", subcategory: "Wet Food" },
    { name: "Accessories", iconSrc: requireFirst(['acceeso.png', 'acceeso.jpg', 'Accessories.png', 'Accessories.jpg']), category: "Collars, Leashes & Harnesses", subcategory: "" },
    { name: "Pets Care", iconSrc: requireFirst(['Pets Care.png', 'Pets Care.jpg']), category: "Grooming", subcategory: "" },
    { name: "Treats", iconSrc: requireFirst(['Pet Toys.png', 'Pet Toys.jpg']), category: "Treats", subcategory: "" }
  ];

  const catCategories = [
    { name: "Pet Toys", iconSrc: requireFirst(['Pet Toys.png', 'Pet Toys.jpg']), category: "Toys", subcategory: "" },
    { name: "Cat Litter", iconSrc: requireFirst(['Cat Litter.png', 'Cat Litter.jpg']), category: "Litter", subcategory: "" },
    { name: "Wet Food", iconSrc: requireFirst(['Wet food.png', 'Wet food.jpg']), category: "Food", subcategory: "Wet Food" },
    { name: "Dry Food", iconSrc: requireFirst(['Dry Food.png', 'Dry Food.jpg']), category: "Food", subcategory: "Dry Food" },
    { name: "Accessories", iconSrc: requireFirst(['acceeso.png', 'acceeso.jpg', 'Accessories.png', 'Accessories.jpg']), category: "Bowls & Feeders", subcategory: "" },
    { name: "Pets Care", iconSrc: requireFirst(['Pets Care.png', 'Pets Care.jpg']), category: "Grooming", subcategory: "" }
  ];

  const brandLogos = [
    'https://dummyimage.com/120x40/1E2A44/ffffff&text=Brand+1',
    'https://dummyimage.com/120x40/1E2A44/ffffff&text=Brand+2',
    'https://dummyimage.com/120x40/1E2A44/ffffff&text=Brand+3',
    'https://dummyimage.com/120x40/1E2A44/ffffff&text=Brand+4',
    'https://dummyimage.com/120x40/1E2A44/ffffff&text=Brand+5',
    'https://dummyimage.com/120x40/1E2A44/ffffff&text=Brand+6'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white" style={{
        background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 50%, #FFC107 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.8) 0%, rgba(183, 28, 28, 0.8) 50%, rgba(255, 193, 7, 0.8) 100%)'}}></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full mx-auto mb-6 border-8 overflow-hidden" style={{borderColor: '#FFC107', background: '#F5E8C7', boxShadow: '0 8px 32px rgba(255, 193, 7, 0.4)'}}>
              <img src={Logo} alt="Mr. Yelp" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 md:mb-4" style={{color: '#FFC107', textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>Welcome to Mr. Yelp</h1>
            <p className="text-xl md:text-2xl mb-6 md:mb-8" style={{color: '#F5E8C7', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>SHOP HERE YOUR PETS CHEER</p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <MapPin style={{color: '#FFC107'}} size={24} />
              <span 
                className={`text-lg ${!selectedLocation ? 'cursor-pointer transition-colors underline' : ''}`}
                style={{color: '#F5E8C7'}}
                onClick={!selectedLocation ? onLocationClick : undefined}
              >
                {selectedLocation ? `Delivering to ${selectedLocation.name || selectedLocation}` : 'Select your location for delivery'}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <div className="flex items-center gap-2 px-6 py-3 rounded-xl" style={{background: 'linear-gradient(135deg, #F5E8C7 0%, #FFC107 100%)', color: '#1E2A44', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                <Truck size={20} style={{color: '#D32F2F'}} />
                <span className="font-semibold">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-xl" style={{background: 'linear-gradient(135deg, #F5E8C7 0%, #FFC107 100%)', color: '#1E2A44', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                <Shield size={20} style={{color: '#D32F2F'}} />
                <span className="font-semibold">Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-xl" style={{background: 'linear-gradient(135deg, #F5E8C7 0%, #FFC107 100%)', color: '#1E2A44', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                <Headphones size={20} style={{color: '#D32F2F'}} />
                <span className="font-semibold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bright paw pattern overlay */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Cg fill='%23FFC107' opacity='0.4'%3E%3Cpath d='M25 25c0-6.9-5.6-12.5-12.5-12.5S0 18.1 0 25s5.6 12.5 12.5 12.5S25 31.9 25 25zm12.5 0c0-6.9-5.6-12.5-12.5-12.5S12.5 18.1 12.5 25s5.6 12.5 12.5 12.5S37.5 31.9 37.5 25z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#1E2A44'}}>New Arrivals</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {newArrivals.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold mb-1" style={{color: '#D32F2F'}}>{product.brand}</p>
                  <h3 className="text-sm font-medium mb-2" style={{color: '#1E2A44'}}>{product.name}</h3>
                  <p className="text-lg font-bold" style={{color: '#D32F2F'}}>EGP {product.price}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full mt-2 py-2 px-3 text-sm font-medium rounded-md transition-colors hover:opacity-90" 
                    style={{background: '#D32F2F', color: '#F5E8C7'}}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/cats'}
                className="px-6 py-3 font-semibold rounded-lg transition-colors hover:scale-105" 
                style={{background: '#FFC107', color: '#1E2A44'}}
              >
                🐱 View Cat Menu
              </button>
              <button 
                onClick={() => window.location.href = '/dogs'}
                className="px-6 py-3 font-semibold rounded-lg transition-colors hover:scale-105" 
                style={{background: '#D32F2F', color: '#F5E8C7'}}
              >
                🐕 View Dog Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Section */}
      <section className="py-12" style={{background: 'linear-gradient(135deg, #F5E8C7 0%, #FFC107 100%)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#1E2A44'}}>Best Selling</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {bestSelling.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
                {product.isBestSelling && (
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-2 py-1 text-xs font-bold rounded-full" style={{background: '#D32F2F', color: '#F5E8C7'}}>
                      Best Selling
                    </span>
                  </div>
                )}
                <div className="aspect-square bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold mb-1" style={{color: '#D32F2F'}}>{product.brand}</p>
                  <h3 className="text-sm font-medium mb-2" style={{color: '#1E2A44'}}>{product.name}</h3>
                  <p className="text-lg font-bold" style={{color: '#D32F2F'}}>EGP {product.price}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full mt-2 py-2 px-3 text-sm font-medium rounded-md transition-colors hover:opacity-90" 
                    style={{background: '#D32F2F', color: '#F5E8C7'}}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/cats'}
                className="px-6 py-3 font-semibold rounded-lg transition-colors hover:scale-105" 
                style={{background: '#1E2A44', color: '#F5E8C7'}}
              >
                🐱 View Cat Menu
              </button>
              <button 
                onClick={() => window.location.href = '/dogs'}
                className="px-6 py-3 font-semibold rounded-lg transition-colors hover:scale-105" 
                style={{background: '#D32F2F', color: '#F5E8C7'}}
              >
                🐕 View Dog Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Brand Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#1E2A44'}}>Shop by Brand</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <img src={brand.logo} alt={brand.name} className="w-full h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16" style={{background: 'linear-gradient(135deg, #F5E8C7 0%, #FFC107 100%)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#1E2A44'}}>Why Choose Mr. Yelp?</h2>
            <p style={{color: '#D32F2F', fontSize: '18px'}}>We're committed to keeping your pets happy and healthy</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background: '#D32F2F'}}>
                <Truck style={{color: '#F5E8C7'}} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#1E2A44'}}>Fast Delivery</h3>
              <p style={{color: '#D32F2F'}}>Free delivery on orders over 500 EGP. Same-day delivery available in major cities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background: '#D32F2F'}}>
                <Shield style={{color: '#F5E8C7'}} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#1E2A44'}}>Quality Products</h3>
              <p style={{color: '#D32F2F'}}>All products are carefully selected and quality-tested for your pets' safety and health.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background: '#D32F2F'}}>
                <Headphones style={{color: '#F5E8C7'}} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{color: '#1E2A44'}}>24/7 Support</h3>
              <p style={{color: '#D32F2F'}}>Our pet experts are always ready to help you choose the best products for your pets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{background: 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3 border-2" style={{background: '#FFC107', borderColor: '#1E2A44'}}>
                  <div className="text-center">
                    <div className="font-bold text-xs" style={{color: '#1E2A44'}}>MR.YELP</div>
                    <div className="text-xs" style={{color: '#1E2A44'}}>🐕</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{color: '#FFC107'}}>MR.YELP</h3>
                  <p className="text-xs" style={{color: '#F5E8C7'}}>SHOP HERE YOUR PETS CHEER</p>
                </div>
              </div>
              <p className="mb-4" style={{color: '#F5E8C7'}}>Your trusted partner in pet care. We provide quality products to keep your pets happy and healthy.</p>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer" style={{background: '#1E2A44'}}>
                  <span className="text-sm" style={{color: '#F5E8C7'}}>f</span>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer" style={{background: '#2A4066'}}>
                  <span className="text-sm" style={{color: '#F5E8C7'}}>t</span>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer" style={{background: '#FFC107'}}>
                  <span className="text-sm" style={{color: '#1E2A44'}}>i</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4" style={{color: '#FFC107'}}>Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="transition-colors" style={{color: '#F5E8C7'}}>Dogs</a></li>
                <li><a href="#" className="transition-colors" style={{color: '#F5E8C7'}}>Cats</a></li>
                <li><a href="#" className="transition-colors" style={{color: '#F5E8C7'}}>Bundles</a></li>
                <li><a href="#" className="transition-colors" style={{color: '#F5E8C7'}}>New Arrivals</a></li>
                <li><a href="#" className="transition-colors" style={{color: '#F5E8C7'}}>Sale</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4" style={{color: '#FFC107'}}>Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="transition-colors" style={{color: '#F5E8C7'}}>Contact Us</a></li>
                <li><a href="#" className="transition-colors" style={{color: '#F5E8C7'}}>Shipping Info</a></li>
                <li><a href="#" className="transition-colors" style={{color: '#F5E8C7'}}>Returns</a></li>
                <li><a href="#" className="transition-colors" style={{color: '#F5E8C7'}}>FAQ</a></li>
                <li><a href="#" className="transition-colors" style={{color: '#F5E8C7'}}>Size Guide</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4" style={{color: '#FFC107'}}>Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={16} style={{color: '#FFC107'}} />
                  <span style={{color: '#F5E8C7'}}>+20 123 456 789</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} style={{color: '#FFC107'}} />
                  <span style={{color: '#F5E8C7'}}>info@mryelp.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} style={{color: '#FFC107'}} />
                  <span style={{color: '#F5E8C7'}}>Cairo, Egypt</span>
                </div>
              </div>
              <div className="mt-6">
                <h5 className="font-semibold mb-2" style={{color: '#FFC107'}}>Newsletter</h5>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded-l-lg focus:outline-none"
                    style={{background: '#F5E8C7', color: '#1E2A44'}}
                  />
                  <button className="px-4 py-2 rounded-r-lg transition-colors" style={{background: '#1E2A44', color: '#F5E8C7'}}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 text-center" style={{borderTop: '1px solid #F5E8C7'}}>
            <p style={{color: '#F5E8C7'}}>&copy; 2025 Mr. Yelp. All rights reserved. Made with ❤️ for pet lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;