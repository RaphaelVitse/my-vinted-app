import logo from "../assets/logo.svg";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <nav className="container">
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="logo vinted" />
          </div>
          <form>
            <div className="search-bar">
              <FiSearch className="icon-search" />
              <input type="text" placeholder="Recherche des articles" />
            </div>
          </form>
          <div className="btn">
            <button className="btn-subs-login">S'inscrire</button>
            <button className="btn-subs-login">Se connecter</button>
            <button className="btn-sell">Vends tes articles</button>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
