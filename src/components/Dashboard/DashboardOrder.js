import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
const DashboardOrder = ({ data }) => {
  return (
    <main className={styles.container__order}>
      <h3>History</h3>
      <table className={styles.table__order}>
        <thead className={styles.table__header}>
          <tr>
            <th>ID User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {data &&
            data.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.user.userId}</td>
                  <td>{item.user.name}</td>
                  <td>0{item.user.phoneNumber}</td>
                  <td>{item.user.address}</td>
                  <td>{item.total.toLocaleString()}</td>
                  <td>{item.delivery}</td>
                  <td>{item.status}</td>
                  <td className={styles.link__detail}>
                    <Link>View</Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </main>
  );
};
export default DashboardOrder;
