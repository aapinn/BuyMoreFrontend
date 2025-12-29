import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/components/ProductDetail";
import { Toaster } from "react-hot-toast";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      {/* Toaster harus diluar Routes */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/auth" element={<AuthPage/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
