import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getDb } from '../../auth/_lib/mongodb'
import { getSessionCookieName, verifySessionToken } from '../../auth/_lib/session'

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(getSessionCookieName())?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifySessionToken(token)
    const db = await getDb()
    const accounts = db.collection('accountsData')

    const accountData = await accounts.findOne({ userEmail: payload.email })

    if (!accountData) {
      // Net Worth = Wallet (46,730) + Investments (180,000) + Savings (21,120) = 247,850
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
    }

    return NextResponse.json({
      netWorth: accountData.netWorth || 247850,
      wellness: accountData.wellness || 82,
      cashFlow: accountData.cashFlow || 12500,
      totalBalance: accountData.totalBalance || 46730,
      totalInvestments: accountData.totalInvestments || 180000,
      totalExpenses: accountData.totalExpenses || 28450,
      monthlyIncome: accountData.monthlyIncome || 85000,
      // Risk Tolerance Fields
      age: accountData.age || 28,
      essentialExpenses: accountData.essentialExpenses || 35000,
      emiPayments: accountData.emiPayments || 20000,
      emergencyFundAmount: accountData.emergencyFundAmount || 330000,
      dependents: accountData.dependents || 0,
      investmentHorizonYears: accountData.investmentHorizonYears || 10,
      goals: accountData.goals || [],
      investments: accountData.investments || [],
      expenses: accountData.expenses || [],
      transactions: accountData.transactions || [],
    })
  } catch (error) {
    console.error('Account data fetch error:', error)
    return NextResponse.json({ message: 'Failed to fetch account data.' }, { status: 500 })
  }
}
