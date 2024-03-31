export interface BannerContextType {
  isOpen: boolean;
  currentImage: number;
  images: string[];
  toggleBanner: () => void;
  changeImage: (newIndex: number) => void;
  nextImage: () => void;
  prevImage: () => void;
}