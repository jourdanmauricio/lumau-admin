import { create } from 'zustand';
import checkForm from '@/utils/checkForm';

import {
  getProdLibs,
  createProdLib,
  deleteProdLib,
  massiveCreateOrUpdateProdLib,
  updateProdLib,
  massiveDeleteProdLib,
} from '@/services/api/prodLib.api.js';
import { useUserStore } from './user';
import { genRespFiles, readData, genReport } from '../utils/files';

export const useProdLibsStore = create((set, get) => ({
  prodLibs: [],
  error: null,
  currentData: {},
  action: 'VIEW',
  loading: false,
  resetPaginationToggle: false,
  selectedRows: [],
  massiveAction: '',
  massiveValue: '',
  toggledClearRows: false,
  generateReport: false,
  filter: {
    filterCategory: '',
    filterText: '',
    filterStatus: '',
  },
  getAllProdLibs: async () => {
    const user = useUserStore.getState();

    try {
      const data = await getProdLibs(user.user);
      set({ prodLibs: data, error: null, action: 'VIEW' });
    } catch (error) {
      let message = 'Error obteniendo los productos';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;
      set({ error: message });
    }
  },
  getCategoriesWeb: () => {
    const { prodLibs } = get();

    const categories = new Set();

    prodLibs.forEach((producto) => {
      if (producto.image !== null) categories.add(producto.categoryWeb);
    });
    const categoriesArray = Array.from(categories);

    console.log('cat', categoriesArray);

    return categoriesArray;
  },
  setCurrentData: ({ payload }) => {
    set({ currentData: payload.data, action: payload.action, error: null });
  },
  onNew: () => {
    set({ action: 'NEW', currentData: {} });
  },
  onEdit: (payload) => {
    set({ action: 'EDIT', currentData: payload.data });
  },
  onConfDelete: (payload) => {
    set({ currentData: payload.data });
  },
  onCancelDelete: () => {
    set({ action: 'VIEW', currentData: {} });
  },
  onDelete: async () => {
    const { prodLibs, onCancelDelete, currentData } = get();
    try {
      const { id } = await deleteProdLib(currentData.id);
      const newProducts = prodLibs.filter((prod) => prod.id !== id);
      set({ prodLibs: newProducts, error: null, action: 'VIEW' });
      onCancelDelete();
    } catch (error) {
      let message = 'Error eliminando el post';
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;
      throw message;
    }
  },
  filteredItems: () => {
    const { prodLibs, filter } = get();
    return prodLibs
      .filter(
        (product) =>
          (product.name
            .toLowerCase()
            .includes(filter.filterText.toLowerCase()) ||
            product.categoryWeb
              .toLowerCase()
              .includes(filter.filterText.toLowerCase()) ||
            product.id
              .toLowerCase()
              .includes(filter.filterText.toLowerCase())) &&
          product.status
            .toLowerCase()
            .includes(filter.filterStatus.toLowerCase()) &&
          product.category
            .toLowerCase()
            .includes(filter.filterCategory.toLowerCase())
      )
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  },
  onClearFilter: () => {
    const { resetPaginationToggle } = get();
    set({
      resetPaginationToggle: !resetPaginationToggle,
      filter: { filterCategory: '', filterText: '', filterStatus: '' },
    });
  },
  onSetFilter: (payload) => {
    const { filter } = get();
    set({
      filter: { ...filter, [payload.field]: payload.value },
    });
  },
  onFileUpload: async (file) => {
    const { prodLibs } = get();
    set({ error: null, action: 'VIEW', loading: true });

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const input = readData(e.target.result);
          let newInput = JSON.parse(JSON.stringify(input));

          let maxOrder = newInput.reduce(
            (max, obj) => (obj.order > max ? obj.order : max),
            newInput[0].order
          );

          if (maxOrder === undefined) maxOrder = 1;

          console.log('Max order', maxOrder);
          newInput.forEach((el) => {
            const index = prodLibs.findIndex((prod) => prod.id === el.id);
            if (index === -1) {
              el.sections = ['product'];
              el.status = 'paused';
              el.order = maxOrder;
              el.categoryWeb = el.category;
              maxOrder++;
            }
          });

          console.log('newInput', newInput);
          const resp = await massiveCreateOrUpdateProdLib(newInput);
          const [respOk, respError] = genRespFiles(resp);

          let newProducts = JSON.parse(JSON.stringify(prodLibs));
          respOk.forEach((el) => {
            const index = newProducts.findIndex((prod) => prod.id === el.id);
            if (index !== -1) newProducts.splice(index, 1, el);
          });

          set({
            prodLibs: respOk,
            error: null,
            action: 'VIEW',
            loading: false,
          });
          genReport(input, respOk, respError);
          resolve(`Impactados: ${respOk.length}, Errores: ${respError.length}`);
        } catch {
          set({ error: 'Error subiendo archivo', loading: false });
          reject('Error subiendo archivo');
        }
      };
    });
  },
  onSubmit: async (e) => {
    const { action, prodLibs, currentData } = get();
    const { data } = checkForm(e);
    if (!data) return;

    console.log('Data', data);
    try {
      if (action === 'NEW') {
        const resp = await createProdLib(data);

        set({
          prodLibs: [...prodLibs, resp],
          error: null,
          action: 'VIEW',
          currentData: {},
        });
      } else {
        data.id = currentData.id;
        const updPost = await updateProdLib(data);

        const newProd = prodLibs.map((prod) =>
          prod.id === updPost.id ? updPost : prod
        );
        set({
          prodLibs: newProd,
          error: null,
          action: 'VIEW',
          currentData: {},
        });
      }
    } catch (error) {
      let message = `Error ${
        action === 'NEW' ? 'creando' : 'modificando'
      } el producto`;
      if (error.response)
        message = `${error.response.status}: ${error.response.statusText}`;

      throw message;
    } finally {
      // loading.removeAttribute('loading');
    }
  },
  onSubmitMassive: async () => {
    const {
      massiveAction,
      selectedRows,
      massiveValue,
      prodLibs,
      toggledClearRows,
      generateReport,
      onClearFilter,
    } = get();
    // console.log('Action', massiveAction, massiveValue, selectedRows.length);
    const input = selectedRows.map((el) => ({
      producto: el.id,
      action: massiveAction,
      value: massiveValue,
    }));
    let respOk,
      respError = [];
    try {
      set({ loading: true });
      let newProducts = JSON.parse(JSON.stringify(prodLibs));
      if (massiveAction === 'delete') {
        const resp = await massiveDeleteProdLib(selectedRows);
        [respOk, respError] = genRespFiles(resp);

        const respIds = respOk.map((el) => el.id);
        newProducts = prodLibs.filter((el) => !respIds.includes(el.id));
        onClearFilter();
      }
      if (massiveAction === 'changeStatus') {
        const newProds = selectedRows.map((el) => ({
          id: el.id,
          status: massiveValue,
        }));
        const resp = await massiveCreateOrUpdateProdLib(newProds);
        [respOk, respError] = genRespFiles(resp);

        respOk.forEach((el) => {
          const index = newProducts.findIndex((prod) => prod.id === el.id);
          if (index !== -1) newProducts.splice(index, 1, el);
        });
      }
      if (massiveAction === 'changeCatWeb') {
        const newProds = selectedRows.map((el) => ({
          id: el.id,
          categoryWeb: massiveValue,
        }));
        const resp = await massiveCreateOrUpdateProdLib(newProds);
        [respOk, respError] = genRespFiles(resp);

        respOk.forEach((el) => {
          const index = newProducts.findIndex((prod) => prod.id === el.id);
          if (index !== -1) newProducts.splice(index, 1, el);
        });
      }

      if (massiveAction === 'changePrice') {
        const newProds = selectedRows.map((el) => ({
          id: el.id,
          price: (el.price + el.price * (parseInt(massiveValue) / 100)).toFixed(
            2
          ),
          wholesalePrice: (
            el.wholesalePrice +
            el.wholesalePrice * (parseInt(massiveValue) / 100)
          ).toFixed(2),
        }));
        const resp = await massiveCreateOrUpdateProdLib(newProds);
        [respOk, respError] = genRespFiles(resp);

        respOk.forEach((el) => {
          const index = newProducts.findIndex((prod) => prod.id === el.id);
          if (index !== -1) newProducts.splice(index, 1, el);
        });
      }

      set({
        prodLibs: newProducts,
        error: null,
        action: 'VIEW',
        massiveAction: '',
        massiveValue: '',
        selectedRows: [],
        toggledClearRows: !toggledClearRows,
      });

      if (generateReport) await genReport(input, respOk, respError);

      return `Impactados: ${respOk.length}, Errores: ${respError.length}`;
    } catch {
      throw 'Error impactando las modificaciones';
    } finally {
      set({ loading: false });
    }
  },
  getCategories: () => {
    const { prodLibs } = get();
    let categories = prodLibs.map((product) => product.category);
    categories = categories.filter(
      (item, index) => categories.indexOf(item) === index
    );
    return categories.sort();
  },
  setSeletedRows: (payload) => {
    set({ selectedRows: payload.rows });
  },
  setMassiveAction: (payload) => {
    set({ massiveAction: payload.action });
  },
  setMassiveValue: (payload) => {
    set({ massiveValue: payload.value });
  },
  setGenerateReport: () => {
    const { generateReport } = get();
    set({ generateReport: !generateReport });
  },
}));
