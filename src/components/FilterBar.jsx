import './FilterBar.css';

const FilterBar = ({ selectedPeriod, onPeriodChange }) => {
  const periods = [
    { value: 'all', label: 'All Periods' },
    { value: 'Jan-Jun-2024', label: 'Jan-Jun 2024' },
    { value: 'Jul-Dec-2023', label: 'Jul-Dec 2023' }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="period-select">Time Period:</label>
        <select
          id="period-select"
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="filter-select"
        >
          {periods.map(period => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;