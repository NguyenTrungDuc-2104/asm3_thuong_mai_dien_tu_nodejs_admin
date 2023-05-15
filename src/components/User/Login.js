import { Form, Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import styles from "./Uer.module.css";

const LoginForm = () => {
  const {
    value: emailInputValue,
    checkInput: emailInputCheck,
    hasError: emailInputError,
    onBlurInputHandler: emailOnblurInput,
    valueChangeHandler: emailChangeValue,
  } = useInput((value) => value.includes("@") && value.includes(".com"));

  const {
    value: passwordInputValue,
    checkInput: passwordInputCheck,
    hasError: passwordInputError,
    onBlurInputHandler: passwordOnblurInput,
    valueChangeHandler: passwordChangeValue,
  } = useInput((value) => value.trim().length > 6);
  //--------------------------------------------

  const submitHandler = (e) => {
    if (!(emailInputCheck && passwordInputCheck)) {
      e.preventDefault();
      emailOnblurInput();
      passwordOnblurInput();
      return;
    }
  };

  return (
    <>
      <div className={styles.overlay} />
      <section
        className={`${styles.container__user} ${styles.container__user_login}`}
      >
        <p className={styles.form__user_header}>Sign In</p>
        <Form
          method="POST"
          className={styles.form__user}
          onSubmit={submitHandler}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={emailInputValue}
            onChange={emailChangeValue}
            onBlur={emailOnblurInput}
            className={emailInputError ? styles.input__error : null}
          />
          {emailInputError && (
            <p className={styles.text__input_error}>
              Email must include @ and .com characters
            </p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={passwordInputValue}
            onChange={passwordChangeValue}
            onBlur={passwordOnblurInput}
            className={passwordInputError ? styles.input__error : null}
          />
          {passwordInputError && (
            <p className={styles.text__input_error}>
              Password must be more than 6 characters
            </p>
          )}
          <button className={styles.form__user_btn}>SIGN IN</button>
        </Form>
        <footer className={styles.form__user_footer}>
          <div className={styles.form__user_change}>
            <p>Create an account?</p>
            <Link to="/register">Sign up</Link>
          </div>
        </footer>
      </section>
    </>
  );
};
export default LoginForm;
