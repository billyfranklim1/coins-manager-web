export interface Login {
  username: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface BannerContainerProps {
  images: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export interface ImagePaginationProps {
  totalImages: number;
  currentIndex: number;
  changeImage: (index: number) => void;
}

export interface ImageIndicatorsProps {
  totalImages: number;
  currentImage: number;
  onChangeImage: (index: number) => void;
}
