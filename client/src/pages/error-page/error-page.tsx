import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';


function ErrorPage(): JSX.Element {
  return (
    <>
      <h1>Error page</h1>
      <Link to={AppRoute.Main}>На главную</Link>
    </>
  );
}

export { ErrorPage };
