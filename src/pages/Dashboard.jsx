import { useState, useMemo } from 'react';
import { Users, Shield, DollarSign, MessageCircle, Activity, Target, TrendingUp, Award, MapPin, Calendar } from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';
import EnhancedChart from '../components/EnhancedChart';
import StatsGrid from '../components/StatsGrid';
import InsightCard from '../components/InsightCard';
import FilterBar from '../components/FilterBar';
import GeographicMap from '../components/GeographicMap';
import { 
  eopoData, gbvData, gbvResponseData, disabilityData, menBoysData, financialData,
  performanceMetrics, geographicData, ageGroupData, impactInvestmentData
} from '../data/sampleData';
import { generateInsights, calculateSummaryStats, getFilteredData } from '../utils/insights';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedOrganization, setSelectedOrganization] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Combine all data
  const allData = useMemo(() => [
    ...eopoData,
    ...gbvData,
    ...gbvResponseData,
    ...disabilityData,
    ...menBoysData,
    ...financialData
  ], []);

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    let filtered = allData;
    
    // Filter by period
    if (selectedPeriod !== 'all') {
      const [period, year] = selectedPeriod.split('-');
      filtered = filtered.filter(item => 
        item.period === period && item.year === year
      );
    }
    
    // Filter by organization
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
  }, [allData, selectedPeriod, selectedOrganization, selectedLocation]);

  // Calculate summary statistics
  const stats = useMemo(() => 
    calculateSummaryStats(filteredData), 
    [filteredData]
  );

  // Generate insights
  const insights = useMemo(() => 
    generateInsights(filteredData, 'Gender Equity'), 
    [filteredData]
  );

  // Prepare chart data
  const programData = useMemo(() => {
    const programs = ['EOPO 1', 'GBV Prevention', 'GBV Response', 'Disability Equity', 'Men/Boys Engagement', 'Financial Decision-Making'];
    return programs.map(program => ({
      program,
      beneficiaries: filteredData
        .filter(item => item.program === program)
        .reduce((sum, item) => sum + item.beneficiaries, 0)
    })).filter(item => item.beneficiaries > 0);
  }, [filteredData]);

  const locationData = useMemo(() => {
    const locations = {};
    filteredData.forEach(item => {
      locations[item.location] = (locations[item.location] || 0) + item.beneficiaries;
    });
    return Object.entries(locations).map(([location, beneficiaries]) => ({
      name: location,
      beneficiaries
    }));
  }, [filteredData]);

  const completionRate = stats.totalActivities > 0 ? 
    Math.round((stats.completedActivities / stats.totalActivities) * 100) : 0;

  const avgSatisfaction = useMemo(() => {
    const totalSatisfaction = filteredData.reduce((sum, item) => sum + (item.satisfaction || 0), 0);
    return filteredData.length > 0 ? Math.round(totalSatisfaction / filteredData.length) : 0;
  }, [filteredData]);

  const avgImpact = useMemo(() => {
    const totalImpact = filteredData.reduce((sum, item) => sum + (item.impact_score || 0), 0);
    return filteredData.length > 0 ? (totalImpact / filteredData.length).toFixed(1) : 0;
  }, [filteredData]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>PNG-WL-Dashboard</h1>
        <p>Comprehensive overview of our programs and their impact</p>
      </div>

      <FilterBar 
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        selectedOrganization={selectedOrganization}
        onOrganizationChange={setSelectedOrganization}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />

      {/* Geographic Map */}
      <div className="map-section">
        <GeographicMap 
          data={locationData}
          title="Program Coverage Across PNG"
          height={450}
        />
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <AnimatedCard
          title="Total Beneficiaries"
          value={stats.totalBeneficiaries.toLocaleString()}
          subtitle="People impacted across all programs"
          icon={Users}
          color="purple"
          trend={15}
          delay={100}
        />
        <AnimatedCard
          title="Active Programs"
          value={programData.length}
          subtitle="Currently running initiatives"
          icon={Target}
          color="teal"
          trend={8}
          delay={200}
        />
        <AnimatedCard
          title="Completion Rate"
          value={`${completionRate}%`}
          subtitle="Activities successfully completed"
          icon={Activity}
          color="green"
          trend={12}
          delay={300}
        />
        <AnimatedCard
          title="Total Investment"
          value={`₹${(stats.totalBudget / 100000).toFixed(1)}L`}
          subtitle="Financial resources allocated"
          icon={DollarSign}
          color="orange"
          trend={-3}
          delay={400}
        />
      </div>

      {/* Performance Metrics Grid */}
      <StatsGrid data={filteredData} title="Detailed Performance Metrics" />

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-section">
          <EnhancedChart
            data={programData}
            type="bar"
            title="Beneficiaries by Program"
            dataKey="beneficiaries"
            height={400}
            showGrid={true}
            showLegend={true} // Show legend for clarity
            // Add trend line overlay for program beneficiaries
            trendLineKey="beneficiaries"
          />
        </div>
        <div className="chart-section">
          <EnhancedChart
            data={locationData}
            type="pie"
            title="Geographic Distribution"
            dataKey="beneficiaries"
            height={400}
          />
        </div>
      </div>

      {/* Additional Charts */}
      <div className="charts-grid">
        <div className="chart-section">
          <EnhancedChart
            data={performanceMetrics}
            type="composed"
            title="Monthly Performance Trends"
            dataKey="beneficiaries"
            height={350}
            showLegend={true}
            // Already has a trend line (satisfaction)
          />
        </div>
        <div className="chart-section">
          <EnhancedChart
            data={ageGroupData}
            type="area"
            title="Age Group Distribution"
            dataKey="beneficiaries"
            height={350}
            showLegend={true}
            trendLineKey="beneficiaries"
          />
        </div>
      </div>

      {/* Impact vs Investment Analysis */}
      <div className="charts-grid">
        <div className="chart-section">
          <EnhancedChart
            data={geographicData.slice(0, 6)}
            type="bar"
            title="Top States by Reach"
            dataKey="beneficiaries"
            height={350}
            showLegend={true}
            trendLineKey="beneficiaries"
          />
        </div>
        <div className="chart-section">
          <EnhancedChart
            data={impactInvestmentData}
            type="radial"
            title="Program ROI Analysis"
            dataKey="roi"
            height={350}
          />
        </div>
      </div>

      {/* Insights */}
      <InsightCard insights={insights} title="Dashboard Insights" />
    </div>
  );
};

export default Dashboard;