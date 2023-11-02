/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react';
import { useProdLibsStore } from '@/store/prodLib';

// eslint-disable-next-line react/prop-types,
const FilterCategoryWeb = () => {
  const { getCategoriesWeb } = useProdLibsStore();
  return (
    <select
      name="categoryWeb"
      id="CatgoryWeb"
    >
      {getCategoriesWeb().map((cat) => (
        <option
          key={cat}
          value={cat}
        >
          {cat}
        </option>
      ))}
    </select>
  );
};
export default memo(FilterCategoryWeb);
