import jwt from 'jsonwebtoken'

const TOKEN_NAME = 'zenith_session'
const TOKEN_TTL_DAYS = 7

export function createSessionToken(payload) {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('Missing JWT_SECRET in environment variables.')
  }

  return jwt.sign(payload, secret, { expiresIn: `${TOKEN_TTL_DAYS}d` })
}

export function verifySessionToken(token) {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('Missing JWT_SECRET in environment variables.')
  }

  return jwt.verify(token, secret)
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: TOKEN_TTL_DAYS * 24 * 60 * 60,
    path: '/',
  }
}

export function getSessionCookieName() {
  return TOKEN_NAME
}
