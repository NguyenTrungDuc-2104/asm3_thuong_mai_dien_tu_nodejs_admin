import { useEffect, useState } from "react";
import { useLoaderData, NavLink, Outlet } from "react-router-dom";
import { FcBusinessman } from "react-icons/fc";
import { io } from "socket.io-client";
import styles from "./Chat.module.css";

const socket = io(process.env.REACT_APP_API_URL);

const Chat = () => {
  const { conversation } = useLoaderData();
  const [isDataConversation, setIsDataConverSation] = useState([]);
  const [isDataSocket, setIsDataSocket] = useState();

  useEffect(() => {
    setIsDataConverSation(conversation);
    //-----socket----
    socket.on("new_conversation", (data) => {
      setIsDataSocket(data);
    });
  }, []);

  useEffect(() => {
    if (isDataSocket) {
      setIsDataConverSation((prev) => [...prev, isDataSocket]);
    }
  }, [isDataSocket]);

  return (
    <section className={styles.container__chat}>
      <article className={styles.container__chat_conversation}>
        {isDataConversation &&
          isDataConversation.map((item) => {
            return (
              <NavLink
                to={item._id}
                key={item._id}
                className={({ isActive }) => (isActive ? styles.active : null)}
              >
                <div className={styles.icon__conversation}>
                  <FcBusinessman />
                </div>
                <p>{item._id}</p>
              </NavLink>
            );
          })}
      </article>
      <main className={styles.container__chat_message}>
        <Outlet />
      </main>
    </section>
  );
};
export default Chat;
