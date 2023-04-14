import { useState, useEffect } from "react";
import Table from "./Table";
import "./style.scss";
function Fake() {
  const [listings, setDisplayListings] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("asc");
  const [query, setQuery] = useState("");

  useEffect(() => {
    // setLoading(true);
    fetch("http://localhost:3000/places")
      .then((response) => response.json())
      .then((data) => setDisplayListings(data));
    setLoading(false);
  }, []);

  const sortByDateAsc = (listings) => {
    return listings.sort(
      (a, b) => new Date(a.createdDateTime) - new Date(b.createdDateTime)
    );
  };

  const sortByDateDesc = (listings) => {
    return listings.sort(
      (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime)
    );
  };

  const sortByPriceDesc = (listings) => {
    return listings.sort((a, b) => b.price - a.price);
  };
  const sortByPriceAsc = (listings) => {
    return listings.sort((a, b) => a.price - b.price);
  };

  useEffect(() => {
    let sortedListings = [];

    if (sortBy === "asc") {
      sortedListings = sortByPriceAsc(listings);
    } else if (sortBy === "desc") {
      sortedListings = sortByPriceDesc(listings);
    } else if (sortBy === "date-asc") {
      sortedListings = sortByDateAsc(listings);
    } else if (sortBy === "date-desc") {
      sortedListings = sortByDateDesc(listings);
    }

    setDisplayListings(sortedListings);
  }, [listings, sortBy]);

  const search = (data) => {
    // const keys = ["name", "username", "email"];
    return data.filter(
      (user) =>
        user.title.toLowerCase().includes(query) ||
        user.type.toLowerCase().includes(query) ||
        user.location.toLowerCase().includes(query)
    );
  };

  return (
    <div className="App">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="search..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="pricedate">
          <label htmlFor="sort-select">Sort by: price ve date</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option value="date-asc">Date: Oldest to Newest</option>
            <option value="date-desc">Date: Newest to Oldest</option>
          </select>
        </div>

        <div className="type">
          <label>Home type</label>
          <select
            id="property-type"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">Tümü</option>
            <option value="Apartment ">Apartman</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>
      </div>
      <Table
        listings={search(listings)}
        selectedProperty={selectedProperty}
        query={query}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default Fake;
