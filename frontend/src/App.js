import data from "./data";
function App() {
  return (
    <div >
      <header>
        <a href="/">Amazona</a>
      </header>
      <main>
        <h1>Featured Products</h1>
        <div className="products">
          {
            data.products.map((product) => (
              <div className="product" key={product.id}>
                <a href={`/product/${product.slug}`}>
                  <img src={product.image} alt= {product.name} />
                  <div className="product-info">
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                  </div>
                </a>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}

export default App;
