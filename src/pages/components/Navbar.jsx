import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Bell, User } from "lucide-react";
import NavMenu from "./NavMenu";
import { formatRupiah, getCart } from "@/utils/cart";
import { logoutUser, getUser } from "@/services/authService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const updateUser = () => {
    const storedUser = getUser();
    setUser(storedUser);
    setIsLogin(!!storedUser);
  };

  useEffect(() => {
    updateUser();

    window.addEventListener("user:login", updateUser);
    window.addEventListener("user:logout", updateUser);

    return () => {
      window.removeEventListener("user:login", updateUser);
      window.removeEventListener("user:logout", updateUser);
    };
  }, []);

  useEffect(() => {
    const update = () => setCount(getCart().length);
    update();
    window.addEventListener("cart:update", update);
    return () => window.removeEventListener("cart:update", update);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const filtered = products.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    setSearchResults(filtered);
  };

  const handleLogout = () => {
    logoutUser(); // remove localStorage + dispatch event
  };

  return (
    <header className="w-full bg-white sticky md:pb-5 top-0 z-50 flex-col shadow-md">
      <div className="max-w-7xl mx-auto hidden md:flex px-4 2xl:px-0 py-5 items-center gap-6 justify-between">
        <nav className="flex gap-4">
          <Link to="/" className="flex text-xs items-center gap-2 font-bold text-orange-600">
            Download Aplikasi Buymore
          </Link>
          <Link to="/" className="flex text-xs items-center gap-2 font-bold text-orange-600">
            Buymore.com
          </Link>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 2xl:px-0 flex items-center gap-6 py-3">
        <Link to="/" className="hidden md:flex items-center gap-2 font-bold text-xl text-orange-600">
          🛒 BuyMore
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link className="hover:text-orange-600 border-b-2 border-orange-600">Kategori</Link>
          <Link className="hover:text-orange-600">Inspirasi</Link>
        </nav>

        <div className="flex-1 relative flex">
          <input
            type="text"
            placeholder="Cari barang..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border rounded-l-lg px-4 py-2 text-sm focus:outline-none"
          />
          <button className="bg-orange-600 px-4 rounded-r-lg flex items-center justify-center">
            <Search className="text-white" size={18} />
          </button>

          {searchTerm && (
            <div className="absolute left-0 right-0 top-full bg-white border rounded-md p-2 mt-1 shadow-lg z-50 text-sm max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((item) => {
                  const hasDiscount = item.discount > 0;
                  const finalPrice = hasDiscount ? item.basePrice - (item.basePrice * item.discount) / 100 : item.basePrice;
                  return (
                    <Link
                      key={item._id}
                      to={`/product/${item._id}`}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    >
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                      <div className="flex-1">
                        <p className="font-medium text-xs text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-gray-500">{item.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-orange-600 font-bold">Rp {formatRupiah(finalPrice)}</span>
                          {hasDiscount && (
                            <>
                              <span className="line-through text-[10px] text-gray-400">Rp {formatRupiah(item.basePrice)}</span>
                              <span className="text-[10px] bg-red-500 text-white px-1 py-px rounded-sm">-{item.discount}%</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="text-gray-500 p-2 text-xs">Tidak ditemukan</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} className="text-gray-700" />
            {count > 0 && <Badge className="absolute -top-2 -right-2 text-[10px] min-w-5 justify-center">{count}</Badge>}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Bell size={20} className="text-gray-700 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 mr-6">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            {user ? (
              <DropdownMenuTrigger asChild>
                <button className="text-sm font-semibold text-gray-700 cursor-pointer">Hi, {user?.username || "User"} 👋</button>
              </DropdownMenuTrigger>
            ) : (
              <DropdownMenuTrigger asChild>
                <button><User size={20} className="text-gray-700 cursor-pointer" /></button>
              </DropdownMenuTrigger>
            )}

            <DropdownMenuContent className="w-50 mr-6">
              {!isLogin ? (
                <>
                  <DropdownMenuLabel>Selamat Datang!</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to="/auth">Login</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/auth">Register</Link></DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/orders">Pesanan</Link></DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <NavMenu />
    </header>
  );
}

export default Navbar;
