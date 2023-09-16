import ImageGalleryItem from '../image-gallery-item/ImageGalleryItem';
import type { Image } from '../app/App';

const ImageGallery = ({
  images,
  selectImage,
}: {
  images: Image[] | null;
  selectImage: (url: string, tags: string) => void;
}) => {
  return (
    <div>
      <ul className='max-w-{calc(100vw - 48px)} mx-auto my-0 grid list-none grid-cols-3 gap-[16px] p-0'>
        {images &&
          images.map((image) => {
            return (
              <ImageGalleryItem
                key={image.id}
                image={image.webformatURL}
                largeImage={image.largeImageURL}
                alt={image.tags}
                selectImage={selectImage}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default ImageGallery;
