import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
function HomeScreen() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get("/api/products");
        console.log(result)
        setProducts(result.data);
      };
      fetchData();
    },[]);
    return(
        <div>
            <h1>Featured Products</h1>
            <div className="products">
              {
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
              }
            </div>
        </div>
    )
}
export default HomeScreen;