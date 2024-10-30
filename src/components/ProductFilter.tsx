import React from 'react';

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            className={`w-full text-left px-3 py-2 rounded-md ${
              selectedCategory === 'all'
                ? 'bg-blue-100 text-blue-800'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onCategoryChange('all')}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`w-full text-left px-3 py-2 rounded-md ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-800'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Sort By</h3>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;