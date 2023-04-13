import React, { useState, useEffect } from "react";

function Method2() {
  const [ilanlar, setIlanlar] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    // API'den ilanları çekmek için gerekli kodlar buraya gelecek
    fetch("http://localhost:3000/places")
      .then((response) => response.json())
      .then((data) => setIlanlar(data));
  }, [selectedType]);

  return (
    <div>
      <select onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">Tümü</option>
        <option value="Apartment ">Apartman</option>
        <option value="Villa">Villa</option>
        <option value="Townhouse">Townhouse</option>
      </select>
      <ul>
        {ilanlar
          .filter((ilan) => (selectedType ? ilan.type === selectedType : true))
          .map((ilan) => (
            <li key={ilan.id}>{ilan.title}</li>
          ))}
      </ul>
    </div>
  );
}

export default Method2;
