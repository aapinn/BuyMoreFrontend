import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        
        // 🔥 Simpan semua produk ke LocalStorage untuk Search di Navbar
        localStorage.setItem("products", JSON.stringify(data));

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { products, loading };
}
