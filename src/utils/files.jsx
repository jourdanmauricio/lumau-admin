import * as XLSX from 'xlsx';

export const genRespFiles = (file) => {
  // console.log('FILE', file);
  const respOk = file
    .filter((resp) => resp.value.result === 'OK')
    .map((res) => res.value.response.data);

  const respError = file
    .filter((resp) => resp.value.result === 'ERROR')
    .map((res) => res.value.error.data);

  // console.log('respOk', respOk);
  // console.log('respError', respError);

  return [respOk, respError];
};

export const readData = (file) => {
  const data = file;
  const workbook = XLSX.read(data, { type: 'binary' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const parseData = XLSX.utils.sheet_to_json(sheet);

  const newProducts = parseData.map((item) => {
    const category =
      item.Rubro.trim().toLowerCase().charAt(0).toUpperCase() +
      item.Rubro.trim().toLowerCase().slice(1);
    const name =
      item.Nombre.trim().toLowerCase().charAt(0).toUpperCase() +
      item.Nombre.trim().toLowerCase().slice(1);
    return {
      id: item.Artículo.toString(),
      name,
      category: category,
      // categoryWeb: category,
      status: 'active',
      costPrice: item.Costo.toFixed(2),
      iva: item.IVA,
      price: item['Bt.Minorista'].toFixed(2),
      wholesalePrice: item['Bt.Mayorista'].toFixed(2),
      maxPrice: item['Pto. Máximo'].toFixed(2),
      supplier: item.Proveedor,
      other: item['Bt.Otros'],
      // sections: ['product'],
    };
  });

  return newProducts;
};

export const genReport = (input, respOk, respError) => {
  // Crea un nuevo libro de trabajo de Excel
  const wb = XLSX.utils.book_new();

  // Crea una hoja para el input
  const ws1 = XLSX.utils.json_to_sheet(input);
  XLSX.utils.book_append_sheet(wb, ws1, 'Input');

  // Crea una hoja para resultados Ok
  const ws2 = XLSX.utils.json_to_sheet(respOk);
  XLSX.utils.book_append_sheet(wb, ws2, 'Impactados');

  // Crea una hoja para errores
  const ws3 = XLSX.utils.json_to_sheet(respError);
  XLSX.utils.book_append_sheet(wb, ws3, 'Errores');

  // Crea un archivo Excel
  const date = new Date();
  const name =
    date.getFullYear() +
    ('00' + (date.getMonth() + 1)).slice(-2) +
    ('00' + date.getDate()).slice(-2) +
    '_' +
    ('00' + date.getHours()).slice(-2) +
    ('00' + date.getMinutes()).slice(-2);
  XLSX.writeFile(wb, `upload-${name}.xlsx`);
};
