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

// ✅ THÊM OPEN GRAPH META TAGS ĐẦY ĐỦ
export const metadata: Metadata = {
  title: {
    template: '%s | Hệ Thống BĐS', 
    default: 'Hệ Thống Bất Động Sản Cao Cấp', 
  },
  description: 'Chuyên trang bất động sản nghỉ dưỡng, pháp lý minh bạch, sổ hồng riêng.',
  generator: 'constructionxuandinh.sbs',
  
  // ✅ OPEN GRAPH META TAGS
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://10thhouselegacyinc.bmverification.com/',
    siteName: 'Hệ Thống Bất Động Sản Cao Cấp',
    title: 'Hệ Thống Bất Động Sản Cao Cấp',
    description: 'Chuyên trang bất động sản nghỉ dưỡng, pháp lý minh bạch, sổ hồng riêng.',
    images: [
      {
        url: 'https://10thhouselegacyinc.bmverification.com/images/villa-garden.jpg',
        width: 1200,
        height: 630,
        alt: '10th House Legacy Inc. - Premium Real Estate',
      }
    ],
  },
  
  // ✅ TWITTER CARD
  twitter: {
    card: 'summary_large_image',
    title: 'Hệ Thống Bất Động Sản Cao Cấp',
    description: 'Chuyên trang bất động sản nghỉ dưỡng, pháp lý minh bạch, sổ hồng riêng.',
    images: ['https://10thhouselegacyinc.bmverification.com/images/villa-garden.jpg'],
  },
  
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  
  // ✅ THÊM CANONICAL URL
  alternates: {
    canonical: 'https://10thhouselegacyinc.bmverification.com/',
  },
  
  // ✅ ROBOTS META
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${beVietnamPro.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
