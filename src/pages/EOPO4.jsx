import { useState, useMemo } from 'react';
import { MessageCircle, Activity, MapPin, Users } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import DataChart from '../components/DataChart';
import InsightCard from '../components/InsightCard';
import FilterBar from '../components/FilterBar';
import { financialData } from '../data/sampleData';
import { generateInsights, calculateSummaryStats, getFilteredData } from '../utils/insights';

const EOPO4 = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    let filtered = financialData;
    
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
    generateInsights(filteredData, "Financial Decision-Making"), 
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

  const timelineData = useMemo(() => {
    const timeline = {};
    filteredData.forEach(item => {
      const key = `${item.period} ${item.year}`;
      timeline[key] = (timeline[key] || 0) + item.beneficiaries;
    });
    return Object.entries(timeline).map(([period, beneficiaries]) => ({
      period,
      beneficiaries
    }));
  }, [filteredData]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>EOPO 4 - Financial Decision-Making</h1>
        <p>Empowering women and communities through financial literacy and decision-making skills</p>
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
          title="Individuals Empowered"
          value={stats.totalBeneficiaries.toLocaleString()}
          icon={Users}
          color="blue"
        />
        <SummaryCard
          title="Engagement Sessions"
          value={stats.completedActivities}
          icon={MessageCircle}
          color="teal"
        />
        <SummaryCard
          title="Locations Reached"
          value={stats.uniqueLocations}
          icon={MapPin}
          color="green"
        />
        <SummaryCard
          title="Program Budget"
          value={`₹${(stats.totalBudget / 100000).toFixed(1)}L`}
          icon={Activity}
          color="orange"
        />
      </div>

      <div className="charts-grid">
        <DataChart
          data={activityData}
          type="bar"
          title="Engagement by Activity Type"
          dataKey="beneficiaries"
        />
        <DataChart
          data={timelineData}
          type="line"
          title="Engagement Trends Over Time"
          dataKey="beneficiaries"
        />
      </div>

      <InsightCard 
        insights={insights} 
        title="Men/Boys Engagement Insights" 
      />
    </div>
  );
};

export default EOPO4;