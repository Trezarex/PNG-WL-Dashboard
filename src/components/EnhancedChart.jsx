import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, 
  LineChart, Line, ResponsiveContainer, AreaChart, Area, RadialBarChart, RadialBar,
  ComposedChart, Legend
} from 'recharts';
import './EnhancedChart.css';

const COLORS = [
  '#8B5CF6', '#14B8A6', '#F59E0B', '#EF4444', '#3B82F6', '#10B981',
  '#EC4899', '#6366F1', '#F97316', '#84CC16', '#06B6D4', '#8B5A2B'
];

const GRADIENTS = [
  { id: 'purple', colors: ['#8B5CF6', '#A78BFA'] },
  { id: 'teal', colors: ['#14B8A6', '#5EEAD4'] },
  { id: 'blue', colors: ['#3B82F6', '#93C5FD'] },
  { id: 'green', colors: ['#10B981', '#6EE7B7'] },
  { id: 'orange', colors: ['#F59E0B', '#FCD34D'] }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-value" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const EnhancedChart = ({ 
  data, 
  type = 'bar', 
  title, 
  dataKey = 'beneficiaries',
  height = 350,
  showAnimation = true,
  showGrid = true,
  showLegend = false,
  trendLineKey
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const renderGradients = () => (
    <defs>
      {GRADIENTS.map(gradient => (
        <linearGradient key={gradient.id} id={gradient.id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={gradient.colors[0]} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={gradient.colors[1]} stopOpacity={0.2}/>
        </linearGradient>
      ))}
    </defs>
  );

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (type) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {renderGradients()}
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />}
            <XAxis 
              dataKey={data[0]?.program ? 'program' : data[0]?.name ? 'name' : data[0]?.state ? 'state' : 'activity'}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              stroke="#9CA3AF"
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Bar 
              dataKey={dataKey} 
              fill="url(#purple)" 
              radius={[6, 6, 0, 0]}
              animationDuration={showAnimation ? 1500 : 0}
              animationBegin={0}
            />
            {/* Trend line overlay for bar chart */}
            {trendLineKey && (
              <Line 
                type="monotone" 
                dataKey={trendLineKey} 
                stroke="#14B8A6" 
                strokeWidth={3} 
                dot={false} 
                isAnimationActive={showAnimation}
              />
            )}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {renderGradients()}
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />}
            <XAxis 
              dataKey={data[0]?.period ? 'period' : data[0]?.ageGroup ? 'ageGroup' : 'name'}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              stroke="#9CA3AF"
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#8B5CF6"
              strokeWidth={3}
              fill="url(#purple)"
              animationDuration={showAnimation ? 2000 : 0}
            />
            {/* Trend line overlay for area chart */}
            {trendLineKey && (
              <Line 
                type="monotone" 
                dataKey={trendLineKey} 
                stroke="#14B8A6" 
                strokeWidth={3} 
                dot={false} 
                isAnimationActive={showAnimation}
              />
            )}
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey={dataKey}
              animationDuration={showAnimation ? 1500 : 0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />}
            <XAxis 
              dataKey="period" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              stroke="#9CA3AF"
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke="#8B5CF6" 
              strokeWidth={4}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2, fill: '#fff' }}
              animationDuration={showAnimation ? 2000 : 0}
            />
          </LineChart>
        );

      case 'radial':
        return (
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={data}>
            <RadialBar 
              dataKey={dataKey} 
              cornerRadius={10} 
              fill="url(#purple)"
              animationDuration={showAnimation ? 2000 : 0}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        );

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            {renderGradients()}
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />}
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              stroke="#9CA3AF"
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Bar dataKey="beneficiaries" fill="url(#purple)" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="satisfaction" stroke="#14B8A6" strokeWidth={3} />
          </ComposedChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`enhanced-chart ${isVisible ? 'chart-visible' : ''}`}>
      {title && (
        <div className="chart-header">
          <h3 className="chart-title">{title}</h3>
          <div className="chart-indicator"></div>
        </div>
      )}
      <div className="chart-container" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      <div className="chart-glow"></div>
    </div>
  );
};

export default EnhancedChart;