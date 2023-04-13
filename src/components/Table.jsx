const Table = ({ listings, selectedProperty, query }) => {
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
export default Table