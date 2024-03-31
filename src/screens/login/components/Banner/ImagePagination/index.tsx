import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useBanner } from "../../../../../contexts/Banner/BannerContext";
import { ImageIndicatorsProps } from "../../../types";

const ImageIndicators = ({
  totalImages,
  currentImage,
  onChangeImage,
}: ImageIndicatorsProps) => (
  <>
    {Array.from({ length: totalImages }).map((_, index) => (
      <div
        key={index}
        className={`h-1 w-full rounded cursor-pointer ${
          index === currentImage ? "bg-white" : "bg-gray-500"
        }`}
        onClick={() => onChangeImage(index)}
      ></div>
    ))}
  </>
);

export default function ImagePagination() {
  const { currentImage, images, changeImage, nextImage, prevImage } =
    useBanner();
  const totalImages = images.length;

  return (
    <div className="flex items-center justify-start w-full mt-10">
      <div className="flex items-center justify-center w-1/3 gap-3">
        <ImageIndicators
          totalImages={totalImages}
          currentImage={currentImage}
          onChangeImage={changeImage}
        />
      </div>
      <div className="flex items-center justify-end w-2/3 h-10">
        <IoIosArrowBack
          size={30}
          className={`cursor-pointer ${
            currentImage === 0
              ? "text-gray-400 cursor-not-allowed pointer-events-none"
              : "text-white"
          }`}
          onClick={prevImage}
        />
        <IoIosArrowForward
          size={30}
          className={`cursor-pointer ${
            currentImage === totalImages - 1
              ? "text-gray-400 cursor-not-allowed pointer-events-none"
              : "text-white"
          }`}
          onClick={nextImage}
        />
      </div>
    </div>
  );
}
