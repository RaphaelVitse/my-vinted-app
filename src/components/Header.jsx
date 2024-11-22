import logo from "../assets/logo.svg";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  // const token = Cookies.get("token");
  // console.log(token);

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
            {token ? (
              <button
                className="btn-disconnect"
                onClick={() => {
                  Cookies.remove("token");
                  setToken(null);
                }}
              >
                Se déconnecter
              </button>
            ) : (
              <>
                <button
                  className="btn-subs-login"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  S'inscrire
                </button>

                <button
                  className="btn-subs-login"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Se connecter
                </button>
              </>
            )}

            <button className="btn-sell">Vends tes articles</button>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
