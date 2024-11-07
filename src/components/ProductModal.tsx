import React, { useState, useEffect, useRef } from 'react';
import { X, ShoppingCart, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

interface ProductModalProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
  };
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { dispatch } = useShop();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const slideShowRef = useRef(null);
  const addToCartButtonRef = useRef(null);
  const checkoutButtonRef = useRef(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const imageList = [product.image];
    for (let i = 1; i <= 4; i++) {
      imageList.push(`/src/images/products/${product.id}/image-${i}.jpg`);
    }
    setImages(imageList);
  }, [product.id, product.image]);

  const handlePrevImage = () => {
    const ctx = gsap.context(() => {
      if (slideShowRef.current) {
        gsap.to(slideShowRef.current, {
          opacity: 0,
          x: 50,
          duration: 0.3,
          onComplete: () => {
            setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            gsap.fromTo(slideShowRef.current,
              { opacity: 0, x: -50 },
              { opacity: 1, x: 0, duration: 0.3 }
            );
          }
        });
      }
    });

    return () => ctx.revert();
  };

  const handleNextImage = () => {
    const ctx = gsap.context(() => {
      if (slideShowRef.current) {
        gsap.to(slideShowRef.current, {
          opacity: 0,
          x: -50,
          duration: 0.3,
          onComplete: () => {
            setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            gsap.fromTo(slideShowRef.current,
              { opacity: 0, x: 50 },
              { opacity: 1, x: 0, duration: 0.3 }
            );
          }
        });
      }
    });

    return () => ctx.revert();
  };

  const handleAddToCart = () => {
    const ctx = gsap.context(() => {
      if (addToCartButtonRef.current) {
        gsap.fromTo(addToCartButtonRef.current,
          { scale: 1 },
          {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              for (let i = 0; i < quantity; i++) {
                dispatch({ type: 'ADD_TO_CART', payload: product });
              }
              setAddedToCart(true);
              
              gsap.to(addToCartButtonRef.current, {
                backgroundColor: '#22c55e',
                duration: 0.3,
                onComplete: () => {
                  setTimeout(() => {
                    if (addToCartButtonRef.current) {
                      gsap.to(addToCartButtonRef.current, {
                        backgroundColor: '#2563eb',
                        duration: 0.3
                      });
                    }
                  }, 1000);
                }
              });
            }
          }
        );
      }
    });

    return () => ctx.revert();
  };

  const handleCheckout = () => {
    const ctx = gsap.context(() => {
      if (checkoutButtonRef.current) {
        gsap.fromTo(checkoutButtonRef.current,
          { scale: 1 },
          {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              if (!addedToCart) {
                for (let i = 0; i < quantity; i++) {
                  dispatch({ type: 'ADD_TO_CART', payload: product });
                }
              }
              navigate('/cart');
              onClose();
            }
          }
        );
      }
    });

    return () => ctx.revert();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full z-10"
          >
            <X size={24} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="relative">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <img
                  ref={slideShowRef}
                  src={images[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = product.image;
                  }}
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                      currentImageIndex === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = product.image;
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-2">
                  {product.category}
                </span>
                <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ${product.price}
                </p>
                <p className="text-gray-600 mb-6">{product.description}</p>
              </div>
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 rounded-md border hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center border rounded-md p-2"
                  />
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 rounded-md border hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  ref={addToCartButtonRef}
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ShoppingCart size={20} />
                  {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button
                  ref={checkoutButtonRef}
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ArrowRight size={20} />
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;