import { useState, useEffect, useRef } from "react";
import { Form, json, useLoaderData } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import ChatContent from "./ChatContent";
import { io } from "socket.io-client";
import styles from "./ChatDetail.module.css";
const socket = io(process.env.REACT_APP_API_URL);

const ChatDetail = () => {
  const [isDataMessage, setIsDataMesage] = useState([]);
  const [isValueInputMessage, setIsValueInputMessage] = useState("");
  const [isDataSocket, setIsDataSocket] = useState();
  const scrollRef = useRef();

  const { message } = useLoaderData();
  useEffect(() => {
    if (message) {
      setIsDataMesage(message);
    }
  }, [message]);

  const changeInputHandler = (e) => {
    setIsValueInputMessage(e.target.value);
  };
  const submitHandler = (e) => {
    if (isValueInputMessage.trim() === "") {
      return e.preventDefault();
    }
    socket.emit("create_room", isDataMessage[0].conversationId.toString());
    setIsValueInputMessage("");
  };

  //-------------------------soket io------------------------------

  useEffect(() => {
    socket.on("send_message", (data) => {
      setIsDataSocket(data);
    });
  }, []);
  useEffect(() => {
    if (isDataSocket) {
      setIsDataMesage((prev) => [...prev, isDataSocket]);
    }
  }, [isDataSocket]);
  //-------------------------------
  useEffect(() => {
    scrollRef.current &&
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [isDataMessage]);

  return (
    <section className={styles.container__chatDetail}>
      <main className={styles.content__chatDetail}>
        {isDataMessage.length > 0 &&
          isDataMessage.map((item) => {
            return (
              <div key={item._id} ref={scrollRef}>
                <ChatContent data={item} />
              </div>
            );
          })}
      </main>
      <Form
        className={styles.form__chatDetail}
        method="POST"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          placeholder="Type and enter"
          name="message"
          value={isValueInputMessage}
          onChange={changeInputHandler}
        />
        {isDataMessage.length > 0 && (
          <input
            type="text"
            value={isDataMessage[0].conversationId}
            name="roomId"
            hidden
            readOnly
          />
        )}
        <button className={styles.btn__submit}>
          <IoIosSend />
        </button>
      </Form>
    </section>
  );
};
export default ChatDetail;

export const loader = async ({ request, params }) => {
  const chatId = params.chatId;
  const response = await fetch(
    process.env.REACT_APP_API_URL + `/chat/admin/get_message/${chatId}`,
    { method: "GET", credentials: "include" }
  );
  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }
  const data = await response.json();
  return data;
};

export const action = async ({ request, params }) => {
  const method = request.method;
  const inputValue = await request.formData();
  const body = {
    text: inputValue.get("message"),
    roomId: inputValue.get("roomId"),
  };

  const response = await fetch(
    process.env.REACT_APP_API_URL + "/chat/admin/post_message",
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }

  return null;
};
