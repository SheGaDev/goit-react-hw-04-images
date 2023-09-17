import { MouseEvent, useEffect } from 'react';
import type { ModalProps } from '@types';

const Modal = ({ modal, closeModal }: ModalProps) => {
  const closeOverlayModal = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const closeKeyboardModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', closeKeyboardModal);
    return () => {
      document.removeEventListener('keydown', closeKeyboardModal);
    };
  }, [closeModal]);

  return (
    <div
      onClick={closeOverlayModal}
      className='fixed left-0 top-0 z-[1200] flex h-[100vh] w-[100vw] items-center justify-center bg-[#00000040]'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 'calc(100vw - 48px)',
          maxHeight: 'calc(100vh - 48px)',
        }}
      >
        <img src={modal.imageURL} alt={modal.title} />
      </div>
    </div>
  );
};

export default Modal;
