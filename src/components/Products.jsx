import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(true);
  //   const [displayedListings, setDisplayedListings] = useState(listings);
  const [selectedOption, setSelectedOption] = useState("villa");

  useEffect(() => {
    // axios
    //   .get("http://localhost:3000/places")
    //   .then((res) => setData(res.data))
    //   // .then((ress) => setFilter(ress.data))
    //   .catch((err) => console.log(err));
    // setLoading(false);
    fetch("http://localhost:3000/places")
      .then((response) => response.json())
      .then((data) => setData(data));
    console.log(data);
    setLoading(false);
  }, []);
  const Loading = () => {
    return (
      <>
        <h1>asdasd</h1>
        {/* <div className="coll-md-3">
          <Skeleton height={350} />
        </div>
        <div className="coll-md-3">
          <Skeleton height={350} />
        </div>
        <div className="coll-md-3">
          <Skeleton height={350} />
        </div> */}
      </>
    );
  };

  //   const filterProduct = (categorys) => {
  //     const uptadeList = data.filter((x) => x.type === categorys);
  //     setFilter(uptadeList);
  //   };

  function handleOptionChange(event) {
    const selectedOption = event.target.value;
  }

  const filteredListings = data.filter((listing) => {
    // Eğer "property_type" özelliği "selectedOption" değerine eşit ise
    if (listing.property_type === selectedOption) {
      // Bu öğe filtrelenmiş listeye eklenecek
      return true;
    }
    // Eğer eşit değilse, filtrelenmiş listeye eklenmeyecek
    return false;
  });
  console.log(filteredListings);

  const ShowProducts = () => {
    return (
      <div>
        <label htmlFor="cars">Choose a house type:</label>
        <select id="cars" value={selectedOption} onChange={handleOptionChange}>
          <option value="villa">Villa</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>
        {/* <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className=" btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className=" btn btn-outline-dark me-2"
            onClick={() => filterProduct("Villa")}
          >
            Villa
          </button>
          <button
            className=" btn btn-outline-dark me-2"
            onClick={() => filterProduct("Townhouse")}
          >
            Townhouse
          </button>
          <button
            className=" btn btn-outline-dark me-2"
            onClick={() => filterProduct("Apartment")}
          >
            Apartment
          </button>
        </div> */}
        {filteredListings.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4" key={product.id}>
                <div className="card h-100 text-center p-4">
                  <img
                    src={product.img}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text lead fw-bold">$ {product.price}</p>
                    <NavLink
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark"
                    >
                      about see
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
