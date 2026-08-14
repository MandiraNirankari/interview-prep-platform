import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <nav className="border-b border-gray-800 bg-gray-950">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl font-bold text-white"
        >
          Interview Prep
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-6 md:flex">

          <Link
            to="/"
            className="text-sm text-gray-300 hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/dsa"
            className="text-sm text-gray-300 hover:text-white"
          >
            DSA
          </Link>

          <Link
            to="/mock-interview"
            className="text-sm text-gray-300 hover:text-white"
          >
            Mock Interview
          </Link>

          <Link
            to="/progress"
            className="text-sm text-gray-300 hover:text-white"
          >
            Progress
          </Link>

          {user?.name && (
            <span className="text-sm text-gray-400">
              Hi, {user.name}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-200"
          >
            Logout
          </button>

        </div>

        {/* Mobile Button */}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="rounded-lg border border-gray-700 px-3 py-2 text-white md:hidden"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* Mobile Navigation */}

      {menuOpen && (
        <div className="border-t border-gray-800 px-6 py-4 md:hidden">

          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={closeMenu}
              className="text-gray-300 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/dsa"
              onClick={closeMenu}
              className="text-gray-300 hover:text-white"
            >
              DSA
            </Link>

            <Link
              to="/mock-interview"
              onClick={closeMenu}
              className="text-gray-300 hover:text-white"
            >
              Mock Interview
            </Link>

            <Link
              to="/progress"
              onClick={closeMenu}
              className="text-gray-300 hover:text-white"
            >
              Progress
            </Link>

            {user?.name && (
              <span className="text-sm text-gray-500">
                Hi, {user.name}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black"
            >
              Logout
            </button>

          </div>

        </div>
      )}

    </nav>
  )
}

export default Navbar