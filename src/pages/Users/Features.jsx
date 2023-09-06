/* eslint-disable react/prop-types */
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import usefeatures from './useFeatures';

const Features = ({ attributes, setAttributes, menuItems }) => {
  const {
    handleSetAttribute,
    handleSetOption,
    removeAttribute,
    addAttribute,
    currentAtrribute,
    options,
    currentOption,
  } = usefeatures({ attributes, setAttributes, menuItems });

  return (
    <>
      <div className="border border-solid rounded h-[270px] overflow-y-auto shadow-2xl dark:shadow-lg dark:shadow-gray-700/50">
        <p className="p-2 text-center text-slate-100 bg-slate-500">
          Características de la Web
        </p>
        <div className="mt-4 text-center">
          {attributes &&
            attributes.map((attribute) => (
              <div
                onClick={() => handleSetAttribute(attribute)}
                key={attribute}
                className={`py-2 hover:cursor-pointer ${
                  attribute === currentAtrribute ? 'bg-slate-700' : ''
                }`}
              >
                {attribute}
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className="border border-solid p-2 hover:cursor-pointer"
          onClick={removeAttribute}
        >
          <FaChevronRight />
        </div>
        <div
          className="border border-solid p-2 hover:cursor-pointer"
          onClick={addAttribute}
        >
          <FaChevronLeft />
        </div>
      </div>
      <div className="border border-solid rounded h-[270px] overflow-y-auto shadow-2xl dark:shadow-lg dark:shadow-gray-700/50">
        <p className="p-2 text-center text-slate-100 bg-slate-500">
          Características disponibles
        </p>

        <div className="mt-4 text-center">
          {options.map((option) => (
            <div
              key={option}
              className={`py-2 hover:cursor-pointer ${
                option === currentOption ? 'bg-slate-700' : ''
              }`}
              onClick={() => handleSetOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Features;
