export interface TelegramEntry {
  id: number
  created_at: string
  title: string
  url: string
  type: "channel" | "group"
  description: string
  user_id: string
  views: number
  tags: string[]
  average_rating: number | null
}

export interface User {
  id: string
  username: string
  email?: string
  bio?: string
}

export interface Comment {
  id: number
  created_at: string
  entry_id: number
  user_id: string
  content: string
  user: User
}

export interface Rating {
  id: number
  created_at: string
  entry_id: number
  user_id: string
  rating: number
}

export interface Bookmark {
  id: number
  created_at: string
  entry_id: number
  user_id: string
}

export type SortOption = "newest" | "oldest" | "most_popular" | "highest_rated"

