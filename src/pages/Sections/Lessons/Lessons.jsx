import DataTable from 'react-data-table-component';
import { Modal } from '@/components/Modal/Modal';
import Lesson from './Lesson';
import DeleteLesson from './DeleteLesson';
import useLessons from './useLessons';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Lessons = () => {
  const {
    lessons,
    LESSON_COLUMNS,
    action,
    theme,
    actionsMenu,
    currentData,
    onDelete,
    isOpenModal,
    onCancelDelete,
    onSubmit,
  } = useLessons();
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-lessons"
          errorForm=""
        ></lumau-message>
      </div>

      <div className="h-full">
        {action === 'VIEW' && lessons && (
          <DataTable
            // dense
            title="Clases"
            columns={LESSON_COLUMNS}
            data={lessons}
            theme={theme}
            actions={actionsMenu}
            pagination
          />
        )}
        {(action === 'NEW' || action === 'EDIT') && (
          <Lesson
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
            <DeleteLesson
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
export default Lessons;
