import React, { useState, useContext, useEffect } from 'react';
import { Search, Filter, Star, Heart } from 'lucide-react';
import { CartContext } from '../CartProvider';
import ProductCard from '../ProductCard';
import { useSearchParams } from 'react-router-dom';

const Dogs = () => {
  const { addToCart, addToWishlist } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    priceRange: [0, 10000]
  });
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam,
        subcategory: subcategoryParam || ''
      }));
    }
  }, [searchParams]);

  // Sample dog products data
  const dogProducts = [
    {
      id: 1,
      name: "Royal Canin Adult Dog Food - Chicken & Rice 15kg",
      price: 850,
      originalPrice: 950,
      discount: 10,
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 128,
      category: "Dry Food",
      brand: "Royal Canin",
      lifeStage: "Adult",
      specialNeeds: "None"
    },
    {
      id: 2,
      name: "KONG Classic Dog Toy - Red",
      price: 120,
      image: "https://images.unsplash.com/photo-1544827425-6e5b4a0b2566?w=300&h=300&fit=crop",
      rating: 5,
      reviews: 89,
      category: "Toys",
      brand: "KONG",
      lifeStage: "All Stages",
      specialNeeds: "None"
    },
    {
      id: 3,
      name: "Trixie Dog Collar & Leash Set",
      price: 180,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 156,
      category: "Collars, Leashes & Harnesses",
      brand: "Trixie",
      lifeStage: "All Stages",
      specialNeeds: "None"
    },
    {
      id: 4,
      name: "Belcando Wet Dog Food Variety Pack",
      price: 200,
      image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=300&fit=crop",
      rating: 5,
      reviews: 74,
      category: "Wet Food",
      brand: "Belcando",
      lifeStage: "Senior",
      specialNeeds: "Weight Control"
    },
    {
      id: 5,
      name: "Trixie Dog Grooming Kit",
      price: 320,
      originalPrice: 380,
      discount: 20,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 91,
      category: "Grooming",
      brand: "Trixie",
      lifeStage: "All Stages",
      specialNeeds: "None"
    },
    {
      id: 6,
      name: "Dentalife Puppy Training Treats",
      price: 45,
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 203,
      category: "Treats",
      brand: "Dentalife",
      lifeStage: "Puppy",
      specialNeeds: "Dental Care"
    },
    {
      id: 7,
      name: "Orijen Puppy Dry Food 6kg",
      price: 650,
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop",
      rating: 5,
      reviews: 156,
      category: "Dry Food",
      brand: "Orijen",
      lifeStage: "Puppy",
      specialNeeds: "Grain-Free"
    },
    {
      id: 8,
      name: "Canvit Joint Support Supplements",
      price: 180,
      image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 89,
      category: "Supplements & Health",
      brand: "Canvit",
      lifeStage: "Senior",
      specialNeeds: "Joint Support"
    },
    {
      id: 9,
      name: "Trixie Dog Bowl Set",
      price: 95,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 67,
      category: "Bowls & Feeders",
      brand: "Trixie",
      lifeStage: "All Stages",
      specialNeeds: "None"
    },
    {
      id: 10,
      name: "M-pets Dog Bed - Large",
      price: 250,
      image: "https://images.unsplash.com/photo-1544827425-6e5b4a0b2566?w=300&h=300&fit=crop",
      rating: 4,
      reviews: 134,
      category: "Beds & Furniture",
      brand: "M-pets",
      lifeStage: "All Stages",
      specialNeeds: "None"
    }
  ];

  const categoryHierarchy = {
    "All": [],
    "Food": ["Dry Food", "Wet Food"],
    "Treats": ["Dentalife", "Gnawlers", "Dog Fest", "M-pets", "Trixie", "Jerhigh"],
    "Supplements & Health": ["Canvit", "Beaphar", "Versele-Laga Oropharma", "Sanabelle / Sanal"],
    "Toys": ["KONG", "Trixie", "M-pets"],
    "Grooming": ["Trixie", "M-pets", "TropiClean", "Biogance"],
    "Bowls & Feeders": ["Trixie", "M-pets"],
    "Collars, Leashes & Harnesses": ["Trixie", "M-pets", "Flexi"],
    "Beds & Furniture": ["Trixie", "M-pets"],
    "Crates, Carriers & Kennels": ["Trixie", "M-pets"]
  };

  const categories = Object.keys(categoryHierarchy);
  
  const brands = [
    "All", "Royal Canin", "Orijen", "Josera", "Taste of the Wild", "Happy Dog", 
    "Belcando", "Bewi Dog", "Nature's Protection", "Dentalife", "Gnawlers", 
    "Dog Fest", "M-pets", "Trixie", "Jerhigh", "Canvit", "Beaphar", 
    "Versele-Laga Oropharma", "Sanabelle / Sanal", "KONG", "TropiClean", 
    "Biogance", "Flexi"
  ];
  

  const filteredProducts = dogProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Handle hierarchical category matching
    let matchesCategory = true;
    if (filters.category && filters.category !== "All") {
      if (filters.category === "Food") {
        matchesCategory = product.category === "Dry Food" || product.category === "Wet Food";
      } else {
        matchesCategory = product.category === filters.category;
      }
      
      // If subcategory is selected, filter by subcategory (brand)
      if (filters.subcategory && filters.subcategory !== '') {
        matchesCategory = matchesCategory && product.brand === filters.subcategory;
      }
    }
    
    const matchesBrand = !filters.brand || filters.brand === "All" || product.brand === filters.brand;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

    return (
      <div className="min-h-screen" style={{
        backgroundImage: `url(${require('../assets/Mr.Yelp_Brand_assets[1]_7.jpg')})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '420px 420px'
      }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2 brand-text-gradient">🐕 Dog Shop 🐕</h1>
            <p className="text-gray-700 text-lg">Shop dry food, wet food, vet food, toys, accessories and grooming for dogs! 🦴</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-6">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Search products..."
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Subcategory Filter - Only show when main category is selected */}
              {filters.category && filters.category !== "All" && categoryHierarchy[filters.category].length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                  <select
                    value={filters.subcategory || ''}
                    onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">All {filters.category}</option>
                    {categoryHierarchy[filters.category].map(subcategory => (
                      <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{filters.priceRange[0]} EGP</span>
                    <span>{filters.priceRange[1]} EGP</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setFilters({
                  category: '',
                  subcategory: '',
                  brand: '',
                  priceRange: [0, 10000]
                })}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{filteredProducts.length} products found</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dogs;


