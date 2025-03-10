
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Addproducts from "./components/products/Addproducts";
import { AdminLayout } from "./layouts/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ProductEdit from "./components/products/ProductEdit"
import ProductDetails from "./components/products/ProductDetails";
import Customers from "./components/customers/customers";
import Order from "./components/orders/order";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Protected Admin Panel Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout><Dashboard /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute>
              <AdminLayout><Products /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/products/new" element={
            <ProtectedRoute>
              <AdminLayout><Addproducts /></AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/admin/products/:id" element={
            <ProtectedRoute>
              <AdminLayout><ProductDetails /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/products/new" element={
            <ProtectedRoute>
              <AdminLayout><Products /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/products/edit/:id" element={
            <ProtectedRoute>
              <AdminLayout><ProductEdit /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/customers" element={
            <ProtectedRoute>
              <AdminLayout><Customers /></AdminLayout>
            </ProtectedRoute>
          } />
           <Route path="/admin/orders" element={
            <ProtectedRoute>
              <AdminLayout><Order /></AdminLayout>
            </ProtectedRoute>
          } />



         
          
          {/* Redirect /admin/* routes to admin dashboard when not explicitly defined */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Navigate to="/admin" replace />
            </ProtectedRoute>
          } />
          
          {/* Catch-all 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
