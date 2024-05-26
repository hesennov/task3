import { useState, useEffect } from "react";
import Table from "./Table";
import "./style.scss";

function Fake() {
  const [listings, setListings] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("asc");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/places")
      .then((response) => response.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      });
  }, []);

  const handleClick = (btn) => {
    setPage(btn);
  };

  const getSortedAndFilteredData = () => {
    let filteredData = listings.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedProperty) {
      filteredData = filteredData.filter(
        (item) => item.type === selectedProperty
      );
    }

    if (sortBy === "asc") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sortBy === "desc") {
      filteredData.sort((a, b) => b.price - a.price);
    } else if (sortBy === "date-asc") {
      filteredData.sort(
        (a, b) => new Date(a.createdDateTime) - new Date(b.createdDateTime)
      );
    } else if (sortBy === "date-desc") {
      filteredData.sort(
        (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime)
      );
    }

    return filteredData;
  };

  const selectedList = getSortedAndFilteredData().slice(
    (page - 1) * 5,
    page * 5
  );
  //psug

  return (
    <div className="App">
      <div className="filter flex flex-wrap justify-between items-center space-y-4 sm:space-y-0 sm:flex-row">
        <div className="search flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="pricedate flex-1 sm:ml-4">
          <label
            htmlFor="sort-select"
            className="block text-sm font-medium text-gray-700"
          >
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option value="date-asc">Date: Oldest to Newest</option>
            <option value="date-desc">Date: Newest to Oldest</option>
          </select>
        </div>
        <div className="type flex-1 sm:ml-4">
          <label
            htmlFor="property-type"
            className="block text-sm font-medium text-gray-700"
          >
            Home type:
          </label>
          <select
            id="property-type"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
          >
            <option value="">All</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>
      </div>

      <div className="pagination mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className={`btn mx-1 ${
              page === btn ? "btn-primary" : "btn-secondary"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      <Table
        listings={selectedList}
        selectedProperty={selectedProperty}
        query={query}
        loading={loading}
      />
    </div>
  );
}

export default Fake;

// import { useState, useEffect } from "react";
// import Table from "./Table";
// import "./style.scss";
// import { log } from "three/examples/jsm/nodes/Nodes.js";
// function Fake() {
//   const [listings, setDisplayListings] = useState([]);
//   const [selectedProperty, setSelectedProperty] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [sortBy, setSortBy] = useState("asc");
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);

//   const handleClick = (btn) => {
//     setPage(btn);
//     console.log(btn);
//   };
//   const startIndex = (page - 1) * 5;
//   const selectedList = listings.slice(startIndex, startIndex + 5);
//   useEffect(() => {
//     // setLoading(true);
//     fetch("http://localhost:3000/places")
//       .then((response) => response.json())
//       .then((data) => setDisplayListings(data));
//     setLoading(false);
//   }, [page]);
//   const sortByDateAsc = (listings) => {
//     return listings.sort(
//       (a, b) => new Date(a.createdDateTime) - new Date(b.createdDateTime)
//     );
//   };

//   const sortByDateDesc = (listings) => {
//     return listings.sort(
//       (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime)
//     );
//   };

//   const sortByPriceDesc = (listings) => {
//     return listings.sort((a, b) => b.price - a.price);
//   };
//   const sortByPriceAsc = (listings) => {
//     return listings.sort((a, b) => a.price - b.price);
//   };

//   useEffect(() => {
//     let sortedListings = [];

//     if (sortBy === "asc") {
//       sortedListings = sortByPriceAsc(listings);
//     } else if (sortBy === "desc") {
//       sortedListings = sortByPriceDesc(listings);
//     } else if (sortBy === "date-asc") {
//       sortedListings = sortByDateAsc(listings);
//     } else if (sortBy === "date-desc") {
//       sortedListings = sortByDateDesc(listings);
//     }

//     setDisplayListings(sortedListings);
//   }, [listings, sortBy]);

//   const search = (data) => {
//     // const keys = ["name", "username", "email"];
//     return data.filter(
//       (user) =>
//         user.title.toLowerCase().includes(query) ||
//         user.type.toLowerCase().includes(query) ||
//         user.location.toLowerCase().includes(query)
//     );
//   };

//   return (
//     <div className="App">
//       <div className="filter flex flex-wrap justify-between items-center space-y-4 sm:space-y-0 sm:flex-row">
//         <div className="search flex-1">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//             onChange={(e) => setQuery(e.target.value)}
//           />
//         </div>
//         <div className="pricedate flex-1 sm:ml-4">
//           <label
//             htmlFor="sort-select"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Sort by:
//           </label>
//           <select
//             id="sort-select"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
//           >
//             <option value="asc">Price: Low to High</option>
//             <option value="desc">Price: High to Low</option>
//             <option value="date-asc">Date: Oldest to Newest</option>
//             <option value="date-desc">Date: Newest to Oldest</option>
//           </select>
//         </div>
//         <div className="type flex-1 sm:ml-4">
//           <label
//             htmlFor="property-type"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Home type:
//           </label>
//           <select
//             id="property-type"
//             value={selectedProperty}
//             onChange={(e) => setSelectedProperty(e.target.value)}
//             className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
//           >
//             <option value="">All</option>
//             <option value="Apartment">Apartment</option>
//             <option value="Villa">Villa</option>
//             <option value="Townhouse">Townhouse</option>
//           </select>
//         </div>
//       </div>

//       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((btn) => (
//         <button
//           onClick={() => handleClick(btn)}
//           className="btn btn-primary mx-1 "
//         >
//           {btn}
//         </button>
//       ))}
//       <button>{page}</button>
//       <Table
//         listings={search(selectedList)}
//         selectedProperty={selectedProperty}
//         query={query}
//         loading={loading}
//         setLoading={setLoading}
//       />
//     </div>
//   );
// }

// export default Fake;
