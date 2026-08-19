import { useState, useEffect } from "react";

import PetForm from "./PetForm";
import PetFilters from "./PetFilters";
import PetList from "./PetList";

import { getPets, addPet, updatePet } from "../../services/petService";

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

  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    async function search() {
      const result = await getPets();

      setPets(result);
    }

    search();
  }, []);

  // Quando selecionar um pet para editar,
  // preenche o formulário com os dados dele
  useEffect(() => {
    if (editingPet) {
      setName(editingPet.name);
      setSpecies(editingPet.species);
      setBreed(editingPet.breed);
      setAge(editingPet.age);
      setWeight(editingPet.weight);
      setSex(editingPet.sex);
      setNotes(editingPet.notes);
    }
  }, [editingPet]);

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

  function handleEditPet(pet) {
    setEditingPet(pet);
  }

  async function handleAddPet(event) {
    event.preventDefault();

    if (editingPet) {
      const data = await updatePet(editingPet.id, {
        name,
        species,
        breed,
        age,
        weight,
        sex,
        notes,
      });
      setPets((pets) =>
        pets.map((pet) => {
          if (pet.id === editingPet.id) {
            return data;
          }
          return pet;
        }),
      );

      console.log(data);
      clearForm();
      setEditingPet(null);
    } else {
      const data = await addPet({
        name,
        species,
        breed,
        age,
        weight,
        sex,
        notes,
      });
      clearForm();

      console.log(data);

      setPets((pets) => [...pets, data]);
    }
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
        editingPet={editingPet}
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

      <PetList filteredPets={filteredPets} onEdit={handleEditPet} />
    </>
  );
}
