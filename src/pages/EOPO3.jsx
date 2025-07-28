import { useState, useMemo } from 'react';
import { DollarSign, Activity, MapPin, TrendingUp } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import DataChart from '../components/DataChart';
import InsightCard from '../components/InsightCard';
import FilterBar from '../components/FilterBar';
import { financialData } from '../data/sampleData';
import { generateInsights, calculateSummaryStats, getFilteredData } from '../utils/insights';

const EOPO3 = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const filteredData = useMemo(() => 
    getFilteredData(financialData, selectedPeriod), 
    [selectedPeriod]
  );

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
        <h1>EOPO 3 - Financial Decision-Making</h1>
        <p>Empowering women with financial literacy and economic independence</p>
      </div>

      <FilterBar 
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <div className="summary-grid">
        <SummaryCard
          title="Women Empowered"
          value={stats.totalBeneficiaries.toLocaleString()}
          icon={DollarSign}
          color="green"
        />
        <SummaryCard
          title="Training Programs"
          value={stats.completedActivities}
          icon={Activity}
          color="teal"
        />
        <SummaryCard
          title="Cities Covered"
          value={stats.uniqueLocations}
          icon={MapPin}
          color="blue"
        />
        <SummaryCard
          title="Investment Made"
          value={`₹${(stats.totalBudget / 100000).toFixed(1)}L`}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="charts-grid">
        <DataChart
          data={activityData}
          type="bar"
          title="Participation by Program Type"
          dataKey="beneficiaries"
        />
        <DataChart
          data={locationData}
          type="pie"
          title="Geographic Distribution"
          dataKey="beneficiaries"
        />
      </div>

      <InsightCard 
        insights={insights} 
        title="Financial Empowerment Insights" 
      />
    </div>
  );
};

export default EOPO3;