import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentMethodScreen() {
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart: {shippingAddress, paymentMethod}} = state;
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || "PayPal");
    useEffect(() => {
        if(!shippingAddress.address){
            navigate("/shipping");
        }
    },[shippingAddress, navigate]);
    const handleSubmit = (e) => {
        e.preventDefault();
        ctxDispatch({type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName});
        navigate("/placeorder");
    }
    return (
        <>
            <Helmet><title>Payment Method</title></Helmet>
            <div className="container small-container">
                <CheckoutSteps step1 step2 step3></CheckoutSteps>
                <h1 className="my-3">Payment Method</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="paypal">
                        <Form.Check type="radio" label="PayPal" value="PayPal" name="paymentMethod" required checked={paymentMethodName == "PayPal"} onChange={(e) => {setPaymentMethodName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="stripe">
                        <Form.Check type="radio" label="Stripe" value="Stripe" name="paymentMethod" required checked={paymentMethodName == "Stripe"} onChange={(e) => setPaymentMethodName(e.target.value)}/>
                    </Form.Group>
                    <div className="mb-3">
                        <Button type="submit">Continue</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}
export default PaymentMethodScreen;