import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = (props) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5173/offers/:id");
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
        {data.offers.map((offer) => {
          console.log({ offer });

          return (
            <>
              <div>{offer.account.username}</div>
            </>
          );
        })}
        <div className="main-left">
          <img src="" alt="" />
        </div>
        <div className="main-right"></div>
      </section>
    </>
  );
};

export default Offer;
