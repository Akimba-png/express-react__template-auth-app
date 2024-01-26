import { Navigate } from 'react-router-dom';
import { useAppSelector } from './../../hooks/state-hook';
import { AppRoute, AuthStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element,
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.userSlice.authStatus);
  if (authStatus === AuthStatus.Auth) {
    return children;
  }
  return <Navigate to={AppRoute.Main} />;
}

export { PrivateRoute };
