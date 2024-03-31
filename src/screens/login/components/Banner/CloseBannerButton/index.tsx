import { IoIosArrowBack } from "react-icons/io";
import { useBanner } from "../../../../../contexts/Banner/BannerContext";

export default function CloseBannerButton() {
  const { toggleBanner } = useBanner();
  return (
    <button
      className="w-10 h-10 flex items-center justify-center border rounded-full text-white bg-transparent border-white  hover:border-black hover:text-black"
      onClick={() => toggleBanner()}
    >
      <IoIosArrowBack />
    </button>
  );
}
