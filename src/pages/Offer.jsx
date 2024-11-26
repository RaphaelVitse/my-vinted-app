import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = ({ token }) => {
  const { id } = useParams();
  // console.log(params);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        console.log(response);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <section className="container">
        {!data ? (
          <p>Aucune offre trouvée.</p>
        ) : (
          <div className="details-container">
            <div className="main-left">
              <img src={data.product_image.secure_url} alt="" />
            </div>

            <div className="main-right">
              <div className="product-details">
                <p className="price-offer">{data.product_price.toFixed(2)} €</p>
                <div className="main-descr-product">
                  <div className="left-descr-product">
                    {data.product_details.map((detail, index) => {
                      const keysInObj = Object.keys(detail);
                      const keyInObj = keysInObj[0];
                      return (
                        <div key={index}>
                          <p>{keyInObj}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="right-descr-product">
                    {data.product_details.map((detail, index) => {
                      const keysInObj = Object.keys(detail);
                      const keyInObj = keysInObj[0];
                      return (
                        <div key={index}>
                          <p>{detail[keyInObj]}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className="product-name">{data.product_name}</p>
              <p className="details-descr">{data.product_description}</p>
              <div className="avatar-name">
                {data.owner.account.avatar && (
                  <p>
                    <img
                      className="avatar-for-descr"
                      src={data.owner.account.avatar.url}
                      alt="avatar"
                    />
                  </p>
                )}

                <p className=""> {data.owner.account.username}</p>
              </div>
              <button
                className="btn-buy"
                onClick={() => {
                  if (token) {
                    navigate("/payment", {
                      state: {
                        price: data.product_price,
                        name: data.product_name,
                      },
                    });
                    // console.log(data.product_price);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Acheter
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Offer;
