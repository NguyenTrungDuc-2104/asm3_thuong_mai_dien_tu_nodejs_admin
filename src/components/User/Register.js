import { Form, Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { BsArrowRight } from "react-icons/bs";
import styles from "./Uer.module.css";

const RegisterForm = () => {
  const {
    value: nameInputValue,
    checkInput: nameInputCheck,
    hasError: nameInputError,
    valueChangeHandler: nameChangeValue,
    onBlurInputHandler: nameOnblurInput,
  } = useInput((value) => value.trim() !== "");

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

  const {
    value: phoneInputValue,
    checkInput: phoneInputCheck,
    hasError: phoneInputError,
    valueChangeHandler: phoneChangeValue,
    onBlurInputHandler: phoneOnblurInput,
  } = useInput((value) => value.trim().length === 10);
  //--------------------------------------------
  const submitHandler = (e) => {
    if (
      !(
        nameInputCheck &&
        emailInputCheck &&
        passwordInputCheck &&
        phoneInputCheck
      )
    ) {
      e.preventDefault();
      nameOnblurInput();
      emailOnblurInput();
      passwordOnblurInput();
      phoneOnblurInput();
      return;
    }
  };
  return (
    <>
      <div className={styles.overlay} />
      <section
        className={`${styles.container__user} ${styles.container__user_register}`}
      >
        <p className={styles.form__user_header}>Sign Up</p>
        <Form
          method="POST"
          className={styles.form__user}
          onSubmit={submitHandler}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={nameInputValue}
            onChange={nameChangeValue}
            onBlur={nameOnblurInput}
            className={nameInputError ? styles.input__error : null}
          />
          {nameInputError && (
            <p className={styles.text__input_error}>Please enter your name</p>
          )}

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

          <input
            type="number"
            name="phoneNumber"
            placeholder="Phone"
            value={phoneInputValue}
            onChange={phoneChangeValue}
            onBlur={phoneOnblurInput}
            className={phoneInputError ? styles.input__error : null}
          />
          {phoneInputError && (
            <p className={styles.text__input_error}>
              Phone number must consist of 10 numbers
            </p>
          )}

          <button className={styles.form__user_btn}>SIGN IN</button>
        </Form>
        <footer className={styles.form__user_footer}>
          <div className={styles.form__user_change}>
            <p>Login?</p>
            <Link to="/login">Click</Link>
          </div>
        </footer>
      </section>
    </>
  );
};
export default RegisterForm;
