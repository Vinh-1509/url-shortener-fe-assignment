import Header from './components/Header'
import QRPage from './components/QRPage'
import { useState } from 'react'

type ShortLink = {
  id: number
  originalUrl: string
  shortCode: string
  shortUrl: string
  createdAt: string
}

function App() {
  const [inputUrl, setInputUrl] = useState('')
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')

  function isValidUrl(value: string) {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  function generateShortCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  function handleShorten() {
    setError('')

    const trimmedUrl = inputUrl.trim()

    if (!trimmedUrl) {
      setError('Please enter a URL.')
      return
    }

    if (!isValidUrl(trimmedUrl)) {
      setError('Please enter a valid URL (include https://).')
      return
    }

    const code = generateShortCode()
    const generatedShortUrl = `${window.location.origin}/s/${code}`

    const newLink: ShortLink = {
      id: Date.now(),
      originalUrl: trimmedUrl,
      shortCode: code,
      shortUrl: generatedShortUrl,
      createdAt: new Date().toISOString(),
    }

    const existingLinks: ShortLink[] = JSON.parse(localStorage.getItem('shortLinks') || '[]')

    localStorage.setItem('shortLinks', JSON.stringify([newLink, ...existingLinks]))

    setOriginalUrl(trimmedUrl)
    setShortUrl(generatedShortUrl)
  }

  return (
    <div>
      <Header />

      <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#f5f5f7]">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#0B2A7B] text-center">
          Devcamp URL Shortener
        </h1>

        <p className="mt-4 text-lg md:text-2xl text-[#1E3A8A] text-center font-medium">
          Simplify, Organize, and Share: URL Management Made Easy
        </p>

        <div className="mt-10 w-full max-w-3xl bg-white rounded-2xl shadow-xl shadow-gray-300 p-6">
          <label htmlFor="url" className="block mb-4 text-lg md:text-xl font-bold text-[#0B2A7B]">
            Your Long URL
          </label>

          <div className="flex flex-col md:flex-row items-stretch gap-4">
            <div className="flex flex-1 items-center border border-gray-300 rounded-xl px-4 py-3 bg-white">
              <span className="text-[#0B2A7B] mr-3" aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L10 4" />
                  <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L14 20" />
                </svg>
              </span>

              <input
                id="url"
                type="text"
                value={inputUrl}
                onChange={e => setInputUrl(e.target.value)}
                placeholder="Input the URL you want to shorten"
                className="w-full outline-none text-sm md:text-base placeholder:text-gray-400"
              />
            </div>

            <button
              className="bg-[#0B2A7B] hover:bg-[#091f5d] text-white px-6 py-3 rounded-xl font-semibold transition"
              onClick={handleShorten}
            >
              Shorten
            </button>
          </div>

          {error && <p className="mt-4 text-sm md:text-base text-red-500 font-medium">{error}</p>}
        </div>
      </main>

      {shortUrl && (
        <QRPage
          shortUrl={shortUrl}
          originalUrl={originalUrl}
          onClose={() => {
            setShortUrl('')
            setOriginalUrl('')
          }}
        />
      )}
    </div>
  )
}

export default App
