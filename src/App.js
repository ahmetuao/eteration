import "./App.css";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products/Products";
import Home from "./components/Home/Home";
import ProductDetails from "./pages/Products/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:productId/details"
          element={<ProductDetails />}
        />
      </Route>
    </Routes>
  );
}

export default App;
