import logo from "../assets/logo.svg";
import { FiSearch } from "react-icons/fi";
import { LuArrowDownNarrowWide } from "react-icons/lu";
import { LuArrowUpWideNarrow } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({
  token,
  setToken,
  title,
  setTitle,
  btnFilterAsc,
  setBtnFilterAsc,
}) => {
  const navigate = useNavigate();
  // const token = Cookies.get("token");
  // console.log(token);

  return (
    <>
      <header>
        <nav className="container">
          <Link to="/" className="logo">
            <img src={logo} alt="logo vinted" />
          </Link>
          <form className="search-form">
            <div className="search-bar">
              <FiSearch className="icon-search" />
              <input
                type="text"
                placeholder="Recherche des articles"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="filter-asc-desc">
              <p>Trier par prix</p>
              <input
                type="checkbox"
                name="asc"
                checked={btnFilterAsc}
                // onClick={() => {
                //   const newState = !btnFilterAsc;
                //   setBtnFilterAsc(newState);
                // }}
              />
              <LuArrowUpWideNarrow className="icon-up" />
              {/* <input
                type="checkbox"
                name="desc"
                checked={!btnFilterAsc}
                onClick={() => {
                  setBtnFilterAsc(!btnFilterAsc);
                }}
              />
              <LuArrowDownNarrowWide className="icon-down" /> */}
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

            <button
              className="btn-sell"
              // mettre le state ici pour renvoyer sur la page precedente
              onClick={() => {
                if (token) {
                  navigate("/publish");
                } else {
                  navigate("/login");
                }
              }}
            >
              Vends tes articles
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
