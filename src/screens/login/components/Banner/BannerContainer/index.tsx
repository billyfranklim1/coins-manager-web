import CloseBannerButton from "../CloseBannerButton";
import Content from "../Content";
import ImagePagination from "../ImagePagination";
import { useBanner } from "../../../../../contexts/Banner/BannerContext";
import classNames from 'classnames';

export default function BannerContainer() {
  const { isOpen, images, currentImage } = useBanner();

  const containerClasses = classNames(
    'bg-cover hidden lg:block md:block', {
      'w-2/3': isOpen,
      'w-0': !isOpen,
    }
  );

  return (
    <div
      className={containerClasses}
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      {isOpen && (
        <div className="h-full flex flex-col justify-between p-5">
          <CloseBannerButton />
          <div className="text-white flex flex-col justify-end">
            <Content />
            <ImagePagination />
          </div>
        </div>
      )}
    </div>
  );
}
