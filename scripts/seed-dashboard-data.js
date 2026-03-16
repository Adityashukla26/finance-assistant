// Seed script to populate MongoDB with sample dashboard data
// Run: node scripts/seed-dashboard-data.js

require('dotenv').config({ path: '.env.local' })
const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env.local')
  process.exit(1)
}

const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'demo123',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'demo123',
  },
]

const sampleAccountData = [
  {
    userEmail: 'john@example.com',
    netWorth: 247850,
    wellness: 82,
    cashFlow: 8240,
    goals: [
      { title: 'Emergency Fund', target: 15000, current: 12350 },
      { title: 'Home Down Payment', target: 50000, current: 28750 },
      { title: 'Retirement Fund', target: 500000, current: 182400 },
    ],
    investments: [
      { label: 'Stocks', value: 45 },
      { label: 'Bonds', value: 20 },
      { label: 'Real Estate', value: 15 },
      { label: 'Cryptocurrency', value: 10 },
      { label: 'Cash', value: 10 },
    ],
    expenses: [
      { label: 'Housing', value: 35 },
      { label: 'Transportation', value: 15 },
      { label: 'Food', value: 20 },
      { label: 'Entertainment', value: 10 },
      { label: 'Utilities', value: 12 },
      { label: 'Other', value: 8 },
    ],
    transactions: [
      { date: '2026-02-20', description: 'Salary Deposit', amount: 5000, type: 'income' },
      { date: '2026-02-19', description: 'Rent Payment', amount: -1500, type: 'expense' },
      { date: '2026-02-18', description: 'Groceries', amount: -120, type: 'expense' },
      { date: '2026-02-17', description: 'Investment Purchase', amount: -2000, type: 'investment' },
    ],
  },
  {
    userEmail: 'jane@example.com',
    netWorth: 185200,
    wellness: 75,
    cashFlow: 6800,
    goals: [
      { title: 'Emergency Fund', target: 10000, current: 8500 },
      { title: 'Car Purchase', target: 30000, current: 15000 },
      { title: 'Vacation Fund', target: 5000, current: 3200 },
    ],
    investments: [
      { label: 'Stocks', value: 50 },
      { label: 'Bonds', value: 25 },
      { label: 'Real Estate', value: 10 },
      { label: 'Cryptocurrency', value: 5 },
      { label: 'Cash', value: 10 },
    ],
    expenses: [
      { label: 'Housing', value: 30 },
      { label: 'Transportation', value: 20 },
      { label: 'Food', value: 18 },
      { label: 'Entertainment', value: 12 },
      { label: 'Utilities', value: 10 },
      { label: 'Other', value: 10 },
    ],
    transactions: [
      { date: '2026-02-21', description: 'Freelance Payment', amount: 3500, type: 'income' },
      { date: '2026-02-20', description: 'Rent Payment', amount: -1200, type: 'expense' },
      { date: '2026-02-19', description: 'Groceries', amount: -95, type: 'expense' },
    ],
  },
]

async function seed() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log('✅ Connected to MongoDB')

    const db = client.db()
    const usersCollection = db.collection('users')
    const accountsCollection = db.collection('accountsData')

    // Clear existing data
    await usersCollection.deleteMany({})
    await accountsCollection.deleteMany({})
    console.log('🧹 Cleared existing data')

    // Insert sample users
    for (const userData of sampleUsers) {
      const passwordHash = await bcrypt.hash(userData.password, 10)
      await usersCollection.insertOne({
        name: userData.name,
        email: userData.email,
        passwordHash,
        createdAt: new Date(),
        lastLoginAt: null,
      })
      console.log(`👤 Created user: ${userData.email}`)
    }

    // Insert sample account data
    for (const accountData of sampleAccountData) {
      await accountsCollection.insertOne(accountData)
      console.log(`💰 Created account data for: ${accountData.userEmail}`)
    }

    console.log('\n✨ Seeding complete!')
    console.log('\n📋 Sample credentials:')
    sampleUsers.forEach((user) => {
      console.log(`   Email: ${user.email}`)
      console.log(`   Password: ${user.password}`)
      console.log('')
    })
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

seed()
