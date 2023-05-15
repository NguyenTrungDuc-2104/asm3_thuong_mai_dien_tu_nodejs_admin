import { json } from "react-router-dom";
import Chat from "../components/Chat/Chat";

const ChatPage = () => {
  return <Chat />;
};
export default ChatPage;

export const loader = async ({ request, params }) => {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/chat/admin/get_conversation",
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw json({ message: error.message }, { status: response.status });
  }

  const data = await response.json();

  return data;
};
