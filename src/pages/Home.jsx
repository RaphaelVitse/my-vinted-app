import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import banner from "../assets/banner.jpg";
// import tear from "../assets/tear-white.svg";

const Home = ({ title, btnFilterAsc }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const totalResults = data.count;
  console.log(totalResults);
  const nbMaxpages = Math.ceil(totalResults / limit);
  console.log(nbMaxpages);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters = filters + "?title=" + title;
        }
        if (limit) {
          if (filters) {
            filters = filters + "& " + "limit=" + limit;
          } else {
            filters = "?limit=" + limit;
          }
        }
        if (currentPage) {
          if (filters) {
            filters = filters + "&" + "page=" + currentPage;
          } else {
            filters = "?page=" + currentPage;
          }
        }
        if (btnFilterAsc) {
          if (filters) {
            filters = filters + "&" + "sort=price-asc";
          } else {
            filters = "?sort=price-asc";
          }
        }
        console.log(filters);

        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers" + filters
        );
        console.log(response);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [title, currentPage, btnFilterAsc]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="banniere">
        <div className="question">
          <h1>Prets a faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
        </div>
        <img className="ban" src={banner} alt="banniere" />
        {/* <img className="tear" src={tear} alt="banniere" /> */}
      </div>
      <main className="container offer-container">
        {data.offers.map((offer) => {
          return (
            <section key={offer._id}>
              <div className="offer-card">
                <div className="user-card">
                  {offer.owner.account.avatar && (
                    <img
                      className="avatar"
                      src={offer.owner.account.avatar.url}
                      alt="avatar"
                    />
                  )}

                  <p className="username"> {offer.owner.account.username}</p>
                </div>
                <Link
                  style={{ textDecoration: "none" }}
                  //   target="_blank"
                  to={`/offers/${offer._id}`}
                >
                  <div>
                    <img
                      className="product-img"
                      src={offer.product_image.secure_url}
                      alt="photos"
                    />
                    <div className="description-offer">
                      <p className="price"> {offer.product_price} €</p>
                      {offer.product_details.map((details, index) => {
                        return (
                          <div key={index}>
                            <p className="offer-size-brand">{details.TAILLE}</p>
                          </div>
                        );
                      })}
                      {offer.product_details.map((details, index) => {
                        return (
                          <div key={index}>
                            <p className="offer-size-brand">{details.MARQUE}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          );
        })}
      </main>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          Page precedente
        </button>

        <button
          disabled={currentPage === nbMaxpages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Page suivante
        </button>
      </div>
    </>
  );
};

export default Home;
