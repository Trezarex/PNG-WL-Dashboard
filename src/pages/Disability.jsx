import { useState, useMemo } from 'react';
import { Accessibility, Activity, MapPin, Target } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import DataChart from '../components/DataChart';
import InsightCard from '../components/InsightCard';
import FilterBar from '../components/FilterBar';
import { disabilityData } from '../data/sampleData';
import { generateInsights, calculateSummaryStats, getFilteredData } from '../utils/insights';

const Disability = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    let filtered = disabilityData;
    
    // Filter by period
    if (selectedPeriod !== 'all') {
      const [period, year] = selectedPeriod.split('-');
      filtered = filtered.filter(item => 
        item.period === period && item.year === year
      );
    }
    
    // Filter by organization (program)
    if (selectedOrganization !== 'all') {
      filtered = filtered.filter(item => 
        item.program === selectedOrganization
      );
    }
    
    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(item => 
        item.location === selectedLocation
      );
    }
    
    return filtered;
  }, [selectedPeriod, selectedOrganization, selectedLocation]);

  const stats = useMemo(() => 
    calculateSummaryStats(filteredData), 
    [filteredData]
  );

  const insights = useMemo(() => 
    generateInsights(filteredData, "Disability Equity"), 
    [filteredData]
  );

  const activityData = useMemo(() => {
    const activities = {};
    filteredData.forEach(item => {
      activities[item.activity] = (activities[item.activity] || 0) + item.beneficiaries;
    });
    return Object.entries(activities).map(([activity, beneficiaries]) => ({
      activity,
      beneficiaries
    }));
  }, [filteredData]);

  const locationData = useMemo(() => {
    const locations = {};
    filteredData.forEach(item => {
      locations[item.location] = (locations[item.location] || 0) + item.beneficiaries;
    });
    return Object.entries(locations).map(([name, beneficiaries]) => ({
      name,
      beneficiaries
    }));
  }, [filteredData]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Disability Equity Programs</h1>
        <p>Creating inclusive opportunities and removing barriers for people with disabilities</p>
      </div>

      <FilterBar 
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        selectedOrganization={selectedOrganization}
        onOrganizationChange={setSelectedOrganization}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />

      <div className="summary-grid">
        <SummaryCard
          title="People Served"
          value={stats.totalBeneficiaries.toLocaleString()}
          icon={Accessibility}
          color="purple"
        />
        <SummaryCard
          title="Programs Delivered"
          value={stats.completedActivities}
          icon={Target}
          color="teal"
        />
        <SummaryCard
          title="Locations Served"
          value={stats.uniqueLocations}
          icon={MapPin}
          color="blue"
        />
        <SummaryCard
          title="Total Investment"
          value={`₹${(stats.totalBudget / 100000).toFixed(1)}L`}
          icon={Activity}
          color="green"
        />
      </div>

      <div className="charts-grid">
        <DataChart
          data={activityData}
          type="bar"
          title="Beneficiaries by Program Type"
          dataKey="beneficiaries"
        />
        <DataChart
          data={locationData}
          type="pie"
          title="Geographic Coverage"
          dataKey="beneficiaries"
        />
      </div>

      <InsightCard 
        insights={insights} 
        title="Disability Equity Program Insights" 
      />
    </div>
  );
};

export default Disability;