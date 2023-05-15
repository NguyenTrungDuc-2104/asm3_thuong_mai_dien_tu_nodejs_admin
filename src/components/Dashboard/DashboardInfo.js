import { AiOutlineFileAdd, AiOutlineUserAdd } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import styles from "./Dashboard.module.css";

const DashboardInfo = ({ data }) => {
  return (
    <header className={styles.container__info}>
      <div className={styles.info__card}>
        <div className={styles.content__info}>
          <h1>{data.countUser}</h1>
          <p>Clients</p>
        </div>
        <div className={styles.info__icon}>
          <AiOutlineUserAdd />
        </div>
      </div>

      <div className={styles.info__card}>
        <div className={styles.content__info}>
          <h1>
            {data.totalEarnings.toLocaleString()} <span>VND</span>
          </h1>
          <p>Total Earnings</p>
        </div>
        <div className={styles.info__icon}>
          <BsCurrencyDollar />
        </div>
      </div>

      <div className={styles.info__card}>
        <div className={styles.content__info}>
          <h1>{data.countNewOrder}</h1>
          <p>New Order</p>
        </div>
        <div className={styles.info__icon}>
          <AiOutlineFileAdd />
        </div>
      </div>
    </header>
  );
};
export default DashboardInfo;
