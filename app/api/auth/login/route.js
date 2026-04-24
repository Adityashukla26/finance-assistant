import { NextResponse } from 'next/server'
import { createSessionToken, getSessionCookieName, getSessionCookieOptions } from '../_lib/session'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 })
    }

    const token = createSessionToken({ userId: 'dummy_id', email })
    const response = NextResponse.json({
      user: { id: 'dummy_id', email, name: email.split('@')[0] },
    })
    response.cookies.set(getSessionCookieName(), token, getSessionCookieOptions())
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Login failed.' }, { status: 500 })
  }
}
