import { useState, useEffect } from 'react';
import './AnimatedCard.css';

const AnimatedCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'purple', 
  trend, 
  subtitle,
  delay = 0,
  children 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible && typeof value === 'number') {
      let start = 0;
      const end = value;
      const duration = 1500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedValue(end);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  const displayValue = typeof value === 'number' ? animatedValue : value;

  return (
    <div className={`animated-card animated-card-${color} ${isVisible ? 'card-visible' : ''}`}>
      <div className="card-glow"></div>
      <div className="card-header">
        <div className="card-icon-wrapper">
          <div className="card-icon">
            <Icon size={24} />
          </div>
          <div className="icon-pulse"></div>
        </div>
        {trend && (
          <div className={`trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
            <span className="trend-arrow">{trend > 0 ? '↗' : '↘'}</span>
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p className="card-value">
          {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
        </p>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {children}
      </div>
      <div className="card-shine"></div>
    </div>
  );
};

export default AnimatedCard;