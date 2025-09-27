import React from 'react';

const Bundles = () => {
  return (
    <div className="min-h-screen" style={{
      backgroundImage: `url(${require('../assets/Mr.Yelp_Brand_assets[1]_7.jpg')})`,
      backgroundRepeat: 'repeat',
      backgroundSize: '420px 420px'
    }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Bundles</h1>
      <p className="text-gray-700 mb-8">Save with curated bundles for dogs and cats: food + toys + care.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4">
            <div className="h-40 bg-gray-200 rounded mb-3" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Bundles;


