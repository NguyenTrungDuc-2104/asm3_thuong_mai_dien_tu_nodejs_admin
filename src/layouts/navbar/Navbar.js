import { useEffect } from "react";
import { NavLink, useNavigate, useSubmit } from "react-router-dom";
import { FaThLarge, FaShapes } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const submit = useSubmit();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  //---------------------------logout handler------------------------
  const logoutHandler = () => {
    if (window.confirm("Are you sure?")) {
      localStorage.removeItem("user");
      submit(null, { method: "DELETE", action: "/" });
    }
  };

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
              <p>Dashboard</p>
            </NavLink>
          </li>
        </div>

        <div className={styles.nav_type}>
          <p>LIST</p>
          <li>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <FaShapes />
              <p>Products</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <BsFillChatDotsFill />
              <p>Message</p>
            </NavLink>
          </li>
        </div>

        <div className={styles.nav_type}>
          <p>NEW</p>
          <li>
            <NavLink
              to="/new_product"
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
          <p>USER ({user ? user.name : null})</p>
          <li>
            <button className={styles.btn__logout} onClick={logoutHandler}>
              <RiLogoutBoxRLine />
              <p>Logout</p>
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
