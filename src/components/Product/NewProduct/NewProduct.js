import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import styles from "./NewProduct.module.css";
const NewProduct = () => {
  const [selectedImg, setSelectedImg] = useState([]);
  const [isArrayImgSrc, setIsArrayImgSrc] = useState();
  const navigate = useNavigate();
  const {
    value: productNameInputValue,
    checkInput: productNameInputCheck,
    hasError: productNameInputError,
    onBlurInputHandler: productNameOnblurInput,
    valueChangeHandler: productNameChangeValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: categoryInputValue,
    checkInput: categoryInputCheck,
    hasError: categoryInputError,
    onBlurInputHandler: categoryOnblurInput,
    valueChangeHandler: categoryChangeValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: priceInputValue,
    checkInput: priceInputCheck,
    hasError: priceInputError,
    onBlurInputHandler: priceOnblurInput,
    valueChangeHandler: priceChangeValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: countInputValue,
    checkInput: countInputCheck,
    hasError: countInputError,
    onBlurInputHandler: countOnblurInput,
    valueChangeHandler: countChangeValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: shortDescInputValue,
    checkInput: shortDescInputCheck,
    hasError: shortDescInputError,
    onBlurInputHandler: shortDescOnblurInput,
    valueChangeHandler: shortDescChangeValue,
  } = useInput((value) => value.trim() !== "");
  const {
    value: longDescInputValue,
    checkInput: longDescInputCheck,
    hasError: longDescInputError,
    onBlurInputHandler: longDescOnblurInput,
    valueChangeHandler: longDescChangeValue,
  } = useInput((value) => value.trim() !== "");

  //-----------change img handler----------
  const imgChangeHandle = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      window.alert("Only up to 4 image files can be selected");
      return;
    }
    const imgSrc = files.map((item) => {
      return URL.createObjectURL(item);
    });
    setIsArrayImgSrc(imgSrc);
    setSelectedImg(files);
  };

  //----------------------------post new product---------------------
  const postProduct = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedImg.length; i++) {
      formData.append("images", selectedImg[i]);
    }
    formData.append("name", productNameInputValue);
    formData.append("category", categoryInputValue);
    formData.append("price", priceInputValue);
    formData.append("count", countInputValue);
    formData.append("short_desc", shortDescInputValue);
    formData.append("long_desc", longDescInputValue);

    const response = await fetch(
      process.env.REACT_APP_API_URL + "/product/admin/post_product",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    if (response.status === 401) {
      window.alert("You are not authorized to make this request");
      return;
    }
    if (response.status === 422) {
      const error = await response.json();
      window.alert(error.message);
      return;
    }
    if (!response.ok) {
      console.log(response);
      return;
    }
    const data = await response.json();
    window.alert(data.message);
    navigate("/product");
  };

  //----------submit handler-----------
  const onSubmitHanlde = (e) => {
    e.preventDefault();
    if (
      !productNameInputCheck ||
      !categoryInputCheck ||
      !priceInputCheck ||
      !countInputCheck ||
      !shortDescInputCheck ||
      !longDescInputCheck
    ) {
      productNameOnblurInput();
      categoryOnblurInput();
      priceOnblurInput();
      countOnblurInput();
      shortDescOnblurInput();
      longDescOnblurInput();
      return;
    }
    if (!(selectedImg.length === 4)) {
      window.alert("Please choose 4 images");
      return;
    }
    postProduct();
  };

  return (
    <form className={styles.newProduct__form} onSubmit={onSubmitHanlde}>
      <div className={styles.content__input}>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          name="productName"
          id="productName"
          placeholder="Enter Product Name"
          value={productNameInputValue}
          onChange={productNameChangeValue}
          onBlur={productNameOnblurInput}
          className={productNameInputError ? styles.input__error : null}
        />
      </div>

      <div className={styles.content__input}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          id="category"
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
            placeholder="Enter Count"
            value={countInputValue}
            onChange={countChangeValue}
            onBlur={countOnblurInput}
            className={countInputError ? styles.input__error : null}
          />
        </div>
      </div>

      <div className={styles.content__input}>
        <label htmlFor="short_desc">Short Description</label>
        <textarea
          rows="6"
          name="short_desc"
          id="short_desc"
          placeholder="Enter Short Description"
          value={shortDescInputValue}
          onChange={shortDescChangeValue}
          onBlur={shortDescOnblurInput}
          className={shortDescInputError ? styles.input__error : null}
        />
      </div>

      <div className={styles.content__input}>
        <label htmlFor="long_desc">Long Description</label>
        <textarea
          rows="10"
          name="long_desc"
          id="long_desc"
          placeholder="Enter Long Description"
          value={longDescInputValue}
          onChange={longDescChangeValue}
          onBlur={longDescOnblurInput}
          className={longDescInputError ? styles.input__error : null}
        />
      </div>

      <div className={styles.content__file}>
        <label htmlFor="images">Upload images (4 images)</label>
        <input
          type="file"
          multiple
          id="images"
          accept="image/*"
          name="images"
          onChange={imgChangeHandle}
        />
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
    </form>
  );
};
export default NewProduct;
