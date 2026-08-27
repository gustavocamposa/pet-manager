import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";

import PetForm from "./PetForm";
import PetFilters from "./PetFilters";
import PetList from "./PetList";

import {
  getPets,
  addPet,
  updatePet,
  deletePet,
} from "../../services/petService";

type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  sex: string;
  notes: string;
};

type PetFormErrors = {
  name?: string;
  species?: string;
  breed?: string;
  age?: string;
  weight?: string;
  sex?: string;
};

type PetsProps = {
  onLogout: () => void;
};

export default function Pets({ onLogout }: PetsProps) {
  const [pets, setPets] = useState<Pet[]>([]);

  const [isLoadingPets, setIsLoadingPets] = useState(true);
  const [loadError, setLoadError] = useState("");

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

  const [formErrors, setFormErrors] = useState<PetFormErrors>({});

  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    async function search() {
      setIsLoadingPets(true);
      setLoadError("");

      try {
        const result = await getPets();
        setPets(result);
      } catch (error) {
        if (error instanceof Error) {
          setLoadError(error.message);
        } else {
          setLoadError("Could not load pets.");
        }
      } finally {
        setIsLoadingPets(false);
      }
    }

    search();
  }, []);

  useEffect(() => {
    if (editingPet) {
      setName(editingPet.name);
      setSpecies(editingPet.species);
      setBreed(editingPet.breed);
      setAge(String(editingPet.age));
      setWeight(String(editingPet.weight));
      setSex(editingPet.sex);
      setNotes(editingPet.notes);
      setFormErrors({});
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
    setFormErrors({});
  }

  function handleEditPet(pet: Pet) {
    setSaveError("");
    setEditingPet(pet);
  }

  function handleCancelEdit() {
    setEditingPet(null);
    clearForm();
  }

  async function handleDeletePet(pet: Pet) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${pet.name}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setDeleteError("");
    setDeletingId(pet.id);

    try {
      await deletePet(pet.id);

      setPets((pets) =>
        pets.filter((item) => item.id !== pet.id),
      );

      if (editingPet?.id === pet.id) {
        handleCancelEdit();
      }
    } catch (error) {
      if (error instanceof Error) {
        setDeleteError(error.message);
      } else {
        setDeleteError("Could not delete pet.");
      }
    } finally {
      setDeletingId(null);
    }
  }

  function validatePetForm() {
    const errors: PetFormErrors = {};

    if (!name.trim()) {
      errors.name = "Please enter the pet's name.";
    }

    if (!species.trim()) {
      errors.species = "Please enter the species.";
    }

    if (!breed.trim()) {
      errors.breed = "Please enter the breed.";
    }

    if (
      age === "" ||
      Number.isNaN(Number(age)) ||
      Number(age) <= 0
    ) {
      errors.age = "Please enter a valid age.";
    }

    if (
      weight === "" ||
      Number.isNaN(Number(weight)) ||
      Number(weight) <= 0
    ) {
      errors.weight = "Please enter a valid weight.";
    }

    if (!sex.trim()) {
      errors.sex = "Please enter the sex.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleAddPet(event: SubmitEvent) {
    event.preventDefault();

    setSaveError("");

    if (!validatePetForm()) {
      return;
    }

    setIsSaving(true);

    const payload = {
      name: name.trim(),
      species: species.trim(),
      breed: breed.trim(),
      age: Number(age),
      weight: Number(weight),
      sex: sex.trim(),
      notes: notes.trim(),
    };

    try {
      if (editingPet) {
        const data = await updatePet(editingPet.id, payload);

        setPets((pets) =>
          pets.map((pet) =>
            pet.id === editingPet.id ? data : pet,
          ),
        );

        setEditingPet(null);
      } else {
        const data = await addPet(payload);

        setPets((pets) => [...pets, data]);
      }

      clearForm();
    } catch (error) {
      if (error instanceof Error) {
        setSaveError(error.message);
      } else {
        setSaveError("Could not save pet.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  const filteredPets = pets.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(petFilter.toLowerCase()) &&
      pet.species
        .toLowerCase()
        .includes(speciesFilter.toLowerCase()) &&
      pet.breed
        .toLowerCase()
        .includes(breedFilter.toLowerCase()) &&
      pet.sex.toLowerCase().includes(sexFilter.toLowerCase())
    );
  });

  return (
    <section className="pets-page">
      <div className="pets-header">
        <h2 className="section-title">Pets</h2>

        <button
          type="button"
          className="btn btn-link"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>

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
        onCancelEdit={handleCancelEdit}
        errors={formErrors}
        isSaving={isSaving}
      />

      {saveError && (
        <p className="error-banner">{saveError}</p>
      )}

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

      {deleteError && (
        <p className="error-banner">{deleteError}</p>
      )}

      {isLoadingPets ? (
        <p className="loading">Loading pets...</p>
      ) : loadError ? (
        <p className="error-banner">{loadError}</p>
      ) : (
        <PetList
          filteredPets={filteredPets}
          onEdit={handleEditPet}
          onDelete={handleDeletePet}
          deletingId={deletingId}
        />
      )}
    </section>
  );
}