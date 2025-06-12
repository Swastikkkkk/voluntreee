import React from "react";
import { useNavigate } from "react-router-dom";
import DonateButton from "./DonateButton";


// Replace with your Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = "pk_test_51RQhMx070ajDSpWDCpl3Mm5Rvd9Du610u3C1Mz0qLnWKRr638XMGyWAX5RgncNVciSwlFnt2FOYwXIafQMTmyUrR009OeVG9Fj";

// Replace with your actual Stripe Price ID
const DONATION_PRICE_ID = "price_1RSejy070ajDSpWDHklZ7iH9";

const Herosection = () => {
  const navigate = useNavigate();

  const handleJoinNowClick = () => {
    navigate("/signup");
  };

  const handleDonateNowClick = async () => {
    const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: DONATION_PRICE_ID, quantity: 1 }],
      mode: "payment",
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/cancel",
    });

    if (error) {
      alert(error.message);
    }
  };

  return (
    <section
      style={{ fontFamily: "'Merriweather', serif" }}
      className="flex flex-col items-center justify-center px-6 md:px-20 py-20 bg-white"
    >
      <h1 className="text-center text-[#448269] text-6xl font-regular leading-tight">
        Where Helping Hands Meet
        <br className="text-6xl" />
        Real Needs.
      </h1>

      <p className="text-center text-gray-700 mt-6 text-base md:text-lg max-w-xl">
        Connect with verified NGOs, discover meaningful volunteering
        opportunities, and be the change you wish to see.
      </p>

      <div className="flex flex-row gap-4 mt-8">
        <button
          onClick={handleJoinNowClick}
          className="cursor-pointer bg-[#063F2E] text-white text-lg font-medium rounded-xl px-8 py-3 hover:bg-green-800 transition duration-200"
        >
          Get Started
        </button>
        <DonateButton/>
      </div>
    </section>
  );
};

export default Herosection;
