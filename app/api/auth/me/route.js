import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getDb } from '../_lib/mongodb'
import { getSessionCookieName, verifySessionToken } from '../_lib/session'

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(getSessionCookieName())?.value

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const payload = verifySessionToken(token)
    const db = await getDb()
    const users = db.collection('users')
    const user = await users.findOne({ email: payload.email })

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({
      user: { id: user._id.toString(), email: user.email, name: user.name },
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
