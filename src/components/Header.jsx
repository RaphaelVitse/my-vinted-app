import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <>
      <header>
        <nav className="container">
          <div className="logo">
            <img src={logo} alt="logo vinted" />
          </div>
          <div className="btn">
            <button>S'inscrire</button>
            <button>Se connecter</button>
            <button>Vends tes articles</button>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
