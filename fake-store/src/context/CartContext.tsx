import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { CartItem, Product } from "../types/types";

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | { type: "SET_CART"; payload: CartState }
  | { type: "CLEAR_CART" };

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    }
    case "REMOVE_FROM_CART": {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
        total: state.total - (item ? item.product.price * item.quantity : 0),
      };
    }
    case "UPDATE_QUANTITY": {
      const item = state.items.find(
        (item) => item.product.id === action.payload.productId
      );
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + item.product.price * quantityDiff,
      };
    }
    case "SET_CART": {
      return action.payload;
    }
    case "CLEAR_CART": {
      return {
        items: [],
        total: 0,
      };
    }
    default:
      return state;
  }
};

const STORAGE_KEY = "shopping-cart";

const saveToStorage = (cart: CartState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const loadFromStorage = (): CartState | null => {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    if (!savedCart) return null;

    const parsedCart = JSON.parse(savedCart);
    if (
      typeof parsedCart === "object" &&
      Array.isArray(parsedCart.items) &&
      typeof parsedCart.total === "number"
    ) {
      return parsedCart;
    }
    return null;
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return null;
  }
};

const isStorageAvailable = () => {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    { items: [], total: 0 },
    () => {
      return loadFromStorage() || { items: [], total: 0 };
    }
  );

  useEffect(() => {
    if (!isStorageAvailable()) {
      console.warn(
        "localStorage is not available. Cart data will not persist."
      );
      return;
    }
    saveToStorage(state);
  }, [state]);

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
