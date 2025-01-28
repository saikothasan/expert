"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase-client"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function PostForm({ onPostSuccess }: { onPostSuccess: () => void }) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [type, setType] = useState<"channel" | "group">("channel")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post a new entry.",
        variant: "destructive",
      })
      return
    }

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")

    const { error } = await supabase
      .from("telegram_entries")
      .insert({ title, url, type, description, user_id: user.id, tags: tagArray })

    if (error) {
      console.error("Error inserting data:", error)
      toast({
        title: "Error",
        description: "Failed to post the entry. Please try again.",
        variant: "destructive",
      })
    } else {
      setTitle("")
      setUrl("")
      setType("channel")
      setDescription("")
      setTags("")
      onPostSuccess()
      toast({
        title: "Success",
        description: "Your entry has been posted successfully.",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Telegram URL" required />
      <Select value={type} onValueChange={(value: "channel" | "group") => setType(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="channel">Channel</SelectItem>
          <SelectItem value="group">Group</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <Input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma-separated)" />
      <Button type="submit">Post</Button>
    </form>
  )
}

