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
}) {
  return (
    <div>
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
        placeholder="Search breed..."
      />

      <input
        type="text"
        value={sexFilter}
        onChange={(e) => setSexFilter(e.target.value)}
        placeholder="Search sex..."
      />

      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
}
