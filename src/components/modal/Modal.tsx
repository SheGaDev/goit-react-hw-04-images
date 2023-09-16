import { Component, MouseEvent } from 'react';

type ModalProp = {
  webformatURL: string;
  tags: string;
};
type Props = {
  modal: ModalProp;
  closeModal: () => void;
};

class Modal extends Component<Props> {
  componentDidMount() {
    document.addEventListener('keydown', this.closeKeyboardModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeKeyboardModal);
  }

  closeOverlayModal = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  closeKeyboardModal = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.props.closeModal();
  };

  render() {
    return (
      <div
        onClick={this.closeOverlayModal}
        className='fixed left-0 top-0 z-[1200] flex h-[100vh] w-[100vw] items-center justify-center bg-[#00000040]'
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: 'calc(100vh - 48px)',
          }}
        >
          <img src={this.props.modal.webformatURL} alt={this.props.modal.tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
