import { useState, useMemo } from 'react';
import { Users, Activity, MapPin, DollarSign } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import EnhancedChart from '../components/EnhancedChart';
import StatsGrid from '../components/StatsGrid';
import InsightCard from '../components/InsightCard';
import FilterBar from '../components/FilterBar';
import { eopoData } from '../data/sampleData';
import { generateInsights, calculateSummaryStats, getFilteredData } from '../utils/insights';

const EOPO1 = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    let filtered = eopoData;
    
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
    generateInsights(filteredData, "Women's Leadership"), 
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
        <h1>EOPO 1 - Women's Leadership</h1>
        <p>Empowering women through leadership development and capacity building programs</p>
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
        <AnimatedCard
          title="Total Beneficiaries"
          value={stats.totalBeneficiaries.toLocaleString()}
          subtitle="Women empowered through leadership programs"
          icon={Users}
          color="purple"
          trend={14}
          delay={100}
        />
        <AnimatedCard
          title="Activities Completed"
          value={`${stats.completedActivities}/${stats.totalActivities}`}
          subtitle="Program implementation progress"
          icon={Activity}
          color="teal"
          trend={8}
          delay={200}
        />
        <AnimatedCard
          title="Locations Reached"
          value={stats.uniqueLocations}
          subtitle="Cities with active programs"
          icon={MapPin}
          color="blue"
          trend={25}
          delay={300}
        />
        <AnimatedCard
          title="Program Investment"
          value={`₹${(stats.totalBudget / 100000).toFixed(1)}L`}
          subtitle="Total financial allocation"
          icon={DollarSign}
          color="green"
          trend={-5}
          delay={400}
        />
      </div>

      <StatsGrid data={filteredData} title="Women's Leadership Program Metrics" />

      <div className="charts-grid">
        <EnhancedChart
          data={activityData}
          type="bar"
          title="Beneficiaries by Activity Type"
          dataKey="beneficiaries"
          height={400}
        />
        <EnhancedChart
          data={timelineData}
          type="area"
          title="Program Progress Over Time"
          dataKey="beneficiaries"
          height={400}
        />
      </div>

      <InsightCard 
        insights={insights} 
        title="Women's Leadership Program Insights" 
      />
    </div>
  );
};

export default EOPO1;