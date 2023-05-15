import { useLoaderData } from "react-router-dom";
import DashboardInfo from "./DashboardInfo";
import DashboardOrder from "./DashboardOrder";
import styles from "./Dashboard.module.css";
const Dashboard = () => {
  const data = useLoaderData();
  const totalEarnings = data.order.reduce(
    (total, item) => (total = total + item.total),
    0
  );

  return (
    <section className={styles.container__dashboard}>
      {/* <h1>Dashboard</h1> */}
      <DashboardInfo
        data={{
          countUser: data.countUser,
          countNewOrder: data.countNewOrder,
          totalEarnings,
        }}
      />
      <DashboardOrder data={data.order} />
    </section>
  );
};
export default Dashboard;
