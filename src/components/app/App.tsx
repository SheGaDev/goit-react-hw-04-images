import { Component } from 'react';
import SearchBar from '../search/SearchBar';
import Loader from '../loader/Loader';
import ImageGallery from '../image-gallery/ImageGallery';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import fetchImages from '../../services/api';
import { isAxiosError } from 'axios';

type State = {
  error: string | null;
  isLoading: boolean;
  page: number;
  totalPages: number;
  total: number;
  images: Image[];
  query: string;
  modal: ModalState;
};
export type Image = {
  id: string;
  tags: string;
  webformatURL: string;
  largeImageURL: string;
};
type ModalState = {
  selected: boolean;
  webformatURL: string;
  tags: string;
};

class App extends Component {
  state: State = {
    error: null,
    isLoading: false,
    page: 1,
    totalPages: 1,
    total: 0,
    images: [],
    query: '',
    modal: {
      selected: false,
      webformatURL: '',
      tags: '',
    },
  };

  componentDidUpdate = (_: unknown, prevState: Readonly<State>) => {
    if (this.state.page !== prevState.page || this.state.query !== prevState.query) {
      this.setState({ isLoading: true });
      this.search();
    }
  };

  sendQuery = (query: string) => {
    this.setState({ query, page: 1, error: null, images: [] });
  };

  search = async () => {
    const { page, query } = this.state;
    try {
      const { totalHits, hits } = await fetchImages({
        page,
        query,
      });
      this.setState((prev: Pick<State, keyof State>): Pick<State, keyof State> => {
        return {
          total: totalHits,
          totalPages: Math.ceil(totalHits / 12),
          images: [...prev.images, ...(hits as Image[])],
        } as State;
      });
    } catch (error) {
      if (isAxiosError(error)) this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePage = () => {
    this.setState((prev: Pick<State, keyof State>): Pick<State, keyof State> => {
      return { page: prev.page + 1 } as State;
    });
  };

  selectImage = (url: string, alt: string) => {
    this.setState({
      modal: {
        selected: true,
        webformatURL: url,
        tags: alt,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modal: {
        selected: false,
        webformatURL: '',
        tags: '',
      },
    });
  };

  render() {
    const { isLoading, images, totalPages, page, error, modal } = this.state;
    return (
      <div className='grid grid-cols-1 gap-[16px] pb-[24px]'>
        <SearchBar sendQuery={this.sendQuery} />
        {error && <h2 className='mx-auto'>Error: {error}</h2>}
        {images.length !== 0 && <ImageGallery images={images} selectImage={this.selectImage} />}
        {isLoading && <Loader />}
        {totalPages !== 0 && page !== totalPages && <Button changePage={this.changePage} />}
        {modal.selected && <Modal modal={modal} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default App;
