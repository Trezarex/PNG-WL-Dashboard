import './FilterBar.css';

const FilterBar = ({
  selectedPeriod,
  onPeriodChange,
  selectedOrganization,
  onOrganizationChange,
  selectedLocation,
  onLocationChange,
  selectedIndicator,
  onIndicatorChange
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

  const indicators = [
    { value: 'all', label: 'All Indicators' },
    { value: 'indicator-1', label: 'indicator-1' },
    { value: 'indicator-2', label: 'indicator-2' },
    { value: 'indicator-3', label: 'indicator-3' },
    { value: 'indicator-4', label: 'indicator-4' },
    { value: 'indicator-5', label: 'indicator-5' },
    { value: 'indicator-6', label: 'indicator-6' },
    { value: 'indicator-7', label: 'indicator-7' },
    { value: 'indicator-8', label: 'indicator-8' },
    { value: 'indicator-9', label: 'indicator-9' },
    { value: 'indicator-10', label: 'indicator-10' },
    { value: 'indicator-11', label: 'indicator-11' },
    { value: 'indicator-12', label: 'indicator-12' },
    { value: 'indicator-13', label: 'indicator-13' },
    { value: 'indicator-14', label: 'indicator-14' },
    { value: 'indicator-15', label: 'indicator-15' },
    { value: 'indicator-16', label: 'indicator-16' },
    { value: 'indicator-17', label: 'indicator-17' },
    { value: 'indicator-18', label: 'indicator-18' },
    { value: 'indicator-19', label: 'indicator-19' },
    { value: 'indicator-20', label: 'indicator-20' }
  ];

  const handleDownload = () => {
    // Create a simple CSV with current filter selections
    const filterData = {
      period: selectedPeriod,
      organization: selectedOrganization || 'all',
      location: selectedLocation || 'all',
      indicator: selectedIndicator || 'all',
      timestamp: new Date().toISOString()
    };

    // Convert to CSV format
    const csvContent = `Filter Settings,Value
Period,${filterData.period}
Organization,${filterData.organization}
Location,${filterData.location}
Indicator,${filterData.indicator}
Downloaded At,${filterData.timestamp}`;

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-filters-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="filter-bar">
      <div className="filter-content">
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

        <div className="filter-group">
          <label htmlFor="indicator-select">Indicator:</label>
          <select
            id="indicator-select"
            value={selectedIndicator || 'all'}
            onChange={(e) => onIndicatorChange && onIndicatorChange(e.target.value)}
            className="filter-select"
          >
            {indicators.map(indicator => (
              <option key={indicator.value} value={indicator.value}>
                {indicator.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button 
        className="download-button"
        onClick={handleDownload}
        title="Download Dashboard Data"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download
      </button>
    </div>
  );
};

export default FilterBar;