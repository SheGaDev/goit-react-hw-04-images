import ImageGalleryItem from '../image-gallery-item/ImageGalleryItem';
import type { GalleryProps } from '@types';

const ImageGallery = ({ images, selectImage }: GalleryProps) => {
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
