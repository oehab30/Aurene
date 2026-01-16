import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";
import { Loader2 } from "lucide-react";

// Lazy Load Pages for Performance
const Home = lazy(() => import("../pages/Home"));
const Shop = lazy(() => import("../pages/Shop"));
const Cart = lazy(() => import("../pages/Cart"));
const Profile = lazy(() => import("../pages/account/Profile"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const Dashboard = lazy(() => import("../pages/account/Dashboard"));
const AddProduct = lazy(() => import("../pages/admin/AddProduct"));
const EditProduct = lazy(() => import("../pages/admin/EditProduct"));

// Global Loading Component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
  </div>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { 
        path: "/", 
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ) 
      },
      { 
        path: "/Shop/:category", 
        element: (
          <Suspense fallback={<PageLoader />}>
            <Shop />
          </Suspense>
        ) 
      },
      { 
        path: "/About", 
        element: (
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        ) 
      },
      { 
        path: "/contact", 
        element: (
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        ) 
      },
      { 
        path: "/Login", 
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthPage />
          </Suspense>
        ) 
      },
      { 
        path: "/register", 
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthPage />
          </Suspense>
        ) 
      },
      { 
        path: "/Wishlist", 
        element: (
          <Suspense fallback={<PageLoader />}>
            <Wishlist />
          </Suspense>
        ) 
      },
      { 
        path: "/Cart", 
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cart />
          </Suspense>
        ) 
      },
      
// Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          { 
            path: "/Profile", 
            element: (
              <Suspense fallback={<PageLoader />}>
                <Profile />
              </Suspense>
            ) 
          },
        ],
      },
      // Admin Routes
      {
        element: <AdminRoute />,
        children: [
          { 
            path: "/dashboard", 
            element: (
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            ) 
          },
          { 
            path: "/dashboard/products/add", 
            element: (
              <Suspense fallback={<PageLoader />}>
                <AddProduct />
              </Suspense>
            ) 
          },
          { 
            path: "/dashboard/products/edit/:id", 
            element: (
              <Suspense fallback={<PageLoader />}>
                <EditProduct />
              </Suspense>
            ) 
          },
        ],
      },
    ],
  },
  { 
    path: "*", 
    element: (
      <Suspense fallback={<PageLoader />}>
        <ErrorPage />
      </Suspense>
    ) 
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
