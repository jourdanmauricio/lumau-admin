import DataTable from 'react-data-table-component';
import { Modal } from '@/components/Modal/Modal';
import Slide from './Slide';
import DeleteSlide from './DeleteSlide';
import useSlides from './useSlides';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Offices = () => {
  const {
    slides,
    SLIDE_COLUMNS,
    action,
    theme,
    actionsMenu,
    // handleDelete,
    currentData,
    onDelete,
    isOpenModal,
    onCancelDelete,
    onSubmit,
  } = useSlides();
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-slides"
          errorForm=""
        ></lumau-message>
      </div>

      <div className="h-full">
        {action === 'VIEW' && slides && (
          <DataTable
            // dense
            title="Posts"
            columns={SLIDE_COLUMNS}
            data={slides}
            theme={theme}
            actions={actionsMenu}
            pagination
          />
        )}
        {(action === 'NEW' || action === 'EDIT') && (
          <Slide
            currentData={currentData}
            action={action}
            onSubmit={onSubmit}
            onCancelDelete={onCancelDelete}
          />
        )}
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            closeModal={onCancelDelete}
          >
            <DeleteSlide
              currentData={currentData}
              onDelete={onDelete}
              onCancelDelete={onCancelDelete}
            />
          </Modal>
        )}
      </div>
    </>
  );
};
export default Offices;
