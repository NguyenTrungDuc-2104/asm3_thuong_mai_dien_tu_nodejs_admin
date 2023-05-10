import { NavLink } from "react-router-dom";
import {
  FaThLarge,
  FaRegUser,
  FaShapes,
  FaRegWindowMaximize,
  FaTruck,
} from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container_nav}>
      <ul className={styles.content_nav}>
        <div className={styles.nav_type}>
          <p>MAIN</p>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <FaThLarge />
              <p>Products</p>
            </NavLink>
          </li>
        </div>

        <div className={styles.nav_type}>
          <p>LIST</p>
          <li>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <FaRegUser />
              <p>Users</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/room"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <FaRegWindowMaximize />
              <p>Rooms</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transaction"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <FaTruck />
              <p>Transactions</p>
            </NavLink>
          </li>
        </div>

        <div className={styles.nav_type}>
          <p>NEW</p>
          <li>
            <NavLink
              to="/add_new_hotel"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <FaShapes />
              <p>New Product</p>
            </NavLink>
          </li>
        </div>

        <div className={styles.nav_type}>
          <p>USER</p>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <RiLogoutBoxRLine />
              <p>Logout</p>
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
