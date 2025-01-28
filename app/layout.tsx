import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "../contexts/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SEO from "../components/SEO"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Telegram Forum",
  description: "Share and discover the best Telegram channels and groups",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""

  return (
    <html lang="en">
      <SEO
        title={metadata.title}
        description={metadata.description}
        keywords="telegram, forum, channels, groups, community"
      />
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <AuthProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
          <Footer />
        </AuthProvider>
        <Analytics/>
      </body>
    </html>
  )
}

