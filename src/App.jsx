import HomePage from "./pages/HomePage/HomePage";

import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckPage from "./pages/CheckPage/CheckPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Products from "./pages/AdminPage/Administration/Products";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/check" element={<CheckPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
