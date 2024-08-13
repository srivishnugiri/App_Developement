import React from 'react';
import { default as image } from '../asserts/images/quick_solutions.613f7f3d78aff16e341a28cdce7d6b15.svg';
const Payment = ({ plan, onPaymentSuccess }) => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const amount = plan === 'essential' ? 29900 : plan === 'extra' ? 49900 : 79900;
    const options = {
      key: 'rzp_test_GcZZFDPP0jHtC4',
      amount: amount,
      currency: 'INR',
      name: 'Play+',
      description: `${plan} Plan Payment`,
      image: image,
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);
        onPaymentSuccess && onPaymentSuccess();  // Callback after successful payment
      },
      prefill: {
        name: 'Tony Stark',
        email: 'Tonystark@example.com',
        contact: '91300040030',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <label  style={{marginLeft:'30px',width:'28%',marginTop:'30px'}}>
        Make a Payment for {plan} Plan
        <button onClick={handlePayment}>Pay Now</button>
      </label>
    </div>
  );
};

export default Payment;
