import { useState, useMemo } from 'react';
import { BarChart3, Activity, TrendingUp, Users } from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import DataChart from '../components/DataChart';
import InsightCard from '../components/InsightCard';
import { eopoData, gbvData, disabilityData, menBoysData, financialData } from '../data/sampleData';

const Communications = () => {
  // Combine all program data for communications overview
  const allData = useMemo(() => [
    ...eopoData,
    ...gbvData, 
    ...disabilityData,
    ...menBoysData,
    ...financialData
  ], []);

  // Communication-specific metrics
  const totalReach = allData.reduce((sum, item) => sum + item.beneficiaries, 0);
  const totalPrograms = [...new Set(allData.map(item => item.program))].length;
  const totalLocations = [...new Set(allData.map(item => item.location))].length;
  const totalActivities = allData.length;

  // Program reach data for visualization
  const programReachData = useMemo(() => {
    const programs = {};
    allData.forEach(item => {
      programs[item.program] = (programs[item.program] || 0) + item.beneficiaries;
    });
    return Object.entries(programs).map(([program, beneficiaries]) => ({
      program: program.replace('EOPO ', '').replace('/', ' & '),
      beneficiaries
    }));
  }, [allData]);

  // Monthly communication metrics (simulated)
  const monthlyData = [
    { period: 'Jul-Dec 2023', reach: 1150, engagement: 85 },
    { period: 'Jan-Jun 2024', reach: 1395, engagement: 92 }
  ];

  const communicationInsights = [
    `Our gender equity programs have reached ${totalReach.toLocaleString()} individuals across ${totalLocations} cities, demonstrating significant geographic impact.`,
    `With ${totalPrograms} active program areas and ${totalActivities} implemented activities, we maintain a diverse portfolio addressing multiple aspects of gender equity.`,
    `The 21% increase in beneficiary reach from Jul-Dec 2023 to Jan-Jun 2024 shows growing program effectiveness and community engagement.`
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Communications & Outreach</h1>
        <p>Impact communication and stakeholder engagement metrics</p>
      </div>

      <div className="summary-grid">
        <SummaryCard
          title="Total Reach"
          value={totalReach.toLocaleString()}
          icon={Users}
          color="purple"
        />
        <SummaryCard
          title="Program Areas"
          value={totalPrograms}
          icon={BarChart3}
          color="teal"
        />
        <SummaryCard
          title="Geographic Coverage"
          value={totalLocations}
          icon={TrendingUp}
          color="blue"
        />
        <SummaryCard
          title="Total Activities"
          value={totalActivities}
          icon={Activity}
          color="green"
        />
      </div>

      <div className="charts-grid">
        <DataChart
          data={programReachData}
          type="bar"
          title="Program Reach & Communication Impact"
          dataKey="beneficiaries"
        />
        <DataChart
          data={monthlyData}
          type="line"
          title="Communication Reach Over Time"
          dataKey="reach"
        />
        {/* Add a trend line for engagement on the monthlyData chart */}
        <DataChart
          data={monthlyData}
          type="line"
          title="Engagement Trend Over Time"
          dataKey="engagement"
        />
      </div>

      <InsightCard 
        insights={communicationInsights} 
        title="Communication & Outreach Insights" 
      />
    </div>
  );
};

export default Communications;