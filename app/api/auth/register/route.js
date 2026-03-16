import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDb } from '../_lib/mongodb'

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 })
    }

    const db = await getDb()
    const users = db.collection('users')
    const normalizedEmail = email.toLowerCase().trim()

    const existing = await users.findOne({ email: normalizedEmail })
    if (existing) {
      return NextResponse.json({ message: 'An account with this email already exists.' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    await users.insertOne({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      createdAt: new Date(),
      lastLoginAt: null,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ message: 'Registration failed.' }, { status: 500 })
  }
}
