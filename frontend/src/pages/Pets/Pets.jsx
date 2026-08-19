import { useState, useEffect } from "react";

async function getPets() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/pets", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();

  return data;
}

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [petFilter, setPetFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [sexFilter, setSexFilter] = useState("");

  useEffect(() => {
    async function search() {
      const result = await getPets();

      setPets(result);
    }

    search();
  }, []);

  function clearFilters() {
    setPetFilter("");
    setSpeciesFilter("");
    setBreedFilter("");
    setSexFilter("");
  }

  return (
    <>
      <h1>Pets</h1>
      <input
        type="text"
        value={petFilter}
        onChange={(e) => setPetFilter(e.target.value)}
        placeholder="Search pet..."
      />
      <input
        type="text"
        value={speciesFilter}
        onChange={(e) => setSpeciesFilter(e.target.value)}
        placeholder="Search species..."
      />
      <input
        type="text"
        value={breedFilter}
        onChange={(e) => setBreedFilter(e.target.value)}
        placeholder="Search breeds..."
      />
      <input
        type="text"
        value={sexFilter}
        onChange={(e) => setSexFilter(e.target.value)}
        placeholder="Search sex..."
      />

      <button onClick={clearFilters}>Clear Filters</button>

      <div>
        {pets
          .filter((pet) => {
            return (
              pet.name.toLowerCase().includes(petFilter.toLowerCase()) &&
              pet.species.toLowerCase().includes(speciesFilter.toLowerCase()) &&
              pet.breed.toLowerCase().includes(breedFilter.toLowerCase()) &&
              pet.sex.toLowerCase().includes(sexFilter.toLowerCase())
            );
          })
          .map((pet) => (
            <div key={pet.id}>
              {pet.name} <br />
              {pet.species}
              <br />
              {pet.breed}
              <br />
              {pet.age}
              <br />
              {pet.weight}
              <br />
              {pet.sex}
              <br />
              {pet.notes}
            </div>
          ))}
      </div>
    </>
  );
}
