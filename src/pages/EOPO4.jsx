import { useState, useMemo } from 'react';
import { MessageCircle, Activity, MapPin, Users } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import DataChart from '../components/DataChart';
import InsightCard from '../components/InsightCard';
import FilterBar from '../components/FilterBar';
import { menBoysData } from '../data/sampleData';
import { generateInsights, calculateSummaryStats, getFilteredData } from '../utils/insights';

const EOPO4 = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const filteredData = useMemo(() => 
    getFilteredData(menBoysData, selectedPeriod), 
    [selectedPeriod]
  );

  const stats = useMemo(() => 
    calculateSummaryStats(filteredData), 
    [filteredData]
  );

  const insights = useMemo(() => 
    generateInsights(filteredData, "Men/Boys Engagement"), 
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
        <h1>EOPO 4 - Men/Boys Engagement</h1>
        <p>Engaging men and boys as allies in gender equity and social transformation</p>
      </div>

      <FilterBar 
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <div className="summary-grid">
        <SummaryCard
          title="Men & Boys Engaged"
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