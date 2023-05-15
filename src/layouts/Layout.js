import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import styles from "./Layout.module.css";
const Layout = () => {
  return (
    <main className={styles.container_layout}>
      <h1>Admin Page</h1>
      <div className={styles.none_layout} />
      <div className={styles.nav_layout}>
        <Navbar />
      </div>
      <div className={styles.outlet_layout}>
        <Outlet />
      </div>
    </main>
  );
};
export default Layout;
