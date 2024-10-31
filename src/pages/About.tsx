import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from('.animate-section', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
        },
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="animate-section text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">About KaeMart</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're passionate about bringing you the finest selection of premium bespoke accessories from the whole of Africa
          while providing an exceptional shopping experience.
        </p>
      </div>

      {/* Our Story */}
      <div className="animate-section grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <img
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc"
            alt="Our Story"
            className="rounded-lg shadow-lg w-full h-96 object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2024, KaeMart began with a simple mission: to provide
            high-quality African accesories. We carefully curate
            each item in our collection, ensuring it meets our strict standards for
            quality and design.
          </p>
          <p className="text-gray-600">
            Today, we continue to grow and evolve, always putting our customers
            first and striving to create the best possible shopping experience.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="animate-section mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Quality First',
              description:
                'We never compromise on quality, carefully selecting each product in our collection.',
            },
            {
              title: 'Customer Focus',
              description:
                'Your satisfaction is our priority. We\'re here to help you find exactly what you need.',
            },
            {
              title: 'Sustainability',
              description:
                'We\'re committed to reducing our environmental impact through responsible practices.',
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="animate-section bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Mail size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600">info@kaemart.com</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Phone size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600">(555) 123-4567</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <MapPin size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600">123 Shop Street, City, State 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;