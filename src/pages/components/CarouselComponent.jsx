import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useProducts from "@/hooks/useProducts";
import { Link } from "react-router-dom";
import { addToCart, formatRupiah } from "@/utils/cart";
import toast from "react-hot-toast";

export default function CarouselComponent() {
  const { products, loading } = useProducts();

  const discountedProducts = products.filter(
    (product) => product.discount > 0
  );

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {loading ? (
          <CarouselItem className="basis-full text-center p-4">
            Loading products...
          </CarouselItem>
        ) : (
          discountedProducts.map((product) => (
            <CarouselItem
              key={product._id}
              className="basis-1/3 lg:basis-1/4"
            >
              <Link
                to={`/product/${product._id}`}
                className="flex flex-col justify-between rounded-2xl p-4 bg-white shadow-md hover:shadow-lg transition duration-300"
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
                  <p className="text-[11px] text-gray-500">
                    {product.category}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] text-gray-500 ${
                        product.discount > 0 ? "line-through" : ""
                      }`}
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
                      Rp{" "}
                      {formatRupiah(
                        product.basePrice -
                          (product.basePrice * product.discount) / 100
                      )}
                    </p>
                  )}

                  <p className="text-[10px] text-gray-600 mt-1">
                    Stock {product.stock}
                  </p>
                </div>
              </Link>

              {/* Button (Dipisah dari Link untuk A11y & Click Behavior) */}
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success("Berhasil ditambahkan ke keranjang!");}}
                className="mt-3 z-20 w-full py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-700 hover:shadow-lg transition-transform duration-200"
              >
                Beli Sekarang
              </button>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
    </Carousel>
  );
}
