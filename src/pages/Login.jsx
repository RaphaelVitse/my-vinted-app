import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    const newFormData = {
      ...formData,
      email: value,
    };

    setFormData(newFormData);
  };
  const handleChangePassword = (event) => {
    const value = event.target.value;
    const newFormData = {
      ...formData,
      password: value,
    };
    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        formData
      );
      console.log(response.data.token);
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      setToken(token);

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.status === 400 || error.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      } else {
        setErrorMessage("Prblome serveur");
      }
    }
  };

  return (
    <>
      <form className="signup-login-form" onSubmit={handleSubmit}>
        <h2 className="title-form">Se connecter</h2>

        <input
          type="mail"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChangeEmail}
        />
        <input
          className="input-password"
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={formData.password}
          onChange={handleChangePassword}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button className="btn-signup-login" type="submit">
          Se Connecter
        </button>
        <Link
          style={{ textDecoration: "none" }}
          className="link-login-signup"
          to="/signup"
        >
          Pas encore de compte ? Inscris-toi !
        </Link>
      </form>
    </>
  );
};

export default Login;
