import DataTable from 'react-data-table-component';
import useInstagram from './useInstagram';
import '@/components/lumau-message.js';
import '@/styles/dataTableThemes';

const Instagrams = () => {
  const { instagrams, INSTAGRAM_COLUMNS, theme, actionsMenu } = useInstagram();
  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-error-instagrams"
          errorForm=""
        ></lumau-message>
      </div>

      <div className="h-full">
        {instagrams && (
          <DataTable
            // dense
            title="Publicaciones Instagram"
            columns={INSTAGRAM_COLUMNS}
            data={instagrams}
            theme={theme}
            actions={actionsMenu}
            pagination
          />
        )}
      </div>
    </>
  );
};
export default Instagrams;
