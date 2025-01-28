import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "../contexts/AuthContext"
import Header from "../components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Telegram Forum",
  description: "Share your favorite Telegram channels and groups",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main>
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

