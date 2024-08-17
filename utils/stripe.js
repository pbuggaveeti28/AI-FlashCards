// utils/stripe.js
export const formatAmountForStripe = (amount, currency) => {
    // Convert dollars to cents
    return Math.round(amount * 100);
  };
  