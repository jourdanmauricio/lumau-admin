export const status = [
  { id: 'active', value: 'Activo' },
  { id: 'paused', value: 'Pausado' },
  // { id: 'under_review', name: 'Revisión' },
];

export const orderStatus = [
  { id: 'active', value: 'Activo' },
  { id: 'paused', value: 'Pausado' },
  // { id: 'under_review', name: 'Revisión' },
];

export const actions = [
  { id: 'delete', value: 'Eliminar' },
  { id: 'changeStatus', value: 'Cambiar estado' },
  { id: 'changePrice', value: 'Modificar precio' },
  { id: 'changeCatWeb', value: 'Modificar cat web' },
];

export const sections = [
  { id: 'blog', value: 'Blog' },
  { id: 'featured', value: 'Destacado' },
  { id: 'gallery', value: 'Galería' },
  { id: 'home', value: 'Home' },
  { id: 'new', value: 'Nuevos' },
  { id: 'ofers', value: 'Ofertas' },
  { id: 'product', value: 'Product' },
];

export const paginationOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

export const quillSimpleModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link'],
    ['clean'],
  ],
};

import {
  FaUserCog,
  FaTh,
  FaUsers,
  FaComment,
  FaTelegramPlane,
  FaTasks,
  FaCogs,
} from 'react-icons/fa';

export const menuItems = [
  {
    id: 1,
    name: 'Perfil',
    route: '/profile',
    menu: true,
    icon: FaUserCog,
    feature: false,
    description: 'Configuración del perfil del usuario',
    role: ['admin', 'user'],
  },

  {
    id: 2,
    name: 'Dashboard',
    route: '/dashboard',
    menu: true,
    feature: false,
    icon: FaTh,
    description: 'Dashboard',
    role: ['admin', 'user'],
  },
  {
    id: 3,
    name: 'Usuarios',
    route: '/users',
    menu: true,
    feature: false,
    icon: FaUsers,
    description: 'Configuración de usuarios del sistema',
    role: ['admin'],
  },
  {
    id: 7,
    name: 'Secciones',
    route: '/config-sections',
    menu: true,
    feature: false,
    icon: FaCogs,
    description: 'Configuración de secciones del sistema',
    role: ['admin'],
  },
  {
    id: 4,
    name: 'Contactos',
    route: '/contacts',
    menu: true,
    feature: false,
    icon: FaComment,
    description: 'Contactos recibidos desde la página web',
    role: ['admin', 'user'],
  },
  {
    id: 5,
    name: 'Suscriptores',
    route: '/subscribers',
    menu: true,
    feature: false,
    icon: FaTelegramPlane,
    description: 'Suscripciones al newsletter recibidos desde la página web',
    role: ['admin', 'user'],
  },
  {
    id: 6,
    name: 'Secciones',
    route: '/sections',
    menu: true,
    feature: false,
    icon: FaTasks,
    description: 'Configuración de secciones de la página web',
    role: ['admin', 'user'],
  },
];
