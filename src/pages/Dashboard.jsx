import useProducts from "../hooks/useProducts";
import { addToCart, formatRupiah } from "../utils/cart";
import azkoBanner from "@/assets/azko-banner.webp";
import informaBanner from "@/assets/informa-banner.webp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import CarouselComponent from "./components/CarouselComponent"
import AnimatedCarousel from "@/components/ui/AnimatedCarousel";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import OfficialPartner from "./components/OfficialPartner";
import CategoryIcons from "./components/CategoryIcons";

export default function Dashboard() {
  const { products, loading } = useProducts();
  
  return (
    <div className="">
      <div className="mx-auto item-center rounded-3xl bg-white">
        {/* navbar */}
          <Navbar />
        {/* main content */}
        <div className="grid max-w-7xl mt-2 mx-auto grid-cols-12 gap-6 px-4 xl:px-18">
          <main className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12 ">
            {/* Promotion Banner */}
            <Carousel>
              <CarouselContent className={`m-0 p-0`}>
                <img
                  src={azkoBanner}
                  alt="Promotion Banner 1"
                  className="w-full rounded-xl"
                />
                <img
                  src={informaBanner}
                  alt="Promotion Banner 2"
                  className="w-full  rounded-xl"
                />
              </CarouselContent>
            </Carousel>
            <button className="w-full text-[10px] py-2 text-right font-semibold text-orange-400 hover:text-orange-600">Lihat Semua Promo</button>

            {/* Official Partner */}
            <h1 className="font-semibold text-xs md:text-md lg:text-lg xl:text-xl w-fit rounded-2xl rounded-b-none  ">Official Partner</h1>
            <OfficialPartner/>
            <hr />
            <CategoryIcons />
            <hr />

            {/* Product Grid */}
            {/* <h1 className="font-semibold pt-2 text-md md:text-md lg:text-lg xl:text-lg w-fit rounded-2xl rounded-b-none px-5 bg-amber-300">
              Penawaran Spesial Hari Ini
            </h1>
            <div className="w-full px-5 p-5 bg-amber-300 rounded-tl-none rounded-3xl">
              <AnimatedCarousel component={<CarouselComponent/>}/>
            </div> */}

            <h1 className="font-semibold py-2 text-xs md:text-md lg:text-lg xl:text-xl w-fit rounded-2xl rounded-b-none  ">Semua Produk</h1>
            <div className="
              grid grid-cols-2 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              xl:grid-cols-4 
              gap-4 md:gap-6 
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
                        rounded-xl bg-white
                        shadow-md hover:shadow-lg
                        transition duration-300
                      "
                    >
                      {/* Image */}
                      <div className="w-full h-30 sm:h-45 rounded-lg rounded-b-none overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Title */}
                      <div className="mt-3 p-2">
                        <h5 className="text-xs md:text-sm font-semibold text-gray-900 leading-tight">
                          {product.name}
                        </h5>
                        <p className="text-[8px] md:text-xs text-gray-500">{product.category}</p>
                      </div>

                      {/* Price */}
                      <div className="px-2 py-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`
                              text-[8px] md:text-xs text-gray-500
                              ${product.discount > 0 ? "line-through" : ""}
                            `}
                          >
                            Rp {formatRupiah(product.basePrice)}
                          </span>

                          {product.discount > 0 && (
                            <span className="text-[8px] md:text-xs font-semibold text-red-600">
                              -{product.discount}%
                            </span>
                          )}
                        </div>

                        {product.discount > 0 && (
                          <p className="text-xs font-bold text-red-600">
                            Rp {formatRupiah(
                              product.basePrice -
                                (product.basePrice * product.discount) / 100
                            )}
                          </p>
                        )}

                        <p className="text-[8px] md:text-xs text-gray-600 mt-1">
                          Stock {product.stock}
                        </p>
                        <button
                        onClick={() => addToCart(product)}
                        className="
                          mt-3 w-full p-2 rounded-lg 
                          bg-amber-600 text-white text-[10px] sm:text-sm font-semibold
                          hover:bg-amber-700 hover:shadow-lg 
                          transition-transform duration-200
                        "
                      >
                        Beli Sekarang
                        </button>
                      </div>
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
