export type Image = {
  id: string;
  tags: string;
  webformatURL: string;
  largeImageURL: string;
};
export type ModalState = {
  imageURL: string;
  title: string;
};
export type ModalProps = {
  modal: ModalState;
  closeModal: () => void;
};
export type GalleryProps = {
  images: Image[] | null;
  selectImage: (imageURL: string, title: string) => void;
};
