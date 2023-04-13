import Skeleton from "react-loading-skeleton";

const Table = ({ listings, selectedProperty, query, loading, setLoading }) => {
  const Loading = () => {
    return (
      <>
        <div className="coll-md-3">
          <Skeleton height={350} />
        </div>
        <div className="coll-md-3">
          <Skeleton height={350} />
        </div>
        <div className="coll-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <ul>
        {listings
          .filter(
            (item) =>
              selectedProperty === "" || item.type === selectedProperty || query
          )
          .map((item) => (
            <div key={item.id}>
              <li>{item.title}</li>
              <img src={item.img} alt={item.title} width="350" height="300" />
              <li>{item.price}</li>
              <li>{item.createdDateTime}</li>
            </div>
          ))}
      </ul>
    );
  };

  return <div>{loading ? <Loading /> : <ShowProducts />}</div>;
};
export default Table;
