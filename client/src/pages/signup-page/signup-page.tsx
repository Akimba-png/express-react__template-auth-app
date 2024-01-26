import { SignupForm } from '../../components/signup-form/signup-form';
import './signup-page.style.css';

function SignupPage(): JSX.Element {
  return (
    <section className="signup-page container">
      <h2 className='signup-page__title'>Fill out to sign up</h2>
      <SignupForm />
    </section>
  );
}

export { SignupPage };
