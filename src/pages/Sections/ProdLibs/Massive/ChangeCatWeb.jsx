import { useProdLibsStore } from '@/store/prodLib';
import { useEffect, useRef } from 'react';

const ChangeCatWeb = () => {
  const { setMassiveValue, massiveValue } = useProdLibsStore();
  const catWebRef = useRef();

  const handleChangeCatWeb = (e) => {
    setMassiveValue({ value: e.target.value });
  };

  useEffect(() => {
    let inputPercent = null;

    if (catWebRef.current) {
      catWebRef.current.addEventListener('event', handleChangeCatWeb);
      inputPercent = catWebRef.current;
    }

    return () => {
      if (inputPercent) {
        inputPercent.removeEventListener('event', handleChangeCatWeb);
      }
    };
  });

  return (
    <div className="w-72 flex items-center justify-center mx-auto gap-8">
      <lumau-input
        ref={catWebRef}
        small
        id="categoryWeb"
        controlType="text"
        label="Categoría Web"
        name="categoryWeb"
        placeholder="Nombre de la categoría web"
        value={massiveValue}
        onChange={(e) => setMassiveValue({ value: e.target.value })}
        selectOnFocus
        required
      ></lumau-input>
    </div>
  );
};
export default ChangeCatWeb;
