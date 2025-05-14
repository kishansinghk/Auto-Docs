import Navbar from '@/components/Navbar'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'AutoDocs - AI Documentation Generator',
  description: 'Automatically generate documentation for your code using AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Toaster position='top-right' />
        <div className='pt-16'>
          {children}
        </div>
      </body>
    </html>
  )
}