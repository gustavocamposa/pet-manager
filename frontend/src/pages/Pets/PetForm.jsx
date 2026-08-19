export default function PetForm({
  name,
  setName,
  species,
  setSpecies,
  breed,
  setBreed,
  age,
  setAge,
  weight,
  setWeight,
  sex,
  setSex,
  notes,
  setNotes,
  handleAddPet,
}) {
  return (
    <form onSubmit={handleAddPet}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Pet name..."
      />

      <input
        type="text"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        placeholder="Species..."
      />

      <input
        type="text"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        placeholder="Breed..."
      />

      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age..."
      />

      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
        placeholder="Weight..."
      />

      <input
        type="text"
        value={sex}
        onChange={(e) => setSex(e.target.value)}
        placeholder="Sex..."
      />

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes..."
      />

      <button type="submit">Add Pet</button>
    </form>
  );
}
