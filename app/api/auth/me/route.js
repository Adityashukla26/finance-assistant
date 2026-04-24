import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionCookieName, verifySessionToken } from '../_lib/session'

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(getSessionCookieName())?.value

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const payload = verifySessionToken(token)

    // Mocked me route
    return NextResponse.json({
      user: { id: 'dummy_id', email: payload.email, name: payload.email.split('@')[0] },
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
