import { useState, useEffect } from "react";

import { getPets, addPet } from "../../services/petService";
import PetForm from "./PetForm";
import PetFilters from "./PetFilters";
import PetList from "./PetList";

export default function Pets() {
  const [pets, setPets] = useState([]);

  const [petFilter, setPetFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [sexFilter, setSexFilter] = useState("");

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("");
  const [notes, setNotes] = useState("");

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

  function clearForm() {
    setName("");
    setSpecies("");
    setBreed("");
    setAge("");
    setWeight("");
    setSex("");
    setNotes("");
  }

  async function handleAddPet(event) {
    event.preventDefault();

    const data = await addPet({
      name,
      species,
      breed,
      age,
      weight,
      sex,
      notes,
    });

    console.log(data);

    setPets((pets) => [...pets, data]);

    clearForm();
  }

  const filteredPets = pets.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(petFilter.toLowerCase()) &&
      pet.species.toLowerCase().includes(speciesFilter.toLowerCase()) &&
      pet.breed.toLowerCase().includes(breedFilter.toLowerCase()) &&
      pet.sex.toLowerCase().includes(sexFilter.toLowerCase())
    );
  });

  return (
    <>
      <h1>Pets</h1>

      <PetForm
        name={name}
        setName={setName}
        species={species}
        setSpecies={setSpecies}
        breed={breed}
        setBreed={setBreed}
        age={age}
        setAge={setAge}
        weight={weight}
        setWeight={setWeight}
        sex={sex}
        setSex={setSex}
        notes={notes}
        setNotes={setNotes}
        handleAddPet={handleAddPet}
      />

      <PetFilters
        petFilter={petFilter}
        setPetFilter={setPetFilter}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
        breedFilter={breedFilter}
        setBreedFilter={setBreedFilter}
        sexFilter={sexFilter}
        setSexFilter={setSexFilter}
        clearFilters={clearFilters}
      />

      <PetList filteredPets={filteredPets} />
    </>
  );
}
