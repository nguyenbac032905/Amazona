import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../Store";
import axios from "axios";
function Product(props){
    const {product} = props;
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart} = state;
    const handleAddToCart = async (product) => {
        const existItem = cart.cartItems.find(item => item._id == product._id);
        if(existItem){
            const quantity = existItem.quantity + 1;
            const {data} = await axios.get(`/api/products/${product._id}`);
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
            <Card className="product">
                <Link to={`/product/${product.slug}`}>
                    <img src={product.image} className="card-img-top" alt= {product.name} />
                </Link>
                <Card.Body>
                        <Link to={`/product/${product.slug}`}>
                            <Card.Title>{product.name}</Card.Title>
                        </Link>
                        <Rating rating={product.rating} numReviews={product.numReviews} />
                        <Card.Text>${product.price}</Card.Text>
                        {product.countInStock === 0 ? (
                            <Button variant="light" disabled>Out of Stock</Button>
                        ) : (
                            <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                        )}
                    </Card.Body>
            </Card>
        </>
    )
}
export default Product;