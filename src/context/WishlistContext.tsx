import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";

export interface WishlistItemType {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItemType[];
  addToWishlist: (item: WishlistItemType) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>(() => {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item: WishlistItemType) => {
    setWishlistItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      toast.success(`${item.title} added to vault`, {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          borderRadius: '1rem',
          fontSize: '12px',
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          border: '1px solid rgba(255,165,0,0.2)'
        },
        iconTheme: {
          primary: '#f97316',
          secondary: '#fff',
        },
      });
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => wishlistItems.some((item) => item.id === id);

  const clearWishlist = () => setWishlistItems([]);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
