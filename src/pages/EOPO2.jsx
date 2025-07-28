import { useState, useMemo } from 'react';
import { Shield, Activity, MapPin, DollarSign } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import DataChart from '../components/DataChart';
import InsightCard from '../components/InsightCard';
import FilterBar from '../components/FilterBar';
import { gbvData } from '../data/sampleData';
import { generateInsights, calculateSummaryStats, getFilteredData } from '../utils/insights';

const EOPO2 = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const filteredData = useMemo(() => 
    getFilteredData(gbvData, selectedPeriod), 
    [selectedPeriod]
  );

  const stats = useMemo(() => 
    calculateSummaryStats(filteredData), 
    [filteredData]
  );

  const insights = useMemo(() => 
    generateInsights(filteredData, "GBV Prevention & Response"), 
    [filteredData]
  );

  const programTypeData = useMemo(() => {
    const types = {};
    filteredData.forEach(item => {
      types[item.program] = (types[item.program] || 0) + item.beneficiaries;
    });
    return Object.entries(types).map(([name, beneficiaries]) => ({
      name,
      beneficiaries
    }));
  }, [filteredData]);

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

  return (
    <div className="page">
      <div className="page-header">
        <h1>EOPO 2 - GBV Prevention & Response</h1>
        <p>Comprehensive programs to prevent gender-based violence and support survivors</p>
      </div>

      <FilterBar 
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <div className="summary-grid">
        <SummaryCard
          title="People Reached"
          value={stats.totalBeneficiaries.toLocaleString()}
          icon={Shield}
          color="orange"
        />
        <SummaryCard
          title="Programs Delivered"
          value={stats.completedActivities}
          icon={Activity}
          color="teal"
        />
        <SummaryCard
          title="Geographic Coverage"
          value={stats.uniqueLocations}
          icon={MapPin}
          color="blue"
        />
        <SummaryCard
          title="Resource Allocation"
          value={`₹${(stats.totalBudget / 100000).toFixed(1)}L`}
          icon={DollarSign}
          color="green"
        />
      </div>

      <div className="charts-grid">
        <DataChart
          data={programTypeData}
          type="pie"
          title="Program Distribution"
          dataKey="beneficiaries"
        />
        <DataChart
          data={activityData}
          type="bar"
          title="Impact by Activity"
          dataKey="beneficiaries"
        />
      </div>

      <InsightCard 
        insights={insights} 
        title="GBV Prevention & Response Insights" 
      />
    </div>
  );
};

export default EOPO2;