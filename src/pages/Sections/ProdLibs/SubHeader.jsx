import { useProdLibsStore } from '@/store/prodLib';
import { status as statusProd } from '@/config/variables';
import { FaTimes } from 'react-icons/fa';

const SubHeader = () => {
  const { filter, onSetFilter, getCategories, onClearFilter } =
    useProdLibsStore();

  const handleClear = () => {
    if (filter.filterText || filter.filterStatus || filter.filterCategory) {
      onClearFilter();
    }
  };

  return (
    <div className="w-full flex gap-4 items-end pb-4">
      <div className="w-full">
        <label
          className="label-form"
          htmlFor="sel-cat"
        >
          Categoría
        </label>
        <select
          className="input-form h-8"
          value={filter.filterCategory}
          id="sel-cat"
          name="sel-cat"
          onChange={(e) =>
            onSetFilter({ field: 'filterCategory', value: e.target.value })
          }
        >
          <option value=""></option>
          {getCategories().map((el) => (
            <option
              key={el}
              value={el}
            >
              {el}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label
          className="label-form"
          htmlFor="sel-status"
        >
          Estado
        </label>
        <select
          className="input-form h-8"
          id="sel-status"
          name="sel-status"
          value={
            statusProd.find((el) => el.id === filter.filterStatus)?.id || ''
          }
          onChange={(e) =>
            onSetFilter({ field: 'filterStatus', value: e.target.value })
          }
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

      <div className="w-full">
        <label
          className="label-form h-8"
          htmlFor="search"
        >
          Buscar
        </label>
        <input
          className="input-form"
          id="search"
          name="search"
          type="text"
          placeholder="Search"
          aria-label="Search Input"
          value={filter.filterText}
          onChange={(e) =>
            onSetFilter({ field: 'filterText', value: e.target.value })
          }
        />
      </div>

      <div className="w-8">
        <button
          className="btn-icon"
          type="button"
          onClick={handleClear}
        >
          <FaTimes className="text-red-500 w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
export default SubHeader;
