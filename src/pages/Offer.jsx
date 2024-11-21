import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = () => {
  const { id } = useParams();
  // console.log(params);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
              <p>{data.product_price} </p>
              <p>{data.product_details[0].MARQUE} </p>
              <p>{data.product_price} </p>
              <p>{data.product_price} </p>
              <p>{data.product_price} </p>

              <button className="btn-buy"> Acheter</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Offer;
