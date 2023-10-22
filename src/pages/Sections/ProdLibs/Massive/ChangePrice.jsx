import { useProdLibsStore } from '@/store/prodLib';
import '@/components/lumau-input.js';
import { useEffect, useRef } from 'react';

const ChangePrice = () => {
  const { setMassiveValue, massiveValue } = useProdLibsStore();
  const percentRef = useRef();

  const handleChangePercent = (e) => {
    setMassiveValue({ value: e.target.value });
  };

  useEffect(() => {
    let inputPercent = null;

    if (percentRef.current) {
      percentRef.current.addEventListener('event', handleChangePercent);
      inputPercent = percentRef.current;
    }

    return () => {
      if (inputPercent) {
        inputPercent.removeEventListener('event', handleChangePercent);
      }
    };
  });

  console.log('massiveValue', massiveValue);

  return (
    <div className="flex flex-col justify-center gap-4 w-full">
      <p>El cambio aplicará sobre el precio minorista y mayorista</p>
      <div className="w-72 flex items-center justify-center mx-auto gap-8">
        <lumau-input
          ref={percentRef}
          small
          id="percent"
          controlType="number"
          label="Porcentaje"
          name="percent"
          placeholder="% de aumento o disminución"
          value={massiveValue}
          onChange={(e) => setMassiveValue({ value: e.target.value })}
          selectOnFocus
          required
        ></lumau-input>
        <div
          className="min-w-[150px] whitespace-nowrap border rounded py-1.5 text-center"
          htmlFor="percent"
        >
          <p className="w-full">
            {parseInt(massiveValue) >= 0 ? 'Aumentar: ' : 'Disminuir: '}{' '}
            {Math.abs(parseInt(massiveValue))}%
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChangePrice;
