import { useParams } from "react-router-dom";

function ProductScreen() {
    const {slug} = useParams();
    
    return(
        <>
            {slug}
        </>
    )
}
export default ProductScreen;