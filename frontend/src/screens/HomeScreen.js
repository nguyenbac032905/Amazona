import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useReducer} from "react";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return {...state, loading: true}
    case "FETCH_SUCCESS":
      return {...state, loading: false, products: action.payload}
    case "FETCH_FAIL":
      return {...state, loading: false, error: action.payload}
  
    default:
      return state;
  }
}
function HomeScreen() {
    const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
      loading: true,
      error: "",
      products: []
    });

    useEffect(() => {
      const fetchData = async () => {
        dispatch({type: "FETCH_REQUEST"});
        try {
          const result = await axios.get("/api/products");
          dispatch({type: "FETCH_SUCCESS", payload: result.data});
        } catch (error) {
          dispatch({type: "FETCH_FAIL", payload: error.message});
        }
      };
      fetchData();
    },[]);
    return(
        <div>
            <h1>Featured Products</h1>
            <div className="products">
              {
                loading ? (<div>loading...</div>) : error ? (<div>{error}</div>) : (
                  products.map((product) => (
                    <div className="product" key={product.id}>
                      <Link to={`/product/${product.slug}`}>
                        <img src={product.image} alt= {product.name} />
                        <div className="product-info">
                          <p>{product.name}</p>
                          <p>{product.price}</p>
                        </div>
                      </Link>
                    </div>
                  ))
                )
                
              }
            </div>
        </div>
    )
}
export default HomeScreen;