import React from "react"
import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react' // Sử dụng chuẩn react
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({ 
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: 'swap',
});

// Tách Viewport ra riêng theo chuẩn Next.js mới
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#052c24',
}

export const metadata: Metadata = {
  // Title template giúp các trang con tự động ghép tên khách hàng vào
  title: {
    template: '%s | Bất Động Sản',
    default: 'Hệ Thống Bất Động Sản Cao Cấp',
  },
  description: 'Chuyên trang bất động sản nghỉ dưỡng, pháp lý minh bạch, sổ hồng riêng.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${beVietnamPro.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
