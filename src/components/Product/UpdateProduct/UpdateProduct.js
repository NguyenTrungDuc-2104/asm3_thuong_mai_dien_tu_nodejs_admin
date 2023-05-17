import { useState, useEffect } from "react";
import { Form, useLoaderData } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import styles from "./Update.module.css";

const UpdateProduct = () => {
  const [isArrayImgSrc, setIsArrayImgSrc] = useState();
  const dataProduct = useLoaderData();

  const {
    value: productNameInputValue,
    checkInput: productNameInputCheck,
    hasError: productNameInputError,
    onBlurInputHandler: productNameOnblurInput,
    valueChangeHandler: productNameChangeValue,
    setValueHandler: productNameSetValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: categoryInputValue,
    checkInput: categoryInputCheck,
    hasError: categoryInputError,
    onBlurInputHandler: categoryOnblurInput,
    valueChangeHandler: categoryChangeValue,
    setValueHandler: categorySetValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: priceInputValue,
    checkInput: priceInputCheck,
    hasError: priceInputError,
    onBlurInputHandler: priceOnblurInput,
    valueChangeHandler: priceChangeValue,
    setValueHandler: priceSetValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: countInputValue,
    checkInput: countInputCheck,
    hasError: countInputError,
    onBlurInputHandler: countOnblurInput,
    valueChangeHandler: countChangeValue,
    setValueHandler: countSetValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: shortDescInputValue,
    checkInput: shortDescInputCheck,
    hasError: shortDescInputError,
    onBlurInputHandler: shortDescOnblurInput,
    valueChangeHandler: shortDescChangeValue,
    setValueHandler: shortDescSetValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: longDescInputValue,
    checkInput: longDescInputCheck,
    hasError: longDescInputError,
    onBlurInputHandler: longDescOnblurInput,
    valueChangeHandler: longDescChangeValue,
    setValueHandler: longDescSetValue,
  } = useInput((value) => value.trim() !== "");

  useEffect(() => {
    if (dataProduct) {
      productNameSetValue(dataProduct.product.name);
      categorySetValue(dataProduct.product.category);
      priceSetValue(dataProduct.product.price.toString());
      countSetValue(dataProduct.product.count.toString());
      shortDescSetValue(dataProduct.product.short_desc);
      longDescSetValue(dataProduct.product.long_desc);

      const imgArr = [
        dataProduct.product.img1,
        dataProduct.product.img2,
        dataProduct.product.img3,
        dataProduct.product.img4,
      ];
      setIsArrayImgSrc(imgArr);
    }
  }, [dataProduct]);

  const submitHanlder = (e) => {
    if (
      priceInputError ||
      categoryInputError ||
      priceInputError ||
      countInputError ||
      shortDescInputError ||
      longDescInputError
    ) {
      e.preventDefault();
      window.alert("Validate input");
    }
  };

  return (
    <Form
      className={styles.newProduct__form}
      method="PATCH"
      onSubmit={submitHanlder}
    >
      <input
        type="text"
        name="productId"
        readOnly
        value={dataProduct.product._id}
        hidden
      />
      <div className={styles.content__input}>
        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          placeholder="Enter Product Name"
          value={productNameInputValue}
          onChange={productNameChangeValue}
          onBlur={productNameOnblurInput}
          className={productNameInputError ? styles.input__error : null}
        />
      </div>

      <div className={styles.content__input}>
        <label>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Enter Category"
          value={categoryInputValue}
          onChange={categoryChangeValue}
          onBlur={categoryOnblurInput}
          className={categoryInputError ? styles.input__error : null}
        />
      </div>

      <div className={styles.content__input}>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter Price"
            value={priceInputValue}
            onChange={priceChangeValue}
            onBlur={priceOnblurInput}
            className={priceInputError ? styles.input__error : null}
          />
        </div>
        <div>
          <label htmlFor="count">Count</label>
          <input
            type="number"
            name="count"
            id="count"
            placeholder="Enter COunt"
            value={countInputValue}
            onChange={countChangeValue}
            onBlur={countOnblurInput}
            className={countInputError ? styles.input__error : null}
          />
        </div>
      </div>

      <div className={styles.content__input}>
        <label>Short Description</label>
        <textarea
          rows="6"
          name="short_desc"
          placeholder="Enter Short Description"
          value={shortDescInputValue}
          onChange={shortDescChangeValue}
          onBlur={shortDescOnblurInput}
          className={shortDescInputError ? styles.input__error : null}
        />
      </div>

      <div className={styles.content__input}>
        <label>Long Description</label>
        <textarea
          rows="10"
          name="long_desc"
          placeholder="Enter Long Description"
          value={longDescInputValue}
          onChange={longDescChangeValue}
          onBlur={longDescOnblurInput}
          className={longDescInputError ? styles.input__error : null}
        />
      </div>

      <div className={styles.content__file}>
        <p>Images Product</p>
        <div className={styles.content__img}>
          {isArrayImgSrc &&
            isArrayImgSrc.map((item, index) => {
              return (
                <figure key={index} className={styles.box__img}>
                  <img src={item} alt={item} className={styles.img} />
                </figure>
              );
            })}
        </div>
      </div>
      <div className={styles.content__btn}>
        <button className={styles.btn_submit}>Submit</button>
      </div>
    </Form>
  );
};
export default UpdateProduct;
