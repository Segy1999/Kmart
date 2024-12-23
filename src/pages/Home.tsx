import React, { useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Typewriter } from '../utils/typewriter';
import ProductCard from '../components/ProductCard';
import { gsap } from 'gsap';

const Home = () => {
  const { state } = useShop();
  const heroRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typewriterRef.current) {
      new Typewriter(typewriterRef.current, ['Welcome to KaeMart', 'Your home for bespoke African accesories', 'Shop with Confidence'], 3000);
    }

    if (heroRef.current) {
      gsap.from(heroRef.current, {
        opacity: 1,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }, []);

  const featuredProducts = state.products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-[80vh] bg-blue-800 flex items-center justify-center text-black"
      >
        <div className="text-center">
          <div
            ref={typewriterRef}
            className="anton-regular text-4xl md:text-6xl font-bold mb-6 h-20 text-white"
          ></div>
          <p className="bebas-neue-regular text-xl mb-8 max-w-2xl mx-auto px-4 text-white">
            Discover our curated collection of premium products designed to enhance
            your lifestyle.
          </p>
          <a
            href="#featured"
            className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors"
          >
            Explore Now
          </a>
        </div>
      </div>

      {/* Featured Products Section */}
      <section id="featured" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="bebas-neue-regular text-3xl font-bold text-center mb-12 text-black">
            Featured Products
          </h2>
          <div className="roboto-medium grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;