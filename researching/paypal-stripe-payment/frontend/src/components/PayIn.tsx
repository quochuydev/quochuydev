import React, { useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { stripePromise } from "../lib/stripe";
import { trpc } from "../trpc";

const AMOUNT = 100; // $100 fixed amount

const StripeCheckout: React.FC<{
  clientSecret: string;
  onSuccess: () => void;
}> = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const confirmPaymentMutation =
    trpc.stripe.stripeConfirmPayment.useMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || "Payment submission failed");
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "Payment failed");
    } else {
      // Record transaction in database
      await confirmPaymentMutation.mutateAsync({
        paymentIntentId: clientSecret.split("_secret_")[0],
        amount: AMOUNT,
      });
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : `Pay $${AMOUNT}`}
      </button>
      {errorMessage && (
        <div className="text-red-600 text-sm">{errorMessage}</div>
      )}
    </form>
  );
};

const PayPalButton: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrderMutation = trpc.paypal.createOrder.useMutation();
  const captureOrderMutation = trpc.paypal.captureOrder.useMutation();

  React.useEffect(() => {
    if (typeof window !== "undefined" && (window as any).paypal) {
      const paypalButtons = (window as any).paypal.Buttons({
        style: {
          shape: "rect",
          layout: "vertical",
          color: "gold",
          label: "paypal",
        },
        async createOrder() {
          try {
            const { orderID } = await createOrderMutation.mutateAsync({
              amount: AMOUNT,
            });
            return orderID;
          } catch (error) {
            console.error("PayPal createOrder error:", error);
            throw error;
          }
        },
        async onApprove(data: any) {
          try {
            setIsProcessing(true);
            await captureOrderMutation.mutateAsync({
              orderID: data.orderID,
              amount: AMOUNT,
            });
            onSuccess();
          } catch (error) {
            console.error("PayPal capture error:", error);
          } finally {
            setIsProcessing(false);
          }
        },
      });

      paypalButtons.render("#paypal-button-container");
    }
  }, [createOrderMutation, captureOrderMutation, onSuccess]);

  return (
    <div>
      <div id="paypal-button-container"></div>
      {isProcessing && (
        <div className="text-center mt-2">Processing payment...</div>
      )}
    </div>
  );
};

export const PayIn: React.FC<{ onTransactionSuccess: () => void }> = ({
  onTransactionSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<
    "stripe" | "paypal" | null
  >(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const createIntentMutation = trpc.stripe.createIntent.useMutation();

  const handlePayWithStripe = async () => {
    try {
      const { clientSecret } = await createIntentMutation.mutateAsync({
        amount: AMOUNT,
      });
      setClientSecret(clientSecret);
      setPaymentMethod("stripe");
    } catch (error) {
      console.error("Stripe intent creation failed:", error);
    }
  };

  const handlePayWithPayPal = () => {
    setPaymentMethod("paypal");
  };

  const handleSuccess = () => {
    setPaymentMethod(null);
    setClientSecret(null);
    onTransactionSuccess();
  };

  if (paymentMethod === "stripe" && clientSecret) {
    return (
      <div className="p-6 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Pay with Stripe</h2>
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: "stripe" },
          }}
        >
          <StripeCheckout
            clientSecret={clientSecret}
            onSuccess={handleSuccess}
          />
        </Elements>
        <button
          onClick={() => setPaymentMethod(null)}
          className="mt-4 text-blue-600 underline"
        >
          Back to payment options
        </button>
      </div>
    );
  }

  if (paymentMethod === "paypal") {
    return (
      <div className="p-6 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Pay with PayPal</h2>
        <script
          src="https://www.paypal.com/sdk/js?client-id=test&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo,paylater,card"
          data-sdk-integration-source="developer-studio"
        />
        <PayPalButton onSuccess={handleSuccess} />
        <button
          onClick={() => setPaymentMethod(null)}
          className="mt-4 text-blue-600 underline"
        >
          Back to payment options
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Pay In (${AMOUNT})</h2>
      <div className="space-y-3">
        <button
          onClick={handlePayWithPayPal}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded"
        >
          Pay with PayPal
        </button>
        <button
          onClick={handlePayWithStripe}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded"
        >
          Pay with Stripe
        </button>
      </div>
    </div>
  );
};
