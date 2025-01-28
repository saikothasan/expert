"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { supabase } from "../../lib/supabase-client"
import type { User } from "../../types/forum"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")

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

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input id="email" type="email" value={user.email} disabled />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  )
}

