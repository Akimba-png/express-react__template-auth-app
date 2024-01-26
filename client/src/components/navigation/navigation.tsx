import { MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/state-hook';
import { logout } from '../../store/slices/user-slice/assync-reducers/logout';
import { AppRoute, AuthRoute, AuthStatus, LoadingStatus } from '../../const';
import './navigation.style.css';


const renderRoutes = (
  routeObj: typeof AppRoute | typeof AuthRoute,
  mode: 'site' | 'user',
  currentPath: string
  ) => {
  return (
    Object.entries(routeObj).map(([routeName, path], i) => {
      const key = routeName + i.toString();
      return (
        <li key={key}>
          <Link
            className={`
              ${mode}-navigation__link
              ${currentPath === path && `${mode}-navigation__link--active`}
            `}
            to={path}
          >
            {routeName}
          </Link>
        </li>
      );
    })
  );
};

function Navigation(): JSX.Element {
  const authStatus = useAppSelector((state) => state.userSlice.authStatus);
  const { email } = useAppSelector((state) => state.userSlice.user);
  const { loadingStatus } = useAppSelector((state) => state.userSlice);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const isLoading = loadingStatus === LoadingStatus.Pending;

  const logoutClickHandler = async (
    evt: MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    await dispatch(logout());
  }


  return (
    <nav className="main-navigation">
      <div className="main-navigation__wrapper container">
        <h1 className="main-navigation__title">My very cool app</h1>
        <ul className="site-navigation">
          {renderRoutes(AppRoute, 'site', pathname)}
        </ul>
        {authStatus === AuthStatus.Auth ? (
          <ul className="user-navigation">
            <li className="user-navigation__link user-navigation__link--auth">{email}</li>
            <li><button
              className="user-navigation__link"
              onClick={logoutClickHandler}
            >
              {isLoading && <div className="button-spinner"></div>}
              logout
            </button></li>
          </ul>
        ) : (
          <ul className="user-navigation">
            {renderRoutes(AuthRoute, 'user', pathname)}
          </ul>
        )}
      </div>
    </nav>
  );
}

export { Navigation };
