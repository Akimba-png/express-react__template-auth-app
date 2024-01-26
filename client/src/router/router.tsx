import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/layout';
import { ErrorPage } from '../pages/error-page/error-page';
import { MainPage } from '../pages/main-page/main-page';
import { OfferPage } from '../pages/offer-page/offer-page';
import { FavoritePage } from '../pages/favorite-page/favorite-page';
import { AppRoute, AuthRoute } from '../const';
import { PrivateRoute } from '../components/private-route/private-route';
import { SignupPage } from '../pages/signup-page/signup-page';
import { LoginPage } from '../pages/login-page/login-page';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: AppRoute.Main,
        element: <MainPage />
      },
      {
        path: AppRoute.Offer,
        element: <OfferPage />,
      },
      {
        path: AuthRoute.Signup,
        element: <SignupPage />,
      },
      {
        path: AuthRoute.Login,
        element: <LoginPage />
      },
      {
        path: AppRoute.Favorite,
        element: (
          <PrivateRoute>
            <FavoritePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
