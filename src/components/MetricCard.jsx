import { useState, useEffect } from 'react';
import './MetricCard.css';

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color = 'purple',
  progress,
  trend,
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible && progress) {
      let start = 0;
      const end = progress;
      const duration = 1000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedProgress(end);
          clearInterval(timer);
        } else {
          setAnimatedProgress(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, progress]);

  return (
    <div className={`metric-card metric-card-${color} ${isVisible ? 'metric-visible' : ''}`}>
      <div className="metric-header">
        <div className="metric-icon">
          <Icon size={20} />
        </div>
        {trend && (
          <div className={`metric-trend ${trend > 0 ? 'trend-positive' : 'trend-negative'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      
      <div className="metric-content">
        <h4>{title}</h4>
        <div className="metric-value">{value}</div>
        {subtitle && <div className="metric-subtitle">{subtitle}</div>}
        
        {progress && (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${animatedProgress}%` }}
              ></div>
            </div>
            <span className="progress-text">{Math.round(animatedProgress)}%</span>
          </div>
        )}
      </div>
      
      <div className="metric-glow"></div>
    </div>
  );
};

export default MetricCard;