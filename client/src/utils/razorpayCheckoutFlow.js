import { fetchCartItems } from "../features/cart/cartAPI";
import { verifypayment } from "../features/checkout/checkoutAPI";
import { handleToast } from "./handleToast";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default async (order, dispatch, navigate) => {
  const isScriptLoaded = await loadRazorpayScript();
  if (!isScriptLoaded) {
    handleToast(
      "error",
      "Failed to load Razorpay SDK. Check your internet connection."
    );
    return;
  }

  var options = {
    key: "rzp_test_AxAikKVsPMXHbg",
    amount: order.payment_gateway_details.amount,
    currency: "INR",
    name: "kicks",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: order.payment_gateway_details.id,
    handler: async function (response) {
      dispatch(verifypayment({ response, order })).then((res) => {
        handleToast(res.payload.status, res.payload.message, {
          onClose: () => {
            navigate("/orderdetails");
            dispatch(fetchCartItems());
          },
        });
      });
    },
    prefill: {
      name:
        order.shipping_address.first_name +
        " " +
        order.shipping_address.last_name,
      email: order.shipping_address.email,
      contact: order.shipping_address.phone,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new window.Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
  rzp1.open();
};
