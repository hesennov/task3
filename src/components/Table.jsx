import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const Table = ({ listings, selectedProperty, query, loading }) => {
  const Loading = () => (
    <div className="loading-grid">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <Skeleton key={index} height={350} width={400} />
      ))}
    </div>
  );

  const ShowProducts = () => (
    <div className="home">
      <div className="posts">
        {listings.map((item) => (
          <div className="post" key={item.id}>
            <div className="img">
              <NavLink to={`/${item.id}`}>
                <img src={item.img} alt={item.title} />
              </NavLink>
            </div>
            <div className="content">
              <NavLink to={`/${item.id}`}>
                <h1>{item.title}</h1>
              </NavLink>
              <h1>{`${item.price}$ `}</h1>
              <p>{item.location}</p>
              <p>{item.about}</p>
              <p>
                <i>{new Date(item.createdDateTime).toLocaleDateString()}</i>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return <div>{loading ? <Loading /> : <ShowProducts />}</div>;
};

export default Table;
// import Skeleton from "react-loading-skeleton";
// import { NavLink } from "react-router-dom";

// const Table = ({ listings, selectedProperty, query, loading }) => {
//   const Loading = () => {
//     return (
//       <>
//         <div>
//           <Skeleton height={350} width={400} />
//         </div>
//         <div>
//           <Skeleton height={350} />
//         </div>
//         <div>
//           <Skeleton height={350} />
//         </div>
//       </>
//     );
//   };

//   const ShowProducts = () => {
//     return (
//       <div className="home">
//         <div className="posts">
//           {listings
//             .filter(
//               (item) =>
//                 selectedProperty === "" ||
//                 item.type === selectedProperty ||
//                 query
//             )
//             .map((item) => (
//               <div className="post" key={item.id}>
//                 <div className="img">
//                   <NavLink to={`/${item.id}`}>
//                     <img src={item.img} alt={item.title} />
//                   </NavLink>
//                 </div>
//                 <div className="content">
//                   <NavLink to={`/${item.id}`}>
//                     <h1>{item.title}</h1>
//                   </NavLink>
//                   <h1>{`${item.price}$ `}</h1>

//                   <p>{item.location}</p>
//                   <p>{item.about}</p>
//                   <p>
//                     <i>{item.createdDateTime}</i>
//                   </p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     );
//   };

//   return <div>{loading ? <Loading /> : <ShowProducts />}</div>;
// };
// export default Table;
