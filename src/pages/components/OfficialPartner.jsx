export default function CategoryIcons() {
const categories = [
  {
    name: "ruparupa bisnis",
    icon: "🔗",
    isNew: true,
  },
  {
    name: "Best Deals",
    icon: "💸",
  },
  {
    name: "Furniture",
    icon: "🛋️",
  },
  {
    name: "Rak & Penyimpanan",
    icon: "🗄️",
  },
  {
    name: "Dapur Minimalis",
    icon: "🍳",
  },
  {
    name: "Dekorasi Rumah",
    icon: "🖼️",
  },
  {
    name: "Kamar Tidur",
    icon: "🛏️",
  },
  {
    name: "Kamar Mandi",
    icon: "🚿",
  },
  {
    name: "Ruang Tamu",
    icon: "🛋️",
  },
  {
    name: "Peralatan Elektronik",
    icon: "📺",
  },
  {
    name: "Lampu & Pencahayaan",
    icon: "💡",
  },
  {
    name: "Peralatan Kantor",
    icon: "🖥️",
  },
  {
    name: "Alat Kebersihan",
    icon: "🧹",
  },
  {
    name: "Perlengkapan Bayi",
    icon: "👶",
  },
  {
    name: "Olahraga & Outdoor",
    icon: "🏕️",
  },
  {
    name: "Hobi & Gaya Hidup",
    icon: "🎨",
  },
  {
    name: "Fashion",
    icon: "👕",
  },
  {
    name: "Sepatu & Aksesoris",
    icon: "👟",
  },
  {
    name: "Travel & Organizer",
    icon: "🧳",
  },
  {
    name: "Promo Hari Ini",
    icon: "🔥",
  },
];


  return (
    <div className="w-full py-2 overflow-x-auto scrollbar-hide">
      <div className="flex min-w-max">
        {categories.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center w-18"
          >
            <div className="relative">
              {/* Icon box */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl border border-neutral-200 bg-white text-xl">
                {item.icon}
              </div>

              {/* Badge NEW */}
              {item.isNew && (
                <span className="absolute -top-2 -right-2 text-[8px] bg-blue-500 text-white px-2 py-0.5 rounded-full">
                  New
                </span>
              )}
            </div>

            {/* Text */}
            <p className="h-10 flex text-center items-center text-[10px] w-fit leading-tight">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
