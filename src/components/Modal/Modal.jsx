import ReactDOM from 'react-dom';
import { FaRegWindowClose } from 'react-icons/fa';
import './Modal.css';

function Modal({
  children,
  isOpenModal,
  closeModal,
  capa = '1',
  width = 'full',
}) {
  const handleClickContainer = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    <section
      className={`modal ${capa === '1' ? 'z-20' : 'z-30'} ${
        isOpenModal && 'is-open'
      }`}
      onClick={closeModal}
    >
      <div
        className={`modal-container ${
          width === 'full' ? 'max-w-full' : 'max-w-md'
        }`}
        onClick={handleClickContainer}
      >
        <button
          onClick={closeModal}
          className="modal-close"
        >
          <FaRegWindowClose />
        </button>
        {children}
      </div>
    </section>,

    document.getElementById('modal')
  );
}

export { Modal };
