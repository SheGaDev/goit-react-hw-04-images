import { useEffect, useState } from 'react';
import SearchBar from '../search/SearchBar';
import Loader from '../loader/Loader';
import ImageGallery from '../image-gallery/ImageGallery';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import fetchImages from '../../services/api';
import { isAxiosError } from 'axios';
import type { ModalState, Image } from '@types';

const App = () => {
  const [error, setError] = useState(null as string | null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ imageURL: '', title: '' } as ModalState);
  const [images, setImages] = useState([] as Image[]);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const sendQuery = (q: string) => {
    setError(null);
    setQuery(q);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    const search = async () => {
      try {
        const { totalHits, hits } = await fetchImages({
          query,
          page,
        });
        setImages((prev) => [...prev, ...(hits as Image[])]);
        setTotalPages(Math.ceil(totalHits / 12));
      } catch (e) {
        if (isAxiosError(e)) setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query !== '') {
      setIsLoading(true);
      search();
    }
  }, [page, query]);

  const changePage = () => setPage((prev) => prev + 1);

  const selectImage = (imageURL: string, title: string) => setModal({ imageURL, title });

  const closeModal = () => setModal({ imageURL: '', title: '' });

  return (
    <div className='grid grid-cols-1 gap-[16px] pb-[24px]'>
      <SearchBar sendQuery={sendQuery} />
      {error && <h2 className='mx-auto'>Error: {error}</h2>}
      {images.length !== 0 && <ImageGallery images={images} selectImage={selectImage} />}
      {isLoading && <Loader />}
      {totalPages !== 0 && page !== totalPages && <Button changePage={changePage} />}
      {modal.imageURL && <Modal modal={modal} closeModal={closeModal} />}
    </div>
  );
};

export default App;
