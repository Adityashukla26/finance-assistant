import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDb } from '../_lib/mongodb'
import { createSessionToken, getSessionCookieName, getSessionCookieOptions } from '../_lib/session'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 })
    }

    const db = await getDb()
    const users = db.collection('users')
    const normalizedEmail = email.toLowerCase().trim()

    const user = await users.findOne({ email: normalizedEmail })

    if (!user) {
      return NextResponse.json({ message: 'Account not found. Please sign up.' }, { status: 404 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 })
    }

    await users.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } })

    const token = createSessionToken({ userId: user._id.toString(), email: user.email })
    const response = NextResponse.json({
      user: { id: user._id.toString(), email: user.email, name: user.name },
    })
    response.cookies.set(getSessionCookieName(), token, getSessionCookieOptions())
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Login failed.' }, { status: 500 })
  }
}
