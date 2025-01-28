"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "../../lib/supabase-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import SEO from "../../components/SEO"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signIn(email, password)
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      router.push("/")
    }
  }

  return (
    <>
      <SEO
        title="Sign In"
        description="Sign in to your Telegram Forum account"
        keywords="sign in, login, telegram forum"
      />
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Sign In</h1>
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

