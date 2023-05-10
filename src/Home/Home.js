import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import styles from "./Home.module.css";
const Home = () => {
  const prodData = useLoaderData();
  const [isProducts, setIsProducts] = useState([]);
  const [isPage, setIsPage] = useState(1);
  // let products = prodData.products;
  //-----------------------search------------------------------
  let timeoutId;

  const changInputHandler = (e) => {
    const searchText = e.target.value;

    // Hủy bỏ các setTimeout trước đó (nếu có)
    clearTimeout(timeoutId);

    // Thiết lập một setTimeout mới
    timeoutId = setTimeout(() => {
      const productsSearch = prodData.products.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setIsProducts(productsSearch);
    }, 500);
  };
  // -------------------------paging--------------------------
  const currentProd = 4;
  const totalPage = Math.ceil(prodData.totalProduct / currentProd);
  useEffect(() => {
    if (prodData.products.length > currentProd) {
      const startIndex = (isPage - 1) * currentProd;
      const endIndex = startIndex + currentProd;
      const products = prodData.products.slice(startIndex, endIndex);
      setIsProducts(products);
    } else {
      setIsProducts(prodData.products);
    }
  }, [prodData, isPage]);

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
            <td>Edit</td>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {isProducts &&
            isProducts.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td className={styles.container__img}>
                    <img src={item.img1} alt={item.name} />
                  </td>
                  <td>{item.category}</td>
                  <td>
                    <div className={styles.container__btn}>
                      <button>Update</button>
                      <button>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {isProducts.length > currentProd && (
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
      )}
    </section>
  );
};
export default Home;
