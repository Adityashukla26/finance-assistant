import { NextResponse } from 'next/server'
import { getSessionCookieName } from '../_lib/session'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(getSessionCookieName(), '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  })
  return response
}
