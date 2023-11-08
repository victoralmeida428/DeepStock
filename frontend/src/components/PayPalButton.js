import { useState, useEffect } from "react";
import {
	PayPalScriptProvider,
	BraintreePayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";

// This values are the props in the UI
const style = {"label":"subscribe","layout":"horizontal", shape:'pill'};
const amount = "500";

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency }) => {
	// usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency]);

	return (<BraintreePayPalButtons
		style={style}
		disabled={false}
		fundingSource="" // Available values are: ["paypal", "card", "credit", "paylater", "venmo"]
		forceReRender={[style, amount]}
		createOrder={function (data, actions) {
			return actions.braintree
				.createPayment({
					flow: "checkout",
					amount: amount, // Here change the amount if needed
					currency: "BRL", // Here change the currency if needed
					enableShippingAddress: true,
				})
				.then((orderId) => {
					// Your code here after create the order
					return orderId;
				});
		}}
		onApprove={function (data, actions) {
			return actions.braintree
				.tokenizePayment(data)
				.then((payload) => {
					// Your code here after capture the order
					console.log(JSON.stringify(payload));
				});
			}
		}
	/>);
};

export default function FunctionPayPallButton() {
	const [clientToken, setClientToken] = useState(null);

	useEffect(() => {
		(async () => {
			const response = await (
				await fetch(
					"https://react-paypal-js-storybook.fly.dev/api/braintree/generate-client-token",
					{ method: "POST" }
				)
			).json();
			setClientToken(response?.client_token || response?.clientToken);
		})();
	}, []);

	return (
		<>
			{clientToken ? (
				<div style={{ maxWidth: "750px", minHeight: "200px" }}>
					<PayPalScriptProvider
						options={{
							clientId: "test",
							components: "buttons",
							// dataUserIdToken: "your-tokenization-key-here",
							dataClientToken: clientToken,
							intent: "capture",
							vault: false,
						}}
						>
						<ButtonWrapper currency={"USD"} />
					</PayPalScriptProvider>
				</div>
			) : (
				<h1>Loading token...</h1>
			)}
		</>
	);
}