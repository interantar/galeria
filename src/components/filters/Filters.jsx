/* eslint-disable react/prop-types */
// Filters.jsx
const Filters = ({
  regions,
  categories,
  selectedRegion,
  selectedCategory,
  setSelectedRegion,
  setSelectedCategory,
}) => {
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="dropdown-container">
      {/* Dropdown para selecionar a região */}
      <select
        value={selectedRegion}
        onChange={handleRegionChange}
        className="dropdown"
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {/* Dropdown para selecionar a categoria */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="dropdown"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
