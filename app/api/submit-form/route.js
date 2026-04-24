import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const formData = await request.json()
    // Dummy success to remove Google Sheets dependency
    return NextResponse.json({ 
      success: true, 
      message: 'Form data successfully submitted (Mocked)',
      sheetResponse: { updates: { updatedRows: 1 } }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit form data',
        error: error.message 
      },
      { status: 500 }
    )
  }
}
