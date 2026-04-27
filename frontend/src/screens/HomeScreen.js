
import axios from "axios";
import { useEffect, useReducer} from "react";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";

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
          dispatch({type: "FETCH_FAIL", payload: getError(error)});
        }
      };
      fetchData();
    },[]);
    console.log(error)
    return(
        <div>
            <Helmet>
                <title>Featured Products</title>
            </Helmet>
            <div className="products">
              <Row>
                {
                  loading ? (<Loading />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
                    products.map((product) => (
                      <Col sm={6} md={4} lg={3} className="mb-3" key={product.id}>
                        <Product product={product} />
                      </Col>
                    ))
                  )
                  
                }
              </Row>
            </div>
        </div>
    )
}
export default HomeScreen;