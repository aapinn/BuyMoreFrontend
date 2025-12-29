import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "@/services/api";
import { addToCart } from "@/utils/cart";
import { formatRupiah } from "@/utils/cart";
import { Heart, Share2, Minus, Plus } from "lucide-react";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    getProducts().then((data) => {
      const found = data.find((p) => p._id === id);
      setProduct(found || null);
      setMainImage(found?.image);
    });
  }, [id]);

  if (!product) return <p className="p-6">Produk tidak ditemukan...</p>;

  const finalPrice =
    product.discount > 0
      ? product.basePrice - (product.basePrice * product.discount) / 100
      : product.basePrice;

  const subtotal = finalPrice * quantity;

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:px-18">
      
      {/* LEFT: Gallery */}
      <div className="flex flex-col gap-3 col-span-2">
        <img
          src={mainImage}
          className="rounded-lg shadow w-full h-96 object-cover"
        />

        <div className="flex gap-2 overflow-x-auto">
          {[product.image, ...(product.images || [])].map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 rounded-md cursor-pointer border ${
                mainImage === img ? "border-orange-600" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* PRODUK INFO SECTION */}
        <div className="bg-white p-5 rounded-xl shadow mt-4">
          
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p className="text-sm text-gray-500">Brand: {product.brand || "Official"}</p>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-bold text-orange-600">
              Rp {formatRupiah(finalPrice)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="line-through text-sm text-gray-400">
                  Rp {formatRupiah(product.basePrice)}
                </span>
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          {/* TABS */}
          <div className="mt-5 border-b flex gap-6 text-sm">
            <button
              className={`pb-2 ${
                activeTab === "specs"
                  ? "border-b-2 border-orange-600 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("specs")}
            >
              Spesifikasi Produk
            </button>
            <button
              className={`pb-2 ${
                activeTab === "info"
                  ? "border-b-2 border-orange-600 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("info")}
            >
              Informasi Produk
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-700 leading-6">
            {activeTab === "specs" ? (
              <p>{product.description || "Belum ada informasi produk"}</p>
            ) : (
              <p>{product.info || "Belum ada informasi tambahan"}</p>
            )}
          </div>

        </div>
      </div>

      {/* RIGHT: BUY CARD */}
      <div className="bg-white p-4 rounded-xl shadow-lg h-fit sticky top-20">
        
        {/* Quantity */}
        <p className="text-sm font-medium mb-2">Atur Jumlah</p>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-2 border rounded-lg"
          >
            <Minus size={18} />
          </button>

          <span className="text-lg font-semibold">{quantity}</span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="p-2 border rounded-lg"
          >
            <Plus size={18} />
          </button>
        </div>

        <p className="text-sm">Subtotal:</p>
        <p className="text-xl font-bold text-orange-600">
          Rp {formatRupiah(subtotal)}
        </p>

        <div className="flex flex-col gap-2 mt-5">
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium">
            Beli Sekarang
          </button>
          <button
            onClick={() => {
            toast.success("Berhasil ditambahkan ke keranjang!");
            addToCart(product, quantity)}}
            
            className="w-full border border-orange-600 py-3 rounded-lg text-orange-600 font-medium"
          >
            + Keranjang
          </button>
        </div>

        {/* Wishlist & Share */}
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <button className="flex items-center gap-1 hover:text-orange-600">
            <Heart size={16} /> Wishlist
          </button>
          <button className="flex items-center gap-1 hover:text-orange-600">
            <Share2 size={16} /> Share
          </button>
        </div>

      </div>

    </div>
    </>
  );
}
