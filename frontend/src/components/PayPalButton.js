import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function FunctionPayPalButton({ method }) {

    const initialOptions = (method) => {
        if (method === 'mensal') {
            return {
                clientId: "test",
                currency: "BRL",
                intent: "capture"
            }
        }
        else {
            return {
                clientId: "test",
                currency: "BRL",
                intent: "capture"
            }
        }

    };

    
    return (
        <PayPalScriptProvider options={initialOptions(method)}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    )
}
