import './FilterBar.css';

const FilterBar = ({
  selectedPeriod,
  onPeriodChange,
  selectedOrganization,
  onOrganizationChange,
  selectedLocation,
  onLocationChange
}) => {
  const periods = [
    { value: 'all', label: 'All Periods' },
    { value: 'Jul-Dec-2024', label: 'Jul–Dec 2024' },
    { value: 'Jan-Jun-2024', label: 'Jan–Jun 2024' },
    { value: 'Jul-Dec-2023', label: 'Jul–Dec 2023' },
    { value: 'Feb-Jun-2023', label: 'Feb–Jun 2023' },
    { value: 'Jul-Dec-2023-2', label: 'Jul–Dec 2023 (Alt)' }
  ];

  const organizations = [
    { value: 'IWDA with VfC and WBCA', label: 'IWDA with VfC and WBCA' },
    { value: 'BCFW', label: 'BCFW' },
    { value: 'EPF', label: 'EPF' },
    { value: 'Femili PNG', label: 'Femili PNG' },
    { value: 'Abt Associates', label: 'Abt Associates' },
    { value: 'IWDA with NCFR', label: 'IWDA with NCFR' },
    { value: 'Santos Foundation', label: 'Santos Foundation' },
    { value: 'PIPP', label: 'PIPP' },
    { value: 'Pacific Women Lead', label: 'Pacific Women Lead' },
    { value: 'Office of Development for Women', label: 'Office of Development for Women' },
    { value: 'DFCDR', label: 'DFCDR' },
    { value: 'CIPE', label: 'CIPE' },
    { value: 'UN Women', label: 'UN Women' }
  ];


  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'AROB', label: 'AROB' },
    { value: 'Bougainiville', label: 'Bougainiville' },
    { value: 'Buka', label: 'Buka' },
    { value: 'Central', label: 'Central' },
    { value: 'East New Britain', label: 'East New Britain' },
    { value: 'East Sepik', label: 'East Sepik' },
    { value: 'Eastern Highlands', label: 'Eastern Highlands' },
    { value: 'Hela', label: 'Hela' },
    { value: 'Jiwaka', label: 'Jiwaka' },
    { value: 'Lae', label: 'Lae' },
    { value: 'Madang', label: 'Madang' },
    { value: 'Milne Bay', label: 'Milne Bay' },
    { value: 'Morobe', label: 'Morobe' },
    { value: 'NCD', label: 'NCD' },
    { value: 'New Ireland', label: 'New Ireland' },
    { value: 'Oro', label: 'Oro' },
    { value: 'Port Moresby', label: 'Port Moresby' },
    { value: 'Sandaun', label: 'Sandaun' },
    { value: 'Southern Highlands', label: 'Southern Highlands' },
    { value: 'West New Britain', label: 'West New Britain' },
    { value: 'West Sepik', label: 'West Sepik' },
    { value: 'Western Province', label: 'Western Province' }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="organization-select">Organization:</label>
        <select
          id="organization-select"
          value={selectedOrganization || 'all'}
          onChange={(e) => onOrganizationChange(e.target.value)}
          className="filter-select"
        >
          {organizations.map(org => (
            <option key={org.value} value={org.value}>
              {org.label}
            </option>
          ))}
        </select>
      </div>

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

      <div className="filter-group">
        <label htmlFor="location-select">Location:</label>
        <select
          id="location-select"
          value={selectedLocation || 'all'}
          onChange={(e) => onLocationChange(e.target.value)}
          className="filter-select"
        >
          {locations.map(location => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;