import { useProdLibsStore } from '@/store/prodLib';

const DeleteProds = () => {
  const { selectedRows } = useProdLibsStore();
  return <div>¿Está seguro de eliminar {selectedRows.length} productos?</div>;
};
export default DeleteProds;
