import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Rating from "../components/Rating";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import Loading from "../components/Loading";
import { getError } from "../utils";
import { Store } from "../Store";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {...state, loading: true}
    case "FETCH_SUCCESS":
      return {...state, loading: false, product: action.payload}
    case "FETCH_FAIL":
      return {...state, loading: false, error: action.payload}
  
    default:
      return state;
  }
}
function ProductScreen() {
    const navigate = useNavigate();
    const {slug} = useParams();
    const [{loading, error, product}, dispatch] = useReducer(reducer, {
      loading: true,
      error: "",
      product: {

      }
    });

    useEffect(() => {
      const fetchData = async () => {
        dispatch({type: "FETCH_REQUEST"});
        try {
          const result = await axios.get(`/api/products/slug/${slug}`);
          dispatch({type: "FETCH_SUCCESS", payload: result.data});
        } catch (error) {
          dispatch({type: "FETCH_FAIL", payload: getError(error)});
        }
      };
      fetchData();
    },[slug]);

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart} = state;
    const handleAddToCart = async () => {
        console.log(cart)
        const existItem = cart.cartItems.find(item => item._id == product._id);
        if(existItem){
            const quantity = existItem.quantity + 1;
            const {data} = await axios.get(`/api/products/${product._id}`);
            console.log(data);
            if(quantity > data.countInStock){        
                window.alert("Sorry. Product is out of stock");
                return;
            }else{
                ctxDispatch({type: "UPDATE_CART_ITEM", payload: {...product, quantity : quantity}});
            }
        }else{
            ctxDispatch({type: "ADD_TO_CART", payload: {...product, quantity : 1}});
        }
        navigate("/cart");
    }
    return(
        <>
            {loading ? (<Loading />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                <Row>
                    <Col md={6}>
                        <img src={product.image} className="img-large"/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Helmet>
                                    <title>{product.name}</title>
                                </Helmet>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating rating={product.rating} numReviews={product.numReviews}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Status: {product.countInStock > 0 ? ( <Badge bg="success">Instock</Badge>) : (<Badge bg="danger">Unavaiable</Badge>)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {product.countInStock > 0 ? (<Button variant="primary" onClick={handleAddToCart}>Add to cart</Button>) : (<></>)}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}
export default ProductScreen;