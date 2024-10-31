import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, Eye } from 'lucide-react';
import ProductModal from './ProductModal';
import { gsap } from 'gsap';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { dispatch } = useShop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleAddToCart = () => {
    const ctx = gsap.context(() => {
      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current,
          { scale: 1 },
          { 
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              dispatch({ type: 'ADD_TO_CART', payload: props });
            }
          }
        );
      }
    });

    return () => ctx.revert();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={props.image} alt={props.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{props.name}</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {props.category}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{props.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">${props.price}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Eye size={20} />
                View Details
              </button>
              <button
                ref={buttonRef}
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProductModal product={props} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ProductCard;