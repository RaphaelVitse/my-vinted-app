import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import banner from "../assets/banner.jpg";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="banniere">
        <div className="question">
          <h1>Prets a faire du tri dans vosplacards ?</h1>
          <button>Commencer à vendre</button>
        </div>
        <img src={banner} alt="banniere" />
      </div>
      <main className="container offer-container">
        {data.offers.map((offer) => {
          return (
            <section key={offer._id}>
              <div className="offer-card">
                <img
                  className="avatar"
                  src={offer.owner.account.avatar.secure_url}
                  alt="avatar"
                />
                <p> {offer.owner.account.username}</p>

                <div
                  onClick={() => {
                    <Link to="/offer/:{offer._id}"> </Link>;
                  }}
                >
                  <img
                    className="product-img"
                    src={offer.product_image.secure_url}
                    alt=""
                  />
                  <p> {offer.product_price} €</p>
                  {offer.product_details.map((details, index) => {
                    return (
                      <div key={index}>
                        <p>{details.TAILLE}</p>
                        <p>{details.MARQUE}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
};

export default Home;
