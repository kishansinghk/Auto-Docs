import Navbar from '@/components/Navbar'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className='pt-16'>
          {children}
        </div>
      </body>
    </html>
  )
}