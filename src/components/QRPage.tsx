import { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

type QRProps = {
  shortUrl: string
  originalUrl: string
  onClose: () => void
}

function QRPage({ shortUrl, onClose }: QRProps) {
  const [copied, setCopied] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert('Failed to copy link.')
    }
  }

  function handleDownloadQR() {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return

    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = 'short-link-qr.png'
    link.click()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] px-4">
      <div className="relative w-full max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-700 hover:bg-white"
        >
          ✕
        </button>

        <div className="relative h-44 bg-[#0B2A7B]">
          <div className="absolute left-5 top-8 opacity-30">
            <div className="relative h-12 w-12">
              <span className="absolute left-0 top-0 h-4 w-4 border-l-4 border-t-4 border-white"></span>
              <span className="absolute right-0 top-0 h-4 w-4 border-r-4 border-t-4 border-white"></span>
              <span className="absolute left-0 bottom-0 h-4 w-4 border-l-4 border-b-4 border-white"></span>
              <span className="absolute right-0 bottom-0 h-4 w-4 border-r-4 border-b-4 border-white"></span>
            </div>
          </div>

          <div className="absolute right-6 top-16 opacity-30">
            <div className="relative h-12 w-12">
              <span className="absolute left-0 top-0 h-4 w-4 border-l-4 border-t-4 border-white"></span>
              <span className="absolute right-0 top-0 h-4 w-4 border-r-4 border-t-4 border-white"></span>
              <span className="absolute left-0 bottom-0 h-4 w-4 border-l-4 border-b-4 border-white"></span>
              <span className="absolute right-0 bottom-0 h-4 w-4 border-r-4 border-b-4 border-white"></span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-16 w-full bg-white [clip-path:polygon(0_40%,100%_0,100%_100%,0_100%)]"></div>
        </div>

        <div className="absolute left-1/2 top-[34px] z-10 -translate-x-1/2">
          <div ref={qrRef} className="rounded-2xl bg-white p-4 shadow-xl border border-gray-100">
            <QRCodeCanvas
              value={shortUrl}
              size={160}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={false}
            />
          </div>

          <button
            onClick={handleDownloadQR}
            className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B2A7B] text-white shadow-lg hover:bg-[#091f5d] transition"
            title="Download QR"
          >
            ↓
          </button>
        </div>

        <div className="px-6 pb-6 pt-24 text-center">
          <h2 className="text-2xl font-extrabold text-[#0B2A7B]">Link shortened!</h2>

          <p className="mt-2 text-sm text-[#1E3A8A] leading-relaxed">
            Access the “My URL” page to view statistics
            <br />
            on your shortened links
          </p>

          <div className="mt-6 flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 rounded-xl border border-[#0B2A7B] px-4 py-3 text-sm text-[#0B2A7B] outline-none bg-white"
            />

            <button
              onClick={handleCopy}
              className="flex h-[50px] w-[50px] items-center justify-center rounded-xl bg-[#0B2A7B] text-white hover:bg-[#091f5d] transition"
              title="Copy short URL"
            >
              {copied ? '✓' : '⧉'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRPage
