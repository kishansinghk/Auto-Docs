'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }

  useEffect(() => {
    // Check initial login status
    checkLoginStatus()

    // Add event listener for storage changes
    window.addEventListener('storage', checkLoginStatus)

    // Add custom event listener for login state changes
    window.addEventListener('loginStateChanged', checkLoginStatus)

    return () => {
      window.removeEventListener('storage', checkLoginStatus)
      window.removeEventListener('loginStateChanged', checkLoginStatus)
    }
  }, [])

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)

    toast.success('Logged out successfully!', {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#063970",
        color: "#fff",
      },
    })

    router.push('/')
  }

  return (
    <nav className="fixed w-full shadow-2xl z-50 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <i className="text-3xl mr-2">📄</i>
          <span className="text-2xl font-bold text-white">AutoDocs</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {/* <Link href="/tools" className="text-white/90 hover:text-white">Tools</Link> */}

          {isLoggedIn && (
            <Link href="/user/uploadCode" className="text-white/90 hover:text-white">Upload Code</Link>
          )}
          <Link href="/contact-us" className="text-white/90 hover:text-white">Contact Us</Link>
          <Link href="/about-us" className="text-white/90 hover:text-white">About Us</Link>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/user/profile"
                className="px-4 py-2 rounded-md font-medium bg-white text-blue-700 hover:bg-gray-50"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md font-medium bg-white text-purple-700 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
