import { IoIosArrowForward } from "react-icons/io";
import { useBanner } from "../../../../../contexts/Banner/BannerContext";

function CloseBannerButton() {
  const { toggleBanner } = useBanner();

  return (
    <div className="absolute left-5 hidden lg:block md:block">
      <button
        className="mt-5 w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-700 flex items-center justify-center  dark:text-white dark:bg-blue-500 dark:hover:bg-blue-700"
        onClick={toggleBanner}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default CloseBannerButton;
