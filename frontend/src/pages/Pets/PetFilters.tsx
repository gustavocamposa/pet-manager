type PetFiltersProps = {
  petFilter: string;
  setPetFilter: (value: string) => void;

  speciesFilter: string;
  setSpeciesFilter: (value: string) => void;

  breedFilter: string;
  setBreedFilter: (value: string) => void;

  sexFilter: string;
  setSexFilter: (value: string) => void;

  clearFilters: () => void;
};

export default function PetFilters({
  petFilter,
  setPetFilter,
  speciesFilter,
  setSpeciesFilter,
  breedFilter,
  setBreedFilter,
  sexFilter,
  setSexFilter,
  clearFilters,
}: PetFiltersProps) {
  return (
    <div className="filters">
      <input
        type="text"
        className="input"
        value={petFilter}
        onChange={(e) => setPetFilter(e.target.value)}
        placeholder="Search pet..."
      />

      <input
        type="text"
        className="input"
        value={speciesFilter}
        onChange={(e) => setSpeciesFilter(e.target.value)}
        placeholder="Search species..."
      />

      <input
        type="text"
        className="input"
        value={breedFilter}
        onChange={(e) => setBreedFilter(e.target.value)}
        placeholder="Search breed..."
      />

      <input
        type="text"
        className="input"
        value={sexFilter}
        onChange={(e) => setSexFilter(e.target.value)}
        placeholder="Search sex..."
      />

      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}
