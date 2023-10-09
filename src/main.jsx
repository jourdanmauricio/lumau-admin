import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import '@/styles/Global.css';
import '@/styles/Global.css';
import '@/styles/quill.snow.css';
import '@/styles/textEditor.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import NotificationProvider from './components/Notifications/NotificationProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);
