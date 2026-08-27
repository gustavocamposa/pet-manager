import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import type { Pet } from "../../types/Pet";

type PetFormErrors = {
  name?: string;
  species?: string;
  breed?: string;
  age?: string;
  weight?: string;
  sex?: string;
};

type PetFormProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;

  species: string;
  setSpecies: Dispatch<SetStateAction<string>>;

  breed: string;
  setBreed: Dispatch<SetStateAction<string>>;

  age: string;
  setAge: Dispatch<SetStateAction<string>>;

  weight: string;
  setWeight: Dispatch<SetStateAction<string>>;

  sex: string;
  setSex: Dispatch<SetStateAction<string>>;

  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;

  handleAddPet: (event: SubmitEvent) => void;

  editingPet: Pet | null;
  onCancelEdit: () => void;

  errors?: PetFormErrors;
  isSaving?: boolean;
};

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
  editingPet,
  onCancelEdit,
  errors = {},
  isSaving = false,
}: PetFormProps) {
  return (
    <form className="pet-form" onSubmit={handleAddPet} noValidate>
      <div className="field">
        <input
          type="text"
          className={`input ${errors.name ? "input-error" : ""}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pet name..."
          disabled={isSaving}
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="field">
        <input
          type="text"
          className={`input ${errors.species ? "input-error" : ""}`}
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          placeholder="Species..."
          disabled={isSaving}
        />
        {errors.species && (
          <span className="field-error">{errors.species}</span>
        )}
      </div>

      <div className="field">
        <input
          type="text"
          className={`input ${errors.breed ? "input-error" : ""}`}
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="Breed..."
          disabled={isSaving}
        />
        {errors.breed && <span className="field-error">{errors.breed}</span>}
      </div>

      <div className="field">
        <input
          type="number"
          className={`input ${errors.age ? "input-error" : ""}`}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age..."
          min="0"
          disabled={isSaving}
        />
        {errors.age && <span className="field-error">{errors.age}</span>}
      </div>

      <div className="field">
        <input
          type="number"
          className={`input ${errors.weight ? "input-error" : ""}`}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight..."
          min="0"
          step="0.1"
          disabled={isSaving}
        />
        {errors.weight && <span className="field-error">{errors.weight}</span>}
      </div>

      <div className="field">
        <input
          type="text"
          className={`input ${errors.sex ? "input-error" : ""}`}
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          placeholder="Sex..."
          disabled={isSaving}
        />
        {errors.sex && <span className="field-error">{errors.sex}</span>}
      </div>

      <div className="field field-wide">
        <textarea
          className="input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes..."
          disabled={isSaving}
        />
      </div>

      <div className="pet-form-actions">
        <button type="submit" className="btn btn-accent" disabled={isSaving}>
          {isSaving ? "Saving..." : editingPet ? "Update Pet" : "Add Pet"}
        </button>

        {editingPet && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCancelEdit}
            disabled={isSaving}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
