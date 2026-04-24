import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 })
    }

    // Mocked registration success without DB
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ message: 'Registration failed.' }, { status: 500 })
  }
}
