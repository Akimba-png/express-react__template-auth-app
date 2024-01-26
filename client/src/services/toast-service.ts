import { toast, ToastOptions } from 'react-toastify';

const errorStyle: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

class ToastService {
  showErrorToast(message: string) {
    toast.error(message, errorStyle)
  }
}

export const toastService = new ToastService();
