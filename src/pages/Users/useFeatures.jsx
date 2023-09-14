import { useEffect, useState } from 'react';
import { useSectionsStore } from '../../store/sections';

const useFeatures = ({ attributes, setAttributes }) => {
  const [options, setOptions] = useState([]);
  const [currentAtrribute, setCurrentAtrribute] = useState(null);
  const [currentOption, setCurrentOption] = useState(null);

  const { sections } = useSectionsStore();

  console.log('Sections', sections);

  useEffect(() => {
    // Convertir los arrays en conjuntos
    const attribs = new Set(attributes);
    const options = new Set(sections);
    // Filtrar los elementos que no se encuentran en el segundo conjunto
    const resultado = [
      ...new Set([...options].filter((x) => !attribs.has(x.name))),
    ];
    setOptions(resultado.map((res) => res.name));
  }, [attributes, sections]);

  const handleSetAttribute = (attribute) => {
    currentAtrribute === attribute
      ? setCurrentAtrribute(null)
      : setCurrentAtrribute(attribute);
    setCurrentOption(null);
  };

  const handleSetOption = (option) => {
    currentOption === option
      ? setCurrentOption(null)
      : setCurrentOption(option);
    setCurrentAtrribute(null);
  };

  const removeAttribute = () => {
    if (!currentAtrribute) return;
    const newAttibutes = attributes.filter(
      (attribs) => attribs !== currentAtrribute
    );
    setAttributes(newAttibutes);
  };

  const addAttribute = () => {
    if (!currentOption) return;
    setAttributes([...attributes, currentOption]);
  };

  return {
    handleSetAttribute,
    handleSetOption,
    removeAttribute,
    addAttribute,
    currentAtrribute,
    options,
    currentOption,
  };
};
export default useFeatures;
