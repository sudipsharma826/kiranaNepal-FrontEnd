import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const PaymentStatus = () => {
  const {setCartItems,currency}= useAppContext();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error', 'cancelled'
  const [message, setMessage] = useState("Verifying your payment...");
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const pidx = query.get("pidx");
    const txnId = query.get("txnId");
    const purchase_order_id = query.get("purchase_order_id");
    const purchase_order_name = query.get("purchase_order_name");


    if (!pidx || !txnId) {
      setStatus("cancelled");
      setMessage("Payment was cancelled. Redirecting to homepage...");
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await axios.post("/api/order/verify_khalti_payment", { pidx, txnId , purchase_order_id, purchase_order_name });
        if (response.data.success) {
          setStatus("success");
          setMessage("Payment successful! Redirecting to your orders...");
          setPaymentInfo(response.data.data);
          console.log("Payment Info:", response.data.data);
          setTimeout(() => navigate("/orders"), 3000);
          setCartItems({});
        } else {
          toast.error(response.data.message);
          setStatus("error");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage("Your payment was received successfully, but we're facing a system issue while updating your order. Please don't worry — your payment is safe with us. Our team has been notified and your order will be processed shortly. If you have any questions, please contact our support team. Thank you for your understanding!.Redirecting to homepage...");
        setTimeout(() => navigate("/"), 5000);
      }
    };

    verifyPayment();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center p-6 backdrop-blur-sm">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-lg w-full transition-transform transform hover:scale-105">
        {status === "verifying" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold text-blue-600 mb-2">Please wait...</h1>
            <p className="text-gray-700">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-6xl mb-2">✅</div>
            <h1 className="text-xl font-semibold text-green-600 mb-2">Payment Successful</h1>
            <p className="text-gray-700">{message}</p>
            {paymentInfo && (
              <div className="mt-4 text-md text-gray-600">
                <p><strong>Order Id:</strong> {paymentInfo.orderId}</p>
                <p><strong>Order Name:</strong> {paymentInfo.trackingNumber}</p>
                <p><strong>Payment Method:</strong> {paymentInfo.paymentMethod}</p>
                <p><strong>Amount:</strong> {currency}{Number(paymentInfo.amount) *100}</p>
              </div>
            )}
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-6xl mb-2">❌</div>
            <h1 className="text-xl font-semibold text-red-600 mb-2">Verification Failed</h1>
            <p className="text-gray-700">{message}</p>
          </>
        )}

        {status === "cancelled" && (
          <>
            <div className="text-yellow-500 text-6xl mb-2">⚠️</div>
            <h1 className="text-xl font-semibold text-yellow-600 mb-2">Payment Cancelled</h1>
            <p className="text-gray-700">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
