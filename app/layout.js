import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FinTrack | Your AI Personal Finance Assistant',
  description: 'Comprehensive AI-powered personal finance platform for Indians. Get expert guidance on investments, tax planning, wealth management, and financial goal achievement.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
