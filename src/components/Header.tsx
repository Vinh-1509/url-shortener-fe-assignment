import { useState } from 'react'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowDropdown(false)
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowDropdown(false)
  }

  return (
    <header className="bg-white py-4 px-6 md:px-12 flex justify-between items-center relative z-50 transition-all">
      <span className="text-2xl font-black text-[#0B2A7B] tracking-tight ml-2">
        Fessior DevCamp 2026
      </span>

      <div className="relative">
        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 bg-[#0B2A7B] hover:bg-[#071c52] text-white px-6 py-2 rounded-full font-bold transition shadow-lg shadow-blue-100"
          >
            Log in
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 pr-4 py-1.5 pl-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition shadow-sm"
            >
              <img
                src="https://avatars.githubusercontent.com/u/9919?v=4"
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover border border-gray-100"
              />
              <span className="font-bold text-[#0B2A7B]">Vinh Luong</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                <button
                  className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-50 text-left transition"
                  onClick={handleLogout}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0B2A7B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                  <span className="font-bold text-[#0B2A7B] text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
