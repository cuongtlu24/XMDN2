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

import React from "react"
import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({ 
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#052c24',
}

// Cấu hình Metadata chính xác
export const metadata: Metadata = {
  title: {
    // %s sẽ được thay thế bằng tên dự án lấy từ Sheets (nếu bạn dùng document.title ở page.tsx)
    template: '%s | Star Hills Lộc An', 
    default: 'Star Hills Lộc An | Bất Động Sản Nghỉ Dưỡng', 
  },
  description: 'Chuyên trang bất động sản nghỉ dưỡng Star Hills Lộc An, pháp lý minh bạch, sổ hồng riêng, công chứng ngay.',
  
  // Thay đổi generator thành domain chính của hệ thống bạn
  generator: 'constructionxuandinh.sbs', 
  
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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={beVietnamPro.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
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
