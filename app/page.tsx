"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import PostForm from "../components/PostForm"
import EntryList from "../components/EntryList"
import SEO from "../components/SEO"
import { supabase } from "../lib/supabase-client"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)
  const { user, loading } = useAuth()
  const [popularTags, setPopularTags] = useState<string[]>([])

  const handlePostSuccess = () => {
    setRefreshKey((prevKey) => prevKey + 1)
  }

  useEffect(() => {
    fetchPopularTags()
  }, [])

  const fetchPopularTags = async () => {
    const { data, error } = await supabase.from("telegram_entries").select("tags").limit(100)

    if (error) {
      console.error("Error fetching popular tags:", error)
    } else {
      const allTags = data.flatMap((entry) => entry.tags)
      const tagCounts = allTags.reduce(
        (acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const sortedTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag]) => tag)

      setPopularTags(sortedTags)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <SEO
        title="Home"
        description="Discover and share the best Telegram channels and groups on our forum."
        keywords="telegram, forum, channels, groups, community, social"
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Telegram Forum</h1>
        {user && (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Share a new Telegram channel or group</h2>
              <PostForm onPostSuccess={handlePostSuccess} />
            </div>
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Popular Tags</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {popularTags.map((tag) => (
              <Link href={`/tag/${tag}`} key={tag}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Discover Telegram Channels and Groups</h2>
          <EntryList key={refreshKey} />
        </div>
      </div>
    </>
  )
}

