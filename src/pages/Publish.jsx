import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [product_pictures, setProduct_pictures] = useState(null);
  const [product_name, setProduct_name] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_price, setProduct_price] = useState(0);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [exchange, setExchange] = useState(false);

  const navigate = useNavigate();

  return (
    <section className="page-publish">
      <div className="container">
        <h2>Vends ton article</h2>
        <div>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                const formData = new FormData();
                formData.append("title", product_name);
                formData.append("description", product_description);
                formData.append("price", product_price);
                formData.append("condition", condition);
                formData.append("city", city);
                formData.append("brand", brand);
                formData.append("size", size);
                formData.append("color", color);
                formData.append("picture", product_pictures);
                // Display the key/value pairs
                // for (let pair of formData.entries()) {
                //   console.log(pair[0] + ", " + pair[1]);
                // }

                const response = await axios.post(
                  "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                  formData,
                  {
                    headers: {
                      authorization: `Bearer ${token}`,
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                console.log(response.data);
              } catch (error) {
                console.log(error.response);
              }
            }}
          >
            <div className="download-section">
              <label htmlFor="file">
                <FaPlus /> Ajoute une photo
              </label>
              <input
                type="file"
                id="file"
                onChange={(event) => {
                  setProduct_pictures(event.target.files[0]);
                }}
              />
            </div>
            <div className="product_name-section">
              <label htmlFor="product_name">Titre</label>
              <input
                type="text"
                placeholder="ex : chemise Sézane verte"
                id="product_name"
                value={product_name}
                onChange={(event) => {
                  setProduct_name(event.target.value);
                }}
              />
              <label htmlFor="product_description">Décris ton article</label>
              <textarea
                placeholder="ex : porté quelque fois, taille correctement,..."
                id="product_description"
                value={product_description}
                onChange={(event) => {
                  setProduct_description(event.target.value);
                }}
              />
            </div>
            <div className="product_details-section">
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                placeholder="ex : Zara"
                id="brand"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
              <label htmlFor="size">Taille</label>
              <input
                placeholder="ex : porté quelque fois, taille correctement,..."
                id="size"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
              <label htmlFor="color">Couleur</label>
              <input
                placeholder="ex : Fuschia"
                id="color"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
              <label htmlFor="condition">Etat</label>
              <input
                placeholder="ex : Neuf avec étiquette"
                id="condition"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
              <label htmlFor="city">Lieu</label>
              <input
                placeholder="ex : Paris"
                id="city"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
            <div className="product_price-section">
              <label htmlFor="product_price">Prix</label>
              <input
                type="text"
                placeholder="ex : chemise Sézane verte"
                id="product_price"
                value={product_price}
                onChange={(event) => {
                  setProduct_price(event.target.value);
                }}
              />
              <input
                className=".checkbox-exchange"
                type="checkbox"
                name="exchange"
                checked={exchange}
                onChange={() => {
                  setExchange(!exchange);
                }}
              />
              <p>Je suis intéressé(e) par un échange</p>
            </div>

            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Publish;
