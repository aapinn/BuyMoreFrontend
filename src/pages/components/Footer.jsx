import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaPinterest, FaLinkedin } from "react-icons/fa";
import { SiAppstore, SiGoogleplay } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* Footer Top */}
      <div className="max-w-7xl mx-auto px-6 py-10 
grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 
gap-8 text-sm">

        {/* Logo + Desc */}
        <div className="md:col-span-2 lg:col-span-1">
          <h2 className="text-lg font-semibold text-orange-600 mb-2">BuyMore</h2>
          <p className="text-xs">
            Beli makan gausah ribet, semua ada di BuyMore!
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-3 text-xl text-gray-600">
            <FaInstagram className="hover:text-orange-600 transition" />
            <FaFacebook className="hover:text-orange-600 transition" />
            <FaYoutube className="hover:text-orange-600 transition" />
            <FaTiktok className="hover:text-orange-600 transition" />
            <FaPinterest className="hover:text-orange-600 transition" />
            <FaLinkedin className="hover:text-orange-600 transition" />
          </div>
        </div>

        {/* Layanan Konsumen */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Layanan Konsumen</h4>
          <ul className="space-y-2 text-xs">
            <li>Pusat Bantuan</li>
            <li>Program Cicilan & Paylater</li>
            <li>ruparupa bisnis</li>
            <li>Custom Furniture</li>
          </ul>
        </div>

        {/* Tentang */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">ruparupa</h4>
          <ul className="space-y-2 text-xs">
            <li>Tentang Kami</li>
            <li>Blog</li>
            <li>Syarat & Ketentuan</li>
            <li>Kebijakan Privasi</li>
            <li>E-catalogue</li>
            <li>Kata Kunci Populer</li>
            <li>Affiliate</li>
          </ul>
        </div>

        {/* Hubungi Kami */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Hubungi Kami</h4>
          <ul className="text-xs space-y-1">
            <li><span className="font-semibold">Live Chat</span> 09:00 - 22:00 WIB</li>
            <li>
              <span className="font-semibold">Email:</span> help@ruparupa.com
            </li>
            <li>
              <span className="font-semibold">Phone:</span> +6285574800511
            </li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Download Aplikasi</h4>
          <div className="flex flex-col gap-2 w-32">
            <a href="#" className="flex items-center gap-2 bg-black text-white py-2 px-3 rounded-lg text-xs">
              <SiAppstore /> App Store
            </a>
            <a href="#" className="flex items-center gap-2 bg-black text-white py-2 px-3 rounded-lg text-xs">
              <SiGoogleplay /> Google Play
            </a>
          </div>
        </div>

          {/* Newsletter */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <h4 className="font-semibold mb-2 text-gray-900 text-sm">
            Daftar Newsletter
          </h4>
          <p className="text-xs py-2">Jadilah orang yag pertama yang mendapatkan informasi diskon dan penawaran menarik dari buyMore</p>
          <div className="flex gap-1 w-full">
            <input
              type="email"
              placeholder="Email kamu"
              className="text-xs p-2 border border-gray-400 rounded-lg w-full focus:ring-1 focus:ring-orange-500"
            />
            <button className="bg-orange-600 text-white text-xs px-4 rounded-lg hover:bg-orange-700">
              Kirim
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-300 py-4 text-center text-xs text-gray-600">
        Powered by <span className="font-semibold hover:text-amber-600">aa.pinn</span>
      </div>
    </footer>
  );
}
