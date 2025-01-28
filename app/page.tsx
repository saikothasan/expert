"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import PostForm from "../components/PostForm"
import EntryList from "../components/EntryList"

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
    <div className="space-y-8">
      {user && (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Post a new Telegram channel or group</h2>
            <PostForm onPostSuccess={handlePostSuccess} />
          </div>
        </div>
      )}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Telegram Channels and Groups</h2>
        <EntryList key={refreshKey} />
      </div>
    </div>
  )
}

