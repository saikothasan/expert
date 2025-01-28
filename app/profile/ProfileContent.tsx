"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../lib/supabase-client"
import type { User } from "../../types/forum"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useSearchParams } from "next/navigation"

export default function ProfileContent() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user!.id).single()

    if (error) {
      console.error("Error fetching profile:", error)
    } else {
      setProfile(data)
      setUsername(data.username || "")
      setBio(data.bio || "")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from("profiles").upsert({ id: user!.id, username, bio })

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Your profile has been updated.",
      })
      fetchProfile()
    }
  }

  if (!user) {
    return <div>Please sign in to view your profile.</div>
  }

  // Example of using searchParams (you can remove this if not needed)
  const tab = searchParams.get("tab")

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input id="email" type="email" value={user.email} disabled className="mt-1" />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-1" />
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
        {tab && <p className="mt-4">Current tab: {tab}</p>}
      </div>
    </div>
  )
}

