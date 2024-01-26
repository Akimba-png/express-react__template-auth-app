import { LoginForm } from './../../components/login-form/login-form';
import './login-page.style.css';

function LoginPage(): JSX.Element {
  return (
    <section className="login-page container">
      <h2 className='login-page__title'>Fill out to login</h2>
      <LoginForm />
    </section>
  );
}

export { LoginPage };
