import { useState } from "react";
const useInput = (validateInput) => {
  const [isValue, setIsValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const checkInput = validateInput(isValue);
  const hasError = !checkInput && isTouch;

  const valueChangeHandler = (e) => {
    setIsValue(e.target.value);
  };
  const onBlurInputHandler = (e) => {
    setIsTouch(true);
  };
  const setValueHandler = (e) => {
    setIsValue(e);
  };
  const resetInputHandler = () => {
    setIsValue("");
    setIsTouch(false);
  };

  return {
    value: isValue,
    hasError,
    checkInput,
    valueChangeHandler,
    onBlurInputHandler,
    setValueHandler,
    resetInputHandler,
  };
};

export default useInput;
