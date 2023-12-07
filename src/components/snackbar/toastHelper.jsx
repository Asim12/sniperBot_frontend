// toastHelper.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, options) => {
  toast(message, options);
};
