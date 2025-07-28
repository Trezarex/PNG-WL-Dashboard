import { Lightbulb } from 'lucide-react';
import './InsightCard.css';

const InsightCard = ({ insights, title = "Key Insights" }) => {
  return (
    <div className="insight-card">
      <div className="insight-header">
        <div className="insight-icon">
          <Lightbulb size={20} />
        </div>
        <h3>{title}</h3>
      </div>
      <div className="insight-content">
        {insights.map((insight, index) => (
          <div key={index} className="insight-item">
            <div className="insight-bullet"></div>
            <p>{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightCard;