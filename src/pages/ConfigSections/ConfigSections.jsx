import DataTable from 'react-data-table-component';
import { Outlet } from 'react-router-dom';
import '@/styles/dataTableThemes';
import useConfigSections from './useConfigSections';
import { Modal } from '../../components/Modal/Modal';
import DeleteSection from './DeleteSection';

const ConfigSections = () => {
  const {
    sections,
    SECTIONS_COLUMNS,
    actionsMenu,
    theme,
    onCancelDelete,
    isOpenModal,
    error,
  } = useConfigSections();

  return (
    <>
      {sections.length === 0 && (
        <div className="relative">
          <lumau-message
            id="form-sections"
            errorForm={error}
          ></lumau-message>
        </div>
      )}

      <DataTable
        dense
        // selectableRows
        title="Configuración de secciones"
        columns={SECTIONS_COLUMNS}
        data={sections}
        theme={theme}
        actions={actionsMenu}
        pagination
      />

      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          closeModal={onCancelDelete}
        >
          <DeleteSection
            onCancelDelete={onCancelDelete}
            error={error}
          />
        </Modal>
      )}

      <Outlet />
    </>
  );
};
export default ConfigSections;
