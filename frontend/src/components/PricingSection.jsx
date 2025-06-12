import React, { useState } from 'react';

const STRIPE_CONFIG = {
  publishableKey: "pk_test_51RQhMx070ajDSpWDCpl3Mm5Rvd9Du610u3C1Mz0qLnWKRr638XMGyWAX5RgncNVciSwlFnt2FOYwXIafQMTmyUrR009OeVG9Fj", // Replace with your Stripe publishable key
  priceIds: {
    growth: "price_1RRnMx070ajDSpWDWYyRORJR", // Replace with your Growth plan price ID
    pro: "price_1RRnK0070ajDSpWDpGqJoKI0" // Replace with your Pro plan price ID
  }
};

const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    description: "Perfect for small NGOs getting started",
    features: [
      "Up to 50 volunteers",
      "Basic event management",
      "Email notifications",
      "Community support",
      "Basic analytics",
      "Mobile app access"
    ],
    buttonText: "Get Started Free",
    popular: false,
    priceId: null
  },
  {
    name: "Growth",
    price: "₹2,399",
    period: "/month",
    description: "Ideal for growing organizations",
    features: [
      "Up to 500 volunteers",
      "Advanced event management",
      "SMS & Email notifications",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "Volunteer certificates",
      "Team collaboration tools"
    ],
    buttonText: "Start Growth Plan",
    popular: true,
    priceId: STRIPE_CONFIG.priceIds.growth
  },
  {
    name: "Pro",
    price: "₹8,199",
    period: "/month",
    description: "For large NGOs with complex needs",
    features: [
      "Unlimited volunteers",
      "Enterprise event management",
      "Multi-channel notifications",
      "24/7 dedicated support",
      "Custom analytics dashboard",
      "White-label solution",
      "API access",
      "Advanced integrations",
      "Custom training sessions"
    ],
    buttonText: "Start Pro Plan",
    popular: false,
    priceId: STRIPE_CONFIG.priceIds.pro
  }
];

const PricingSection = () => {
  const [loading, setLoading] = useState(null);

  const handleSubscription = async (priceId, planName) => {
    if (!priceId) {
      if (planName === "Free") {
        alert("Redirecting to free signup...");
        window.location.href = "/signup";
        return;
      }
      if (planName === "Pro") {
        alert("Redirecting to contact sales...");
        window.location.href = "/signup";
        return;
      }
    }

    setLoading(planName);

    try {
      // Dynamically load Stripe.js if not already loaded
      if (!window.Stripe) {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        document.head.appendChild(script);
        await new Promise(resolve => (script.onload = resolve));
      }

      const stripe = window.Stripe(STRIPE_CONFIG.publishableKey);

      // Use .env variable for backend URL
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4242";

      // Create Checkout Session
      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) throw new Error('Failed to create checkout session');

      const { sessionId, url } = await response.json();

      // If backend returns a Stripe Checkout URL, redirect to it; otherwise, use sessionId with Stripe.js
      if (url) {
        window.location.href = url;
      } else if (sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Stripe error:', error);
          alert('Payment failed. Please try again.');
        }
      } else {
        throw new Error('No sessionId or url returned from backend.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empower your NGO with the right tools to make a bigger impact. 
            From small community groups to large organizations.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 w-full max-w-sm ${
                plan.popular 
                  ? 'border-green-500 hover:border-green-600' 
                  : 'border-green-200 hover:border-green-400'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-green-600">{plan.price}</span>
                  <span className="text-gray-500 text-lg">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscription(plan.priceId, plan.name)}
                  disabled={loading === plan.name}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 relative ${
                    plan.popular
                      ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md disabled:bg-green-400'
                      : 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300 hover:border-green-400 disabled:bg-gray-100 disabled:text-gray-500'
                  }`}
                >
                  {loading === plan.name ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    plan.buttonText
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include our core volunteer management features. 
            <br />
            <span className="text-green-600 font-semibold">30-day money-back guarantee</span> on paid plans.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Secure payments powered by <span className="font-semibold">Stripe</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
