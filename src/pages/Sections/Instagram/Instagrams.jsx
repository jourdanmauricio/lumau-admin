import DataTable from 'react-data-table-component';
import useInstagram from './useInstagram';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';
import InstagramPost from './InstagramPost';

const Instagrams = () => {
  const {
    instagrams,
    INSTAGRAM_COLUMNS,
    theme,
    actionsMenu,
    currentRow,
    setCurrentRow,
    handleSubmit,
  } = useInstagram();

  console.log('instagrams', instagrams);
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-instagrams"
          errorForm=""
        ></lumau-message>
      </div>
      {/* Order: {instagrams[0].order} */}
      <div className="h-full">
        {instagrams && (
          <DataTable
            dense
            title="Publicaciones Instagram"
            columns={INSTAGRAM_COLUMNS}
            data={instagrams}
            theme={theme}
            actions={actionsMenu}
            expandableRows
            expandableRowsComponent={InstagramPost}
            expandableRowExpanded={(row) => row === currentRow}
            onRowExpandToggled={(bool, row) => setCurrentRow(row)}
            expandableRowsComponentProps={{ handleSubmit }}
            pagination
          />
        )}
      </div>
    </>
  );
};
export default Instagrams;
