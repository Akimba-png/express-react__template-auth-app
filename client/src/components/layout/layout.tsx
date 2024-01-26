import { Outlet } from 'react-router-dom';
import { Navigation } from '../navigation/navigation';

function Layout(): JSX.Element {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export { Layout };
