"use client"

import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"
import { signOut } from "../lib/supabase-client"
import { Button } from "@/components/ui/button"

export default function Header() {
  const { user, loading } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          <Link href="/">Telegram Forum</Link>
        </h1>
        <nav>
          {!loading &&
            (user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile">
                  <Button variant="outline">Profile</Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link href="/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            ))}
        </nav>
      </div>
    </header>
  )
}

