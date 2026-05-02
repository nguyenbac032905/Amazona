
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Badge, Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import { useContext, useEffect } from "react";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingAddressScreen from "./components/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
function App() {
  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {userInfo} = state;
  const handleLogout = () => {
    ctxDispatch({type: "USER_SIGNOUT"});
  }
  return (
    <BrowserRouter>
        <div className="d-flex flex-column site-container" >
          <header>
            <Navbar bg="dark" variant="dark">
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>amazona</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {state?.cart.cartItems.length > 0 && (<Badge pill bg="danger">{state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)}</Badge>)}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link className="dropdown-item" to="#signout" onClick={handleLogout}>
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link to="/login" className="nav-Link">Sign In</Link>
                  )}
                </Nav>
              </Container>
            </Navbar>
          </header>
          <main>
            <Container className="mt-3">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/login" element={<SigninScreen />} />
                <Route path="/product/:slug" element={<ProductScreen />} />
                <Route path="/shipping" element={<ShippingAddressScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="/payment" element={<PaymentMethodScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
              </Routes>
            </Container>
          </main>
          <footer>
            <div className="text-center" >ALL right reserved</div>
          </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
