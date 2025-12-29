import useProducts from "../hooks/useProducts";
import { addToCart, formatRupiah } from "../utils/cart";
import PromotionTGVSL from "../assets/PromotionTGVSL.jpg";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import CarouselComponent from "./components/CarouselComponent"
import AnimatedCarousel from "@/components/ui/AnimatedCarousel";


export default function Dashboard() {
  const { products, loading } = useProducts();
  
  return (
    <div className="">
      <div className="mx-auto rounded-3xl bg-white">
        {/* navbar */}
          <Navbar />
        {/* main content */}
        <div className="grid max-w-7xl mx-auto grid-cols-12 gap-6 px-4 xl:px-18">
          <main className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12 py-6">
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-1 md:h-60" >
              <button className="rounded-3xl shadow-md cursor-pointer relative min-h-40 md:min-h-30 bg-green-200 p-2 bg-cover" style={{backgroundImage:`url(${PromotionTGVSL})`}}></button>
            </div>
            <button className="w-full text-right pr-5 text-sm font-semibold text-orange-400 hover:text-orange-600">Lihat Semua Promo</button>

            {/* Product Grid */}
            <h1 className="font-semibold pt-2 text-md md:text-md lg:text-lg xl:text-lg w-fit rounded-2xl rounded-b-none px-5 bg-amber-300">
              Penawaran Spesial Hari Ini
            </h1>
            <div className="w-full px-5 p-5 bg-amber-300 rounded-tl-none rounded-3xl">
            <AnimatedCarousel/>
            </div>

            <h1 className="font-semibold pt-10 text-sm md:text-md lg:text-lg xl:text-xl w-fit rounded-2xl rounded-b-none px-5 ">Semua Produk</h1>
            <div className="
              grid grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              xl:grid-cols-4 
              gap-6 p-5 
              rounded-3xl
            ">
              {loading ? (
                <p>Loading products...</p>
              ) : (
                products
                  .map((product, i) => (
                    <Link
                      to={`/product/${product._id}`}
                      key={i}
                      className="
                        flex flex-col justify-between
                        rounded-2xl p-4 bg-white
                        shadow-md hover:shadow-lg
                        transition duration-300
                      "
                    >
                      {/* Image */}
                      <div className="w-full h-45 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Title */}
                      <div className="mt-3">
                        <h5 className="text-sm font-semibold text-gray-900 leading-tight">
                          {product.name}
                        </h5>
                        <p className="text-[11px] text-gray-500">{product.category}</p>
                      </div>

                      {/* Price */}
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`
                              text-[11px] text-gray-500
                              ${product.discount > 0 ? "line-through" : ""}
                            `}
                          >
                            Rp {formatRupiah(product.basePrice)}
                          </span>

                          {product.discount > 0 && (
                            <span className="text-[11px] font-semibold text-red-600">
                              -{product.discount}%
                            </span>
                          )}
                        </div>

                        {product.discount > 0 && (
                          <p className="text-sm font-bold text-red-600">
                            Rp {formatRupiah(
                              product.basePrice -
                                (product.basePrice * product.discount) / 100
                            )}
                          </p>
                        )}

                        <p className="text-[10px] text-gray-600 mt-1">
                          Stock {product.stock}
                        </p>
                      </div>


                      {/* Button */}
                      <button
                        onClick={() => addToCart(product)}
                        className="
                          mt-3 w-full py-2 rounded-lg 
                          bg-amber-600 text-white text-sm font-semibold
                          hover:bg-amber-700 hover:shadow-lg 
                          transition-transform duration-200
                        "
                      >
                        Beli Sekarang
                      </button>
                    </Link>
                  ))
              )}
            </div>
          </main>
        </div>
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
}
