import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Toaster position="bottom-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </CartProvider>
    </WishlistProvider>
  );
}
