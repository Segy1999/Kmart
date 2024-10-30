import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ShopState {
  cart: CartItem[];
  products: Product[];
  searchQuery: string;
}

type ShopAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

const initialState: ShopState = {
  cart: [],
  products: [
    {
      id: 1,
      name: "Red Beads Waist Band",
      price: 15.99,
      image: "https://kaemart.com/wp-content/uploads/2021/05/Red-beads-waist-band-scaled.jpg",
      category: "WaistBands",
      description: "Red waist beads"
    },
    {
      id: 2,
      name: "Black Ceramic",
      price: 19.99,
      image: "https://kaemart.com/wp-content/uploads/2021/05/Black-ceramic2-scaled.jpg",
      category: "Necklaces & Pendants",
      description: "Cowry and black beads authentic African traditional Necklace"
    },
    {
      id: 3,
      name: "Yellow & Black Leather Bangle",
      price: 15.99,
      image: "https://kaemart.com/wp-content/uploads/2021/05/Yello-black-leather-bangle-2-300x225.jpg",
      category: "Leather Bangles",
      description: "Yellow & black leather bangle"
    }
  ],
  searchQuery: '',
};

const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};

const ShopContext = createContext<{
  state: ShopState;
  dispatch: React.Dispatch<ShopAction>;
} | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};