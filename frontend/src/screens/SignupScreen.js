import { Helmet } from "react-helmet-async";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Store } from "../Store";
import { toast, ToastContainer } from "react-toastify";
import { getError } from "../utils";

function SignupScreen() {
    const {search} = useLocation();
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const {userInfo} = state;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const name = e.target.elements.name.value;
        const confirmPassword = e.target.elements.confirmPassword.value;
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        try {
            const {data} = await axios.post("/api/users/signup",{
                name,
                email,
                password
            });
            ctxDispatch({type: "USER_SIGNIN", payload: data});
            navigate(redirect || "/");
        } catch (error) {
            toast.error(getError(error));
        }
    }
    useEffect(() => {
        if(userInfo){
         navigate(redirect)
        }
    },[navigate,redirect,userInfo])
    return (
    <>
        <Container className="small-container">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className="my-3">Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">  
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signup">
                    <Button type="submit">Sign Up</Button>
                </Form.Group>
                <div className="mb-3">
                    Already have an account?{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                </div>
            </Form>
             <ToastContainer />
        </Container>
    </>
    )
}
export default SignupScreen;