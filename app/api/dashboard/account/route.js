import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionCookieName, verifySessionToken } from '../../auth/_lib/session'

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(getSessionCookieName())?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Mocked payload to skip DB
    return NextResponse.json({
      netWorth: 247850,
      wellness: 82,
      cashFlow: 12500,  // Monthly net savings
      totalBalance: 46730,  // Liquid cash in cards
      totalInvestments: 180000,
      totalExpenses: 28450,
      monthlyIncome: 85000,
      // Risk Tolerance Calculation Fields
      age: 28,
      essentialExpenses: 35000,  // Rent, utilities, groceries
      emiPayments: 20000,  // Loan EMIs
      emergencyFundAmount: 330000,  // 6 months coverage
      dependents: 0,
      investmentHorizonYears: 10,
      goals: [],
      investments: [],
      expenses: [],
      transactions: [],
    })
  } catch (error) {
    console.error('Account data fetch error:', error)
    return NextResponse.json({ message: 'Failed to fetch account data.' }, { status: 500 })
  }
}
