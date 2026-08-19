export default function PetList({ filteredPets }) {
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
        </div>
      ))}
    </div>
  );
}
