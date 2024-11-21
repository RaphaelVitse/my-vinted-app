import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    const newFormData = {
      ...formData,
      username: value,
    };

    setFormData(newFormData);
  };
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
  //   const handleChangeNewsletter = (event) => {
  //     const value = event.target.value;
  //     const newFormData = {
  //       ...formData,
  //       password: value,
  //     };

  //     setFormData(newFormData);
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData
      );
      console.log(response.data.token);
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="title-form">S'inscrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChangeUsername}
        />
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
        <div className="newsletter">
          <input
            type="checkbox"
            name="newsletter"
            // onChange={handleChangeNewsletter}
          />
          <span>S'inscrire à notre newsletter</span>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button type="submit">S'inscrire"</button>
      </form>
    </>
  );
};

export default Signup;
