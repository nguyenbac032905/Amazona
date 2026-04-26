import { useParams } from "react-router-dom";
import data from "../data";

function ProductScreen() {
    const {slug} = useParams();

    const product = data.products.find(item => item.slug === slug);

    console.log(product)
    
    return(
        <>
            {slug}
        </>
    )
}
export default ProductScreen;