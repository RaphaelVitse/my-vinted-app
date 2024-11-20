import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>je suis dans le home</h1>
      <Link to="/Offer/:id">Aller vers Offer</Link>
    </div>
  );
};

export default Home;
