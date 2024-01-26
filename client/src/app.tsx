import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from './router/router';
import 'react-toastify/dist/ReactToastify.css';



function App(): JSX.Element {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export { App };
