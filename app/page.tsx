"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import PostForm from "../components/PostForm"
import EntryList from "../components/EntryList"
import SEO from "../components/SEO"

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)
  const { user, loading } = useAuth()

  const handlePostSuccess = () => {
    setRefreshKey((prevKey) => prevKey + 1)
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Discover Telegram Channels and Groups</h2>
          <EntryList key={refreshKey} />
        </div>
      </div>
    </>
  )
}

