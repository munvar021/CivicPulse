import { toast as reactToastify } from "react-toastify";

const toast = {
  success: (message, options = {}) => {
    reactToastify.dismiss();
    return reactToastify.success(message, options);
  },
  error: (message, options = {}) => {
    reactToastify.dismiss();
    return reactToastify.error(message, options);
  },
  info: (message, options = {}) => {
    reactToastify.dismiss();
    return reactToastify.info(message, options);
  },
  warning: (message, options = {}) => {
    reactToastify.dismiss();
    return reactToastify.warning(message, options);
  },
  dismiss: reactToastify.dismiss,
};

export default toast;
