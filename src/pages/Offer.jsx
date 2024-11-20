import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/offers/${id}`);
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
      <section className="container">
        {data.offers && data.offers.length > 0 ? (
          console.log(data.offers)
        ) : (
          <p>Aucune offre trouvée.</p>
        )}
        <div className="details-container">
          <div className="main-left"></div>
          <div className="main-right">
            <button className="btn-buy"> Acheter</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Offer;
