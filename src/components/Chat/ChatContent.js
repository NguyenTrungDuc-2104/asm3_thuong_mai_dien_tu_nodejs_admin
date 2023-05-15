import { format } from "timeago.js";
import { FcBusinessman } from "react-icons/fc";
import styles from "./ChatDetail.module.css";

const ChatContent = (props) => {
  const containerClasses =
    props.data.sender.role !== "customer"
      ? `${styles.container__message} ${styles.content__message_own}`
      : styles.container__message;
  const textClasses =
    props.data.sender.role !== "customer"
      ? `${styles.message__text} ${styles.message__text_own}`
      : styles.message__text;
  return (
    <div className={containerClasses}>
      <div className={styles.content__message}>
        <div className={textClasses}>
          {props.data.sender.role === "customer" && (
            <span className={styles.icon__admin}>{<FcBusinessman />}</span>
          )}
          <p>{props.data.text}</p>
        </div>
        <p>{format(props.data.createdAt)}</p>
      </div>
    </div>
  );
};
export default ChatContent;
