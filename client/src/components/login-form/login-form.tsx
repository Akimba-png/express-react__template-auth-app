import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/state-hook';
import { login } from '../../store/slices/user-slice/assync-reducers/login';
import { Credentials } from '../../models/user';
import { AppRoute, LoadingStatus } from '../../const';
import './login-form.style.css';

function LoginForm(): JSX.Element {
  const {register, formState: { errors }, handleSubmit, reset } = useForm<Credentials>( {mode: 'onBlur'} );
  const { loadingStatus, error } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = loadingStatus === LoadingStatus.Pending;

  const formSubmitHandler: SubmitHandler<Credentials> = async (data) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      reset();
      navigate(AppRoute.Main);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(formSubmitHandler)}>
      <fieldset className="auth-form__group" disabled={isLoading}>
        <ul className="auth-form__list">

          <li className="auth-form__item">
            <label htmlFor="email">User email:</label>
            <input className="auth-form__input" type="email" id="email" placeholder="example@expample.com" autoComplete="email" required
              {...register("email", {
                required: 'must be filled',
                pattern: { value: /^\S+@\S+$/i, message: "use format email@example.com" },
              })}
            />
            {errors.email && <span className="auth-form__error-field">{errors.email.message}</span>}
          </li>

          <li className="auth-form__item">
            <label htmlFor="password">User password:</label>
            <input className="auth-form__input" type="password" id="password" placeholder="more then 3 characters" autoComplete="new password" required
              {...register("password", {
                required: 'must be filled',
                minLength: {value: 3, message: 'min 3 symbols'},
                maxLength: {value: 10, message: 'max 10 symbols'},
              })}
            />
            {errors.password && <span className="auth-form__error-field">{errors.password.message}</span>}
          </li>

        </ul>
      </fieldset>
      <button className={`auth-form__submit-button ${error && "auth-form__submit-button--rejected"}`} type="submit"  disabled={isLoading}>
        {isLoading && <div className="button-spinner"></div>}
        Submit
      </button>
    </form>
  );
}

export { LoginForm };
