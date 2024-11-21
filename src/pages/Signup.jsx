import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    newsletter: false,
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const newFormData = [...formData];
    newFormData.push({
      username: value.username,
      email: value.email,
      password: value.password,
    });
    setFormData(newFormData);
  };

  return (
    <>
      <form onSubmit="">
        <h1 className="title-form">S'inscrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="mail"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="newsletter">
          <input
            type="checkbox"
            name="newsletter"
            // checked={formData.newsletter}
          />
          <span>S'inscrire à notre newsletter</span>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        {/* <input onSubmit={handleSubmit} value="S'inscrire" /> */}
      </form>
    </>
  );
};

export default Signup;
