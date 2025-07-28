import './SummaryCard.css';

const SummaryCard = ({ title, value, icon: Icon, trend, color = 'purple' }) => {
  return (
    <div className={`summary-card summary-card-${color}`}>
      <div className="card-header">
        <div className="card-icon">
          <Icon size={24} />
        </div>
        {trend && (
          <div className={`trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p className="card-value">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;