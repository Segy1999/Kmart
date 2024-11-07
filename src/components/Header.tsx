import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { gsap } from 'gsap';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state } = useShop();
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIconRef = useRef(null);
  const cartBadgeRef = useRef(null);

  useEffect(() => {
    if (cartItemCount > 0) {
      const ctx = gsap.context(() => {
        if (cartIconRef.current) {
          gsap.fromTo(cartIconRef.current,
            { scale: 1.2 },
            { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.3)' }
          );
        }
        if (cartBadgeRef.current) {
          gsap.fromTo(cartBadgeRef.current,
            { scale: 0 },
            { scale: 1, duration: 0.3, ease: 'back.out(2)' }
          );
        }
      });

      return () => ctx.revert();
    }
  }, [cartItemCount]);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">KaeMart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="bebas-neue-regular text-2xl hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-gray-900 transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
              About
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <div ref={cartIconRef}>
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span 
                    ref={cartBadgeRef}
                    className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                  >
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;