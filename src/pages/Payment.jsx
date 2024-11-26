import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const { price, name } = location.state;

  const protectionCost = 0.4;
  const deliveryCost = 0.8;
  const total = (price + protectionCost + deliveryCost).toFixed(2);
  //   console.log(total);

  const options = {
    mode: "payment",
    title: name,
    amount: Number(total * 100),
    currency: "eur",
  };
  console.log(options);

  return (
    <section>
      <div className="payment-container">
        <p>Résumé de la commande</p>
        <div className="recap-description">
          <div>
            <p>Commande</p>
            <p>Frais protection des acheteurs</p>
            <p>Frais de port</p>
            <p>Total</p>
          </div>
          <div>
            <p>{price} €</p>
            <p>{deliveryCost} €</p>
            <p>{protectionCost} €</p>
            <p>{total} €</p>
          </div>
        </div>
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir {name} vous allez
          payer {total} € (frais de protection et frais de port inclus)
        </p>
        <div className="stripe">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm title={name} amount={total} />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Payment;
