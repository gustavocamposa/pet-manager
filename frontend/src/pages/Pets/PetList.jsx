export default function PetList({
  filteredPets,
  onEdit,
  onDelete,
  deletingId,
}) {
  if (filteredPets.length === 0) {
    return <p className="empty-state">No pets found.</p>;
  }

  return (
    <div className="pet-list">
      {filteredPets.map((pet) => {
        const isDeleting = deletingId === pet.id;

        return (
          <div className="pet-card" key={pet.id}>
            <h3 className="pet-card-name">{pet.name}</h3>

            <p className="pet-field">
              <span className="pet-field-label">Species:</span> {pet.species}
            </p>
            <p className="pet-field">
              <span className="pet-field-label">Breed:</span> {pet.breed}
            </p>
            <p className="pet-field">
              <span className="pet-field-label">Age:</span> {pet.age}
            </p>
            <p className="pet-field">
              <span className="pet-field-label">Weight:</span> {pet.weight}
            </p>
            <p className="pet-field">
              <span className="pet-field-label">Sex:</span> {pet.sex}
            </p>
            {pet.notes && (
              <p className="pet-field pet-notes">
                <span className="pet-field-label">Notes:</span> {pet.notes}
              </p>
            )}

            <div className="pet-card-actions">
              <button
                type="button"
                className="btn btn-small btn-edit"
                onClick={() => onEdit(pet)}
                disabled={isDeleting}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-small btn-delete"
                onClick={() => onDelete(pet)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
