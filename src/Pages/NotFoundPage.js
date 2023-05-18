import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <section className="container__404">
      <h1>404</h1>
      <p>Not found page {":(("}</p>
      <Link to="/">Go to home page</Link>
    </section>
  );
};
export default NotFoundPage;
