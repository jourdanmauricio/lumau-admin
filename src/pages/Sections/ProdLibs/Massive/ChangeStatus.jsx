import { status as statusProd } from '@/config/variables';
import { useProdLibsStore } from '@/store/prodLib';

const ChangeStatus = () => {
  const { setMassiveValue } = useProdLibsStore();

  return (
    <div className="w-full">
      <label
        className="label-form"
        htmlFor="ml-id"
      >
        Estado
      </label>
      <select
        className="input-form h-8"
        onChange={(e) => setMassiveValue({ value: e.target.value })}
      >
        <option value=""></option>
        {statusProd.map((el) => (
          <option
            key={el.id}
            value={el.id}
          >
            {el.value}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ChangeStatus;
