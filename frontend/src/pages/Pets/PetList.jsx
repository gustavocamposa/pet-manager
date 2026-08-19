export default function PetList({ filteredPets, onEdit }) {
  if (filteredPets.length === 0) {
    return <p>No pets found.</p>;
  }

  return (
    <div>
      {filteredPets.map((pet) => (
        <div key={pet.id}>
          {pet.name} <br />
          {pet.species} <br />
          {pet.breed} <br />
          {pet.age} <br />
          {pet.weight} <br />
          {pet.sex} <br />
          {pet.notes} <br />
          <button onClick={() => onEdit(pet)}>Edit</button>{" "}
        </div>
      ))}
    </div>
  );
}
