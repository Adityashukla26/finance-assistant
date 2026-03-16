/**
 * Risk Tolerance Calculator
 * Calculates individual risk tolerance and investment allocation based on:
 * - Investment Horizon
 * - Income Surplus
 * - Number of Dependents
 * - Age
 * - Financial Goals
 */

/**
 * Calculate equity allocation percentage based on age
 * @param {number} age - User's age
 * @returns {number} - Recommended equity allocation percentage
 */
export function calculateEquityAllocation(age) {
  if (age < 30) {
    return 100 - age
  } else if (age >= 30 && age <= 50) {
    return 80 - age / 2
  } else {
    return 60 - age / 3
  }
}

/**
 * Calculate monthly and annual surplus
 * @param {object} params
 * @returns {object} - Surplus calculations
 */
export function calculateSurplus(params) {
  const {
    monthlyIncome = 0,
    essentialExpenses = 0,
    emiPayments = 0,
    emergencyFundMonthly = 0,
  } = params

  const monthlySurplus = monthlyIncome - (essentialExpenses + emiPayments + emergencyFundMonthly)
  const annualSurplus = monthlySurplus * 12

  return {
    monthlySurplus: Math.max(0, monthlySurplus),
    annualSurplus: Math.max(0, annualSurplus),
  }
}

/**
 * Calculate risk capital allocation
 * @param {object} params
 * @returns {object} - Risk capital calculations
 */
export function calculateRiskCapital(params) {
  const { annualSurplus, equityAllocationPercent } = params

  const annualRiskCapital = (annualSurplus * equityAllocationPercent) / 100
  const monthlyRiskCapital = annualRiskCapital / 12

  return {
    annualRiskCapital: Math.round(annualRiskCapital),
    monthlyRiskCapital: Math.round(monthlyRiskCapital),
  }
}

/**
 * Calculate risk tolerance score (0-100)
 * Higher score = Higher risk tolerance
 */
export function calculateRiskToleranceScore(params) {
  const {
    age = 30,
    monthlyIncome = 0,
    monthlySurplus = 0,
    dependents = 0,
    emergencyFundMonths = 0,
    investmentHorizonYears = 0,
  } = params

  let score = 50 // Base score

  // Age factor (younger = higher tolerance)
  if (age < 30) score += 15
  else if (age < 40) score += 10
  else if (age < 50) score += 5
  else if (age > 60) score -= 10

  // Income surplus ratio (higher surplus = higher tolerance)
  const surplusRatio = monthlyIncome > 0 ? (monthlySurplus / monthlyIncome) * 100 : 0
  if (surplusRatio > 40) score += 15
  else if (surplusRatio > 30) score += 10
  else if (surplusRatio > 20) score += 5
  else if (surplusRatio < 10) score -= 10

  // Dependents factor (more dependents = lower tolerance)
  score -= dependents * 5

  // Emergency fund factor (better coverage = higher tolerance)
  if (emergencyFundMonths >= 6) score += 10
  else if (emergencyFundMonths >= 3) score += 5
  else score -= 10

  // Investment horizon (longer = higher tolerance)
  if (investmentHorizonYears > 10) score += 10
  else if (investmentHorizonYears > 5) score += 5
  else if (investmentHorizonYears < 3) score -= 10

  // Normalize to 0-100
  return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Get risk profile category
 */
export function getRiskProfile(score) {
  if (score >= 75) return { level: 'Aggressive', color: 'text-orange-400', emoji: '🔥' }
  if (score >= 60) return { level: 'Moderately Aggressive', color: 'text-yellow-400', emoji: '📈' }
  if (score >= 40) return { level: 'Moderate', color: 'text-cyan-400', emoji: '⚖️' }
  if (score >= 25) return { level: 'Conservative', color: 'text-emerald-400', emoji: '🛡️' }
  return { level: 'Very Conservative', color: 'text-slate-400', emoji: '🔒' }
}

/**
 * Get asset allocation recommendation
 */
export function getAssetAllocation(equityPercent) {
  const debtPercent = 100 - equityPercent

  return {
    equity: Math.round(equityPercent),
    debt: Math.round(debtPercent),
    gold: Math.round(equityPercent * 0.1), // 10% of equity allocation
  }
}

/**
 * Complete risk tolerance analysis
 */
export function analyzeRiskTolerance(userData) {
  const {
    age = 28,
    monthlyIncome = 85000,
    essentialExpenses = 35000,
    emiPayments = 20000,
    emergencyFundAmount = 330000,
    dependents = 0,
    investmentHorizonYears = 10,
  } = userData

  // Calculate monthly emergency fund contribution
  const targetEmergencyFund = (essentialExpenses + emiPayments) * 6
  const emergencyFundMonths = emergencyFundAmount / (essentialExpenses + emiPayments)
  const emergencyFundMonthly = emergencyFundAmount >= targetEmergencyFund ? 0 : 5000

  // Calculate surplus
  const surplus = calculateSurplus({
    monthlyIncome,
    essentialExpenses,
    emiPayments,
    emergencyFundMonthly,
  })

  // Calculate equity allocation based on age
  const equityAllocationPercent = calculateEquityAllocation(age)

  // Calculate risk capital
  const riskCapital = calculateRiskCapital({
    annualSurplus: surplus.annualSurplus,
    equityAllocationPercent,
  })

  // Calculate risk tolerance score
  const riskScore = calculateRiskToleranceScore({
    age,
    monthlyIncome,
    monthlySurplus: surplus.monthlySurplus,
    dependents,
    emergencyFundMonths,
    investmentHorizonYears,
  })

  // Get risk profile
  const riskProfile = getRiskProfile(riskScore)

  // Get asset allocation
  const allocation = getAssetAllocation(equityAllocationPercent)

  return {
    riskScore,
    riskProfile,
    surplus,
    equityAllocationPercent,
    riskCapital,
    allocation,
    emergencyFundCoverage: emergencyFundMonths.toFixed(1),
    targetEmergencyFund,
  }
}
