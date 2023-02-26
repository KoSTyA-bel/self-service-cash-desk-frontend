import HomePage from "./pages/HomePage/HomePage";

import { Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckPage from "./pages/CheckPage/CheckPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Products from "./pages/AdminPage/Administration/Products";
import ProductCreate from "./pages/AdminPage/Administration/ProductCreate";
import SelfCheckouts from "./pages/AdminPage/Administration/SelfCheckouts";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProductUpdate from "./pages/AdminPage/Administration/ProductUpdate";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import Cards from "./pages/AdminPage/Administration/Cards";
import CardCreate from "./pages/AdminPage/Administration/CardCreate";
import CardUpdate from "./pages/AdminPage/Administration/CardUpdate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/check" element={<CheckPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/create" element={<ProductCreate />} />
        <Route path="/admin/products/update" element={<ProductUpdate />} />
        <Route path="/admin/selfCheckouts" element={<SelfCheckouts />} />
        <Route path="/admin/cards" element={<Cards />} />
        <Route path="/admin/cards/create" element={<CardCreate />} />
        <Route path="/admin/cards/update" element={<CardUpdate />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
