import { TrendingUp, Users, Target, Award, MapPin, Calendar } from 'lucide-react';
import MetricCard from './MetricCard';
import './StatsGrid.css';

const StatsGrid = ({ data, title = "Performance Metrics" }) => {
  const calculateMetrics = () => {
    if (!data || data.length === 0) return {};

    const totalBeneficiaries = data.reduce((sum, item) => sum + item.beneficiaries, 0);
    const totalBudget = data.reduce((sum, item) => sum + item.budget, 0);
    const avgSatisfaction = data.reduce((sum, item) => sum + (item.satisfaction || 0), 0) / data.length;
    const avgImpact = data.reduce((sum, item) => sum + (item.impact_score || 0), 0) / data.length;
    const completionRate = (data.filter(item => item.completed).length / data.length) * 100;
    const uniqueLocations = [...new Set(data.map(item => item.location))].length;

    return {
      totalBeneficiaries,
      totalBudget,
      avgSatisfaction: Math.round(avgSatisfaction),
      avgImpact: avgImpact.toFixed(1),
      completionRate: Math.round(completionRate),
      uniqueLocations
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="stats-grid-container">
      <h3 className="stats-grid-title">{title}</h3>
      <div className="stats-grid">
        <MetricCard
          title="Total Beneficiaries"
          value={metrics.totalBeneficiaries?.toLocaleString() || '0'}
          subtitle="People impacted"
          icon={Users}
          color="purple"
          progress={85}
          trend={12}
          delay={100}
        />
        
        <MetricCard
          title="Satisfaction Rate"
          value={`${metrics.avgSatisfaction}%`}
          subtitle="Average rating"
          icon={Award}
          color="green"
          progress={metrics.avgSatisfaction}
          trend={5}
          delay={200}
        />
        
        <MetricCard
          title="Impact Score"
          value={metrics.avgImpact}
          subtitle="Out of 10"
          icon={TrendingUp}
          color="blue"
          progress={(parseFloat(metrics.avgImpact) / 10) * 100}
          trend={8}
          delay={300}
        />
        
        <MetricCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          subtitle="Activities completed"
          icon={Target}
          color="teal"
          progress={metrics.completionRate}
          trend={3}
          delay={400}
        />
        
        <MetricCard
          title="Geographic Reach"
          value={metrics.uniqueLocations}
          subtitle="Cities covered"
          icon={MapPin}
          color="orange"
          progress={75}
          trend={15}
          delay={500}
        />
        
        <MetricCard
          title="Investment"
          value={`₹${(metrics.totalBudget / 100000).toFixed(1)}L`}
          subtitle="Total budget"
          icon={Calendar}
          color="indigo"
          progress={68}
          trend={-2}
          delay={600}
        />
      </div>
    </div>
  );
};

export default StatsGrid;