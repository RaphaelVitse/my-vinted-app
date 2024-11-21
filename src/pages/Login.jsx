import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState(
    Cookies.get("token") || {
      email: "",
      password: "",
    }
  );

  const [message, setMessage] = useState("");

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
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        formData
      );
      console.log(response.data.token);
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
    } catch (error) {
      console.log(error);
      setMessage("Mauvais email et/ou mot de passe");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title-form">Se connecter</h1>

      <input
        type="mail"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChangeEmail}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        name="password"
        value={formData.password}
        onChange={handleChangePassword}
      />

      <p>{message}</p>

      <button type="submit">Se Connecter</button>
    </form>
  );
};

export default Login;
