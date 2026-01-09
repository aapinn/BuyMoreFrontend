import ataru from "@/assets/partnerLogo/ataru.webp";
import azko from "@/assets/partnerLogo/azko.webp";
import eyeSoul from "@/assets/partnerLogo/eyeSoul.webp";
import informa from "@/assets/partnerLogo/informa.webp";
import informaElectronic from "@/assets/partnerLogo/informaElectronic.webp";
import krisbow from "@/assets/partnerLogo/krisbow.webp";
import pendopo from "@/assets/partnerLogo/pendopo.webp";
import petkingdoms from "@/assets/partnerLogo/petkingdoms.webp";
import rolka from "@/assets/partnerLogo/rolka.webp";
import selma from "@/assets/partnerLogo/selma.webp";
import toyskingdom from "@/assets/partnerLogo/toyskingdom.webp";
import { Link } from "react-router-dom";

const partnerLogo = {
    ataru,
    azko,
    eyeSoul,
    informa,
    informaElectronic,
    krisbow,
    pendopo,
    petkingdoms,
    rolka,
    selma,
    toyskingdom,
};
export default function OfficialPartners() {
  const partners = [
    {
      name: "AZKO",
      logo: partnerLogo.azko,
      url: "https://www.ruparupa.com/search?search=AZKO",
    },
    {
      name: "INFORMA",
      logo: partnerLogo.informa,
      url: "https://www.ruparupa.com/informastore",
    },
    {
      name: "INFORMA Electronics",
      logo: partnerLogo.informaElectronic,
      url: "https://www.ruparupa.com/search?search=INFORMA+Electronics",
    },
    {
      name: "Toys Kingdom",
      logo: partnerLogo.toysKingdom,
      url: "https://www.ruparupa.com/toyskingdomonline",
    },
    {
      name: "Pet Kingdom",
      logo: partnerLogo.petKingdom,
      url: "https://www.ruparupa.com/search?search=Pet+Kingdom",
    },
    {
      name: "SELMA",
      logo: partnerLogo.selma,
      url: "https://www.ruparupa.com/search?search=SELMA",
    },
    {
      name: "ATARU",
      logo: partnerLogo.ataru,
      url: "https://www.ruparupa.com/search?search=ATARU",
    },
    {
      name: "Pendopo",
      logo: partnerLogo.pendopo,
      url: "https://www.ruparupa.com/search?search=Pendopo",
    },
    {
      name: "Krisbow",
      logo: partnerLogo.krisbow,
      url: "https://www.ruparupa.com/search?search=Krisbow",
    },
    {
      name: "ROLLKA",
      logo: partnerLogo.rolka,
      url: "https://www.ruparupa.com/search?search=ROLKA",
    },
    {
      name: "EYE SOUL",
      logo: partnerLogo.eyeSoul,
      url: "https://www.ruparupa.com/search?search=EYE+SOUL",
    },
  ];

  return (
    <div className="w-full py-2 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 md:space-x-6">
        {partners.map((item) => (
          <Link
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2 items-center text-center w-28"
          >
            <div className="w-25 md:w-40 h-20 flex items-center justify-center rounded-xl bg-white">
              <img
                src={item.logo}
                alt={item.name}
                className="max-w-full max-h-full object-contain "
              />
            </div>

            <p className="flex items-center text-[10px] leading-tight mt-1">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
