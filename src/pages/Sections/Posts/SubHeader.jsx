import { FaTimes } from 'react-icons/fa';
import { usePostsStore } from '@/store/posts';
import { sections } from '@/config/variables';

const SubHeader = () => {
  const { filter, onSetFilter, onClearFilter } = usePostsStore();

  const handleClear = () => {
    if (filter.filterText || filter.filterSection) {
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
          Sección
        </label>
        <select
          className="input-form h-8"
          value={filter.filterSection}
          id="sel-sec"
          name="sel-sec"
          onChange={(e) =>
            onSetFilter({ field: 'filterSection', value: e.target.value })
          }
        >
          <option value=""></option>
          {sections.map((el) => (
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
