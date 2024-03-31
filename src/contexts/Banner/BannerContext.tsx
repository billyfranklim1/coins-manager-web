import React, { createContext, useContext, useState } from "react";
import { BannerContextType } from "./types.props";

const BannerContext = createContext<BannerContextType>({
  images: [],
  isOpen: true,
  currentImage: 0,
  toggleBanner: () => {},
  changeImage: () => {},
  nextImage: () => {},
  prevImage: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useBanner = () => useContext(BannerContext);

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const images = ["banner.png", "banner-2.png", "banner-3.png"];

  const [isOpen, setOpen] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const toggleBanner = () => setOpen(!isOpen);

  const changeImage = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentImage(newIndex);
    }
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
    <BannerContext.Provider
      value={{
        images,
        isOpen,
        currentImage,
        toggleBanner,
        changeImage,
        nextImage,
        prevImage,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};
