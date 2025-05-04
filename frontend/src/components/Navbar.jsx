'use client'
import Link from 'next/link'

const  Navbar = () => {
  return (
    <nav className="fixed w-full shadow-2xl z-50 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <i className="text-3xl mr-2">📄</i>
          <span className="text-2xl font-bold text-white">AutoDocs</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/tools" className="text-white/90 hover:text-white">Tools</Link>
          <Link href="/contact-us" className="text-white/90 hover:text-white">Contact</Link>
          <Link href="/about-us" className="text-white/90 hover:text-white">About Us</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md font-medium bg-white text-purple-700 hover:bg-gray-50"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-4 py-2 rounded-md font-medium bg-gray-900 text-white hover:bg-gray-800"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
