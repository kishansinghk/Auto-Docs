import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata = {
  title: 'AutoDocs - AI Documentation Generator',
  description: 'Automatically generate documentation for your code using AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}