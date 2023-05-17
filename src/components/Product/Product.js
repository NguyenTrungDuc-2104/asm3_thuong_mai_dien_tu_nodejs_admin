import { useState, useEffect } from "react";
import { useLoaderData, Link, useSubmit } from "react-router-dom";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import styles from "./Product.module.css";

const Product = () => {
  const prodData = useLoaderData();
  const [isProducts, setIsProducts] = useState([]);
  const [isProductsPaging, setIsProductsPaging] = useState([]);
  const [isPage, setIsPage] = useState(1);
  const submit = useSubmit();

  useEffect(() => {
    setIsProducts(prodData.products);
  }, [prodData]);
  //-----------------------search------------------------------
  let timeoutId;
  const changInputHandler = (e) => {
    const searchText = e.target.value;
    // Hủy bỏ các setTimeout trước đó (nếu có)
    clearTimeout(timeoutId);
    // Thiết lập một setTimeout mới
    timeoutId = setTimeout(() => {
      const products = prodData.products.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setIsProducts(products);
    }, 500);
  };

  // -------------------------paging--------------------------
  const currentProd = 8;
  const totalPage = Math.ceil(isProducts.length / currentProd);
  useEffect(() => {
    if (isProducts.length > currentProd) {
      const startIndex = (isPage - 1) * currentProd;
      const endIndex = startIndex + currentProd;
      const products = isProducts.slice(startIndex, endIndex);
      setIsProductsPaging(products);
    } else {
      setIsProductsPaging(isProducts);
    }
  }, [isProducts, isPage]);

  const increasePageHandler = () => {
    if (isPage < totalPage) {
      setIsPage((prev) => prev + 1);
    }
  };
  const decreasePageHandler = () => {
    if (isPage > 1) {
      setIsPage((prev) => prev - 1);
    }
  };

  //----------------------delete product----------------
  const deleteHander = (productId) => {
    if (!window.confirm("Are you sure ?")) {
      return;
    }
    submit({ productId: JSON.stringify(productId) }, { method: "DELETE" });
  };
  return (
    <section className={styles.container__home}>
      <header className={styles.home__header}>
        <h1>Products</h1>
        <input
          type="text"
          name="text"
          placeholder="Enter Search!"
          onChange={changInputHandler}
        />
      </header>
      <table className={styles.home__table}>
        <thead className={styles.table__header}>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Price</td>
            <td>Image</td>
            <td>Category</td>
            <td>Count</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {isProductsPaging &&
            isProductsPaging.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td className={styles.container__img}>
                    <img src={item.img1} alt={item.name} />
                  </td>
                  <td>{item.category}</td>
                  <td>{item.count}</td>
                  <td>
                    <div className={styles.container__btn}>
                      <Link to={item._id}>Update</Link>
                      <button onClick={deleteHander.bind(null, item._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <footer className={styles.container__footer}>
        <MdKeyboardDoubleArrowLeft
          onClick={decreasePageHandler}
          className={styles.footer__icon}
        />
        <p>
          {isPage}-{totalPage}
        </p>
        <MdKeyboardDoubleArrowRight
          onClick={increasePageHandler}
          className={styles.footer__icon}
        />
      </footer>
    </section>
  );
};
export default Product;
