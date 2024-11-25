import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

const Signup = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        { username, email, password, newsletter }
      );
      console.log(response.data.token);
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      setToken(token);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez compléter tous les champs !");
      } else if (error.response.status === 409) {
        setErrorMessage("L'adresse mail saisie existe déjà");
      } else {
        setErrorMessage("Une erreur est survenue, merci de réessayer");
      }
    }
  };

  return (
    <>
      <form className="signup-login-form" onSubmit={handleSubmit}>
        <h2 className="title-form">S'inscrire</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="mail"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="input-password"
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="newsletter">
          <input
            className=".checkbox"
            type="checkbox"
            name="newsletter"
            checked={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <p className="txt-sub-newsletter">S'inscrire à notre newsletter</p>
        </div>
        <p className="accept-text">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button type="submit" className="btn-signup-login">
          S'inscrire"
        </button>
        {errorMessage && <p className="error-message"> {errorMessage}</p>}
        <Link
          style={{ textDecoration: "none" }}
          className="link-login-signup"
          to="/login"
        >
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </form>
    </>
  );
};

export default Signup;

// const [formData, setFormData] = useState({
//   username: "",
//   email: "",
//   password: "",
//   newsletter: false,
// });

// const handleChangeUsername = (event) => {
//   const value = event.target.value;
//   const newFormData = {
//     ...formData,
//     username: value,
//   };

//   setFormData(newFormData);
// };
// const handleChangeEmail = (event) => {
//   const value = event.target.value;
//   const newFormData = {
//     ...formData,
//     email: value,
//   };

//   setFormData(newFormData);
// };
// const handleChangePassword = (event) => {
//   const value = event.target.value;
//   const newFormData = {
//     ...formData,
//     password: value,
//   };

//   setFormData(newFormData);
// };
// const handleChangeNewsletter = () => {
//   const checked = ;
//   const newFormData = {
//     ...formData,
//     newsletter: checked,
//   };

//   setFormData(newFormData);
// };
