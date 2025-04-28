import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white fixed w-full z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <i className="text-3xl mr-2">📄</i>
            <span className="text-2xl font-bold">AutoDocs</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#features" className="hover:text-blue-200 transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-200 transition">How It Works</a></li>
              <li><a href="#benefits" className="hover:text-blue-200 transition">Benefits</a></li>
              <li><Link href="/contact-us" className="hover:text-blue-200 transition">Contact</Link></li>
              <li><a href="#aboutus" className="hover:text-blue-200 transition">About Us</a></li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <Link href="/login" className="px-4 py-2 text-purple-700 bg-white rounded-md font-medium hover:bg-gray-100 transition">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-slate-800 rounded-md font-medium hover:bg-gray-800 transition">Sign Up</Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
