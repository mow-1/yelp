import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const LocationPopup = ({ isOpen, onClose, onSelectLocation }) => {
  const [selectedCity, setSelectedCity] = useState('');
  
  const cities = [
    'Alexandria', 'Cairo', 'Giza', 'Shubra El Kheima', 'Port Said', 
    'Suez', 'Luxor', 'Mansoura', 'Tanta', 'Asyut', 'Ismailia', 'Faiyum'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCity) {
      onSelectLocation(selectedCity);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-blue-800" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Select Your Location</h2>
          <p className="text-gray-600">Choose your city to see available products and delivery options</p>
        </div>

        <form onSubmit={handleSubmit}>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-red-500 focus:outline-none"
            required
          >
            <option value="">Select your city</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Continue Shopping
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationPopup;