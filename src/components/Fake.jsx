import { useState, useEffect } from "react";

function Fake() {
  const [listings, setDisplayListings] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [sortBy, setSortBy] = useState("asc");
  const [query, setquery] = useState("");

  useEffect(() => {
    // API'den verileri çekmek için fetch() fonksiyonunu kullanıyoruz
    fetch("http://localhost:3000/places")
      .then((response) => response.json())
      .then((data) => setDisplayListings(data));
  }, []);

  const handlePropertyChange = (event) => {
    setSelectedProperty(event.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

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

  return (
    <div className="App">
      <h1>ev elanlari</h1>
      <label htmlFor="sort-select">Sort by: qiyet ve tarix</label>
      <select id="sort-select" value={sortBy} onChange={handleSortChange}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
        <option value="date-asc">Date: Oldest to Newest</option>
        <option value="date-desc">Date: Newest to Oldest</option>
      </select>
      <label>Home type</label>

      <select
        id="property-type"
        value={selectedProperty}
        onChange={handlePropertyChange}
      >
        <option value="">Tümü</option>
        <option value="Apartment ">Apartman</option>
        <option value="Villa">Villa</option>
        <option value="Townhouse">Townhouse</option>
      </select>

      <ul>
        {listings
          .filter(
            (item) => selectedProperty === "" || item.type === selectedProperty
          )
          .map((item) => (
            <div key={item.id}>
              <li>{item.title}</li>
              <img src={item.img} alt={item.title} width="350" height="300" />
              <li>{item.price}</li>
            </div>
          ))}
      </ul>
    </div>
  );
}

export default Fake;
