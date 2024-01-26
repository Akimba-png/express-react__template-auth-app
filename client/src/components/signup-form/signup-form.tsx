import { useNavigate, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/state-hook';
import { signup } from '../../store/slices/user-slice/assync-reducers/signup';
import { RegData } from '../../models/user';
import { AppRoute, AuthStatus, LoadingStatus } from '../../const';
import './signup-form.style.css';



function SignupForm(): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<RegData>({ mode: 'onBlur' });
  const { loadingStatus, authStatus, error } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = loadingStatus === LoadingStatus.Pending;

  if (authStatus === AuthStatus.Auth) {
    return (
      <Navigate to={AppRoute.Main} />
    );
  }

  const formSubmitHandler: SubmitHandler<RegData> = async (data) => {
    const result = await dispatch(signup(data));
    if (signup.fulfilled.match(result)) {
      navigate(AppRoute.Main);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(formSubmitHandler)}>
      <fieldset className="auth-form__group" disabled={isLoading}>
        <ul className="auth-form__list">

          <li className="auth-form__item">
            <label htmlFor="name">User name:</label>
            <input className="auth-form__input" type="text" id="name" placeholder="user name" autoComplete="name"
              {...register("name", {
                required: 'must be filled',
                minLength: {value: 3, message: 'min 3 symbols'},
                maxLength: {value: 10, message: 'max 10 symbols'},
              })}
            />
            {errors.name && <span className="auth-form__error-field">{errors.name.message}</span>}
          </li>

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

export { SignupForm };
