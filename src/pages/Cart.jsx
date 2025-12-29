import { useEffect, useState } from "react";
import {
  getCart,
  updateQty,
  removeFromCart,
  clearCart,
  formatRupiah,
  getTotalQty,
  getTotalPrice,
  getFinalPrice,
  getTotalFinalPrice
} from "../utils/cart";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Swal from "sweetalert2";
import Navbar from "./components/Navbar";



export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleUpdateQty = (id, type) => {
    updateQty(id, type);
    setCart(getCart()); // ⬅️ PENTING
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleClear = () => {
    clearCart();
    setCart([]);
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT - CART ITEMS */}
        <div className="lg:col-span-8 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border rounded-lg p-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-orange-500" />
              <span className="font-medium">Pilih Semua</span>
            </label>

            <div className="text-sm text-orange-500 flex gap-4">
              <button>Pindahkan ke wishlist</button>
              <button onClick={() => {
              Swal.fire({
                title: "Hapus semua produk ?",
                text: "Cek terlebih dahulu sebelum menghapus semua produk",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Hapus semua produk",
                cancelButtonText: "Batal"
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Semua Produk Terhapus", "", "success");
                    handleClear();
                  console.log("Semua Produk Terhapus dari keranjang");
                }
              });
            }}
            className="hover:bg-gray-100 p-2 rounded">Hapus Semua Produk</button>
            </div>
          </div>

          {/* Store */}
          <div className="border rounded-lg p-4 space-y-4">
            <label className="flex items-center gap-2 font-medium">
              Item dari Toko Pixel Store
            </label>

            {/* Item */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {cart.length === 0 && (
                <p className="col-span-12 text-center h-20">Keranjang Anda kosong.</p>
                )}
            {cart.map((item) => (
              <div key={item._id} className="sm:col-span-12 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <img
                    src={item.image}
                    alt="product"
                    className="w-full max-h-50 rounded-xl sm:col-span-3 object-cover sm:h-26"
                />

                <div className="sm:col-span-4">
                    <p className="font-medium">
                    {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.category}</p>

                    <div className="flex items-center gap-2 mt-1">
                    <span className="text-orange-500 font-semibold">
                        Rp {formatRupiah(getFinalPrice(item))}
                    </span>
                    {/* harga sebelum diskon */}
                    {/* <span className="line-through text-gray-400 text-sm">
                        {formatRupiah(item.priceBeforeDiscount)}
                    </span> */}
                    {/* diskon */}
                    <span className={`text-xs bg-red-500 text-white px-2 py-0.5 rounded-full ${item.discount > 0 ? '' : 'hidden'} `}>
                        {item.discount}%
                    </span>
                    </div>

                    <button className="text-xs text-orange-500 mt-2">
                    Tambah Catatan
                    </button>
                </div>

                {/* Actions */}
                <div className="col-span-1 sm:col-span-5 flex justify-start sm:justify-end items-center gap-3">
                    <button onClick={() => {
              Swal.fire({
                title: "Hapus Produk dari Keranjang",
                text: "Coba pindahkan ke wishlist, siapa tahu nanti kamu butuh produk ini",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Hapus Barang",
                cancelButtonText: "Pindahkan ke Wishlist"
              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("Terhapus!", "", "success");
                    handleRemove(item._id)
                  console.log("Terhapus dari keranjang");
                }
              });
            }} className="p-2 rounded-full hover:bg-gray-100">
                        <FaRegTrashAlt />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <MdOutlineFavoriteBorder />
                    </button>

                    <div className="flex border rounded-md overflow-hidden">
                        <button className="px-3" onClick={() => handleUpdateQty(item._id, "dec")}>-</button>
                        <span className="px-4 flex items-center">{item.qty}</span>
                        <button className="px-3" onClick={() => handleUpdateQty(item._id, "inc")}>+</button>
                    </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="lg:col-span-4">
          <div className="border rounded-lg p-4 sticky top-20">
            <h2 className="font-semibold mb-4">
              Detail Rincian Pembayaran
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal Harga {getTotalQty()} produk</span>
                <span>Rp.{formatRupiah(getTotalFinalPrice())}</span>
              </div>
            {/* Promo Produk */}
              {/* <div className="flex justify-between text-red-500">
                <span>Promo Produk</span>
                <span>-Rp11.394.600</span>
              </div> */}

              <hr />

              <div className="flex justify-between font-semibold text-base">
                <span>Total Pembayaran</span>
                <span>Rp.{formatRupiah(getTotalFinalPrice())}</span>
              </div>

              <p className="text-xs text-gray-500">
                Belum termasuk ongkos kirim
              </p>
            </div>

            <button
              onClick={() => {
                const token = localStorage.getItem("token");
                const user = localStorage.getItem("user");

                if (!token || !user) {
                  return window.location.href = "/auth"; // Redirect ke login
                }

                Swal.fire({
                  title: "Pembayaran",
                  text: "Apakah Anda yakin ingin melanjutkan pembayaran?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ya, Lanjutkan!",
                  cancelButtonText: "Batal",
                }).then((result) => {
                  if (result.isConfirmed) {
                    console.log("Payment confirmed");
                  }
                });
              }}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Lanjut Bayar
            </button>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}
