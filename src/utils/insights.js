// Data analysis and insights generation
export const generateInsights = (data, programName) => {
  if (!data || data.length === 0) return [];

  const insights = [];

  // Total beneficiaries insight
  const totalBeneficiaries = data.reduce((sum, item) => sum + item.beneficiaries, 0);
  const currentPeriodData = data.filter(item => item.period === "Jan-Jun" && item.year === "2024");
  const previousPeriodData = data.filter(item => item.period === "Jul-Dec" && item.year === "2023");

  const currentTotal = currentPeriodData.reduce((sum, item) => sum + item.beneficiaries, 0);
  const previousTotal = previousPeriodData.reduce((sum, item) => sum + item.beneficiaries, 0);

  if (currentTotal > 0 && previousTotal > 0) {
    const growthRate = ((currentTotal - previousTotal) / previousTotal * 100).toFixed(1);
    const direction = growthRate > 0 ? 'increase' : 'decrease';
    insights.push(
      `${programName} programs reached ${currentTotal.toLocaleString()} beneficiaries in Jan-Jun 2024, showing a ${Math.abs(growthRate)}% ${direction} from the previous period.`
    );
  }

  // Completion rate insight
  const completedActivities = data.filter(item => item.completed).length;
  const completionRate = ((completedActivities / data.length) * 100).toFixed(1);
  insights.push(
    `${completionRate}% of ${programName} activities have been successfully completed across all reporting periods.`
  );

  // Budget efficiency insight
  const totalBudget = data.reduce((sum, item) => sum + item.budget, 0);
  const costPerBeneficiary = (totalBudget / totalBeneficiaries).toFixed(0);
  insights.push(
    `The average cost per beneficiary for ${programName} is ₹${costPerBeneficiary}, demonstrating efficient resource utilization.`
  );

  return insights;
};

export const calculateSummaryStats = (data) => {
  return {
    totalBeneficiaries: data.reduce((sum, item) => sum + item.beneficiaries, 0),
    totalActivities: data.length,
    completedActivities: data.filter(item => item.completed).length,
    totalBudget: data.reduce((sum, item) => sum + item.budget, 0),
    uniqueLocations: [...new Set(data.map(item => item.location))].length
  };
};

export const getFilteredData = (data, period) => {
  if (period === 'all') return data;
  const [periodName, year] = period.split('-');
  return data.filter(item => 
    item.period === periodName && item.year === year
  );
};