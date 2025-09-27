import React, { useContext } from 'react';
import { Heart, Star } from 'lucide-react';
import { CartContext } from './CartProvider';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlistItems } = useContext(CartContext);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => addToWishlist(product)}
          className={`absolute top-2 right-2 md:top-3 md:right-3 p-1.5 md:p-2 rounded-full transition-colors ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        {product.discount && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-lg text-xs md:text-sm font-semibold">
            -{product.discount}%
          </div>
        )}
      </div>

      <div className="p-3 md:p-4">
        <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < product.rating ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-lg md:text-xl font-bold text-red-500">{product.price} EGP</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm md:text-base">{product.originalPrice} EGP</span>
            )}
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-red-500 text-white py-2 md:py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm md:text-base"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;