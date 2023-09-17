import { useEffect, useState } from 'react';
import SearchBar from '../search/SearchBar';
import Loader from '../loader/Loader';
import ImageGallery from '../image-gallery/ImageGallery';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import fetchImages from '../../services/api';
import { isAxiosError } from 'axios';

export type Image = {
  id: string;
  tags: string;
  webformatURL: string;
  largeImageURL: string;
};
type Page = number;
type Query = string;
type Error = string | null;
type Loading = boolean;
type DataState = {
  images: Image[];
  totalPages: number;
  total: number;
};
export type ModalState = {
  imageURL: string;
  title: string;
};
const App = () => {
  const [error, setError] = useState(null as Error);
  const [isLoading, setIsLoading] = useState(false as Loading);
  const [modal, setModal] = useState({ imageURL: '', title: '' } as ModalState);
  const [data, setData] = useState({ images: [], totalPages: 1, total: 0 } as DataState);
  const [query, setQuery] = useState('' as Query);
  const [page, setPage] = useState(1 as Page);

  const sendQuery = (q: Query) => {
    setError(null);
    setQuery(q);
    setPage(1);
    setData((prev) => {
      return {
        ...prev,
        images: [],
      };
    });
  };

  const search = async () => {
    try {
      const { totalHits, hits } = await fetchImages({ query, page });
      setData((prev) => {
        return {
          images: [...prev.images, ...(hits as Image[])],
          total: totalHits,
          totalPages: Math.ceil(totalHits / 12),
        };
      });
    } catch (e) {
      if (isAxiosError(e)) setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
      {data.images.length !== 0 && <ImageGallery images={data.images} selectImage={selectImage} />}
      {isLoading && <Loader />}
      {data.totalPages !== 0 && page !== data.totalPages && <Button changePage={changePage} />}
      {modal.imageURL && <Modal modal={modal} closeModal={closeModal} />}
    </div>
  );
};

export default App;
