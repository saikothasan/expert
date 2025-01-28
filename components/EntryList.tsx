"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase-client"
import type { TelegramEntry, SortOption, Comment, Rating, Bookmark } from "../types/forum"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Star, BookmarkIcon } from "lucide-react"

const ITEMS_PER_PAGE = 10

export default function EntryList() {
  const [entries, setEntries] = useState<TelegramEntry[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [sortOption, setSortOption] = useState<SortOption>("newest")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingEntry, setEditingEntry] = useState<TelegramEntry | null>(null)
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({})
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({})
  const [ratings, setRatings] = useState<{ [key: number]: Rating | null }>({})
  const [bookmarks, setBookmarks] = useState<{ [key: number]: Bookmark | null }>({})
  const { user } = useAuth()

  useEffect(() => {
    fetchEntries()
  }, [page, sortOption, searchTerm]) //This line was already correct.  The comment in the updates was unnecessary.

  const fetchEntries = async () => {
    let query = supabase.from("telegram_entries").select("*")

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    }

    switch (sortOption) {
      case "oldest":
        query = query.order("created_at", { ascending: true })
        break
      case "most_popular":
        query = query.order("views", { ascending: false })
        break
      case "highest_rated":
        query = query.order("average_rating", { ascending: false })
        break
      default:
        query = query.order("created_at", { ascending: false })
    }

    query = query.range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)

    const { data, error } = await query

    if (error) {
      console.error("Error fetching entries:", error)
    } else {
      setEntries((prevEntries) =>
        page === 1 ? (data as TelegramEntry[]) : [...prevEntries, ...(data as TelegramEntry[])],
      )
      setHasMore(data.length === ITEMS_PER_PAGE)
      fetchCommentsRatingsAndBookmarks(data as TelegramEntry[])
    }
  }

  const fetchCommentsRatingsAndBookmarks = async (entries: TelegramEntry[]) => {
    const entryIds = entries.map((entry) => entry.id)

    // Fetch comments
    const { data: commentsData, error: commentsError } = await supabase
      .from("comments")
      .select("*, user:profiles(*)")
      .in("entry_id", entryIds)
      .order("created_at", { ascending: false })

    if (commentsError) {
      console.error("Error fetching comments:", commentsError)
    } else {
      const groupedComments = commentsData.reduce(
        (acc, comment) => {
          if (!acc[comment.entry_id]) {
            acc[comment.entry_id] = []
          }
          acc[comment.entry_id].push(comment)
          return acc
        },
        {} as { [key: number]: Comment[] },
      )
      setComments(groupedComments)
    }

    // Fetch ratings
    if (user) {
      const { data: ratingsData, error: ratingsError } = await supabase
        .from("ratings")
        .select("*")
        .in("entry_id", entryIds)
        .eq("user_id", user.id)

      if (ratingsError) {
        console.error("Error fetching ratings:", ratingsError)
      } else {
        const groupedRatings = ratingsData.reduce(
          (acc, rating) => {
            acc[rating.entry_id] = rating
            return acc
          },
          {} as { [key: number]: Rating },
        )
        setRatings(groupedRatings)
      }

      // Fetch bookmarks
      const { data: bookmarksData, error: bookmarksError } = await supabase
        .from("bookmarks")
        .select("*")
        .in("entry_id", entryIds)
        .eq("user_id", user.id)

      if (bookmarksError) {
        console.error("Error fetching bookmarks:", bookmarksError)
      } else {
        const groupedBookmarks = bookmarksData.reduce(
          (acc, bookmark) => {
            acc[bookmark.entry_id] = bookmark
            return acc
          },
          {} as { [key: number]: Bookmark },
        )
        setBookmarks(groupedBookmarks)
      }
    }
  }

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const handleEdit = (entry: TelegramEntry) => {
    setEditingEntry(entry)
  }

  const handleSaveEdit = async () => {
    if (!editingEntry) return

    const { error } = await supabase
      .from("telegram_entries")
      .update({
        title: editingEntry.title,
        description: editingEntry.description,
        tags: editingEntry.tags,
      })
      .eq("id", editingEntry.id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update the entry. Please try again.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Entry updated successfully.",
      })
      setEditingEntry(null)
      fetchEntries()
    }
  }

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("telegram_entries").delete().eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete the entry. Please try again.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Entry deleted successfully.",
      })
      fetchEntries()
    }
  }

  const handleCommentSubmit = async (entryId: number) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to comment.",
        variant: "destructive",
      })
      return
    }

    const { data, error } = await supabase
      .from("comments")
      .insert({
        entry_id: entryId,
        user_id: user.id,
        content: newComment[entryId],
      })
      .select("*, user:profiles(*)")
      .single()

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    } else {
      setComments((prevComments) => ({
        ...prevComments,
        [entryId]: [data, ...(prevComments[entryId] || [])],
      }))
      setNewComment((prevNewComment) => ({
        ...prevNewComment,
        [entryId]: "",
      }))
    }
  }

  const handleRating = async (entryId: number, rating: number) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to rate.",
        variant: "destructive",
      })
      return
    }

    const { data, error } = await supabase
      .from("ratings")
      .upsert({
        entry_id: entryId,
        user_id: user.id,
        rating,
      })
      .select()
      .single()

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      })
    } else {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [entryId]: data,
      }))
      fetchEntries() // Refetch to update average rating
    }
  }

  const handleBookmark = async (entryId: number) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to bookmark.",
        variant: "destructive",
      })
      return
    }

    if (bookmarks[entryId]) {
      // Remove bookmark
      const { error } = await supabase.from("bookmarks").delete().eq("id", bookmarks[entryId]!.id)

      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove bookmark. Please try again.",
          variant: "destructive",
        })
      } else {
        setBookmarks((prevBookmarks) => {
          const newBookmarks = { ...prevBookmarks }
          delete newBookmarks[entryId]
          return newBookmarks
        })
      }
    } else {
      // Add bookmark
      const { data, error } = await supabase
        .from("bookmarks")
        .insert({
          entry_id: entryId,
          user_id: user.id,
        })
        .select()
        .single()

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add bookmark. Please try again.",
          variant: "destructive",
        })
      } else {
        setBookmarks((prevBookmarks) => ({
          ...prevBookmarks,
          [entryId]: data,
        }))
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search entries..."
          className="max-w-xs"
        />
        <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="most_popular">Most Popular</SelectItem>
            <SelectItem value="highest_rated">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {entries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader>
            <CardTitle>{entry.title}</CardTitle>
            <CardDescription>{entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}</CardDescription>
          </CardHeader>
          <CardContent>
            {editingEntry && editingEntry.id === entry.id ? (
              <div className="space-y-4">
                <Input
                  value={editingEntry.title}
                  onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
                />
                <Textarea
                  value={editingEntry.description}
                  onChange={(e) => setEditingEntry({ ...editingEntry, description: e.target.value })}
                />
                <Input
                  value={editingEntry.tags.join(", ")}
                  onChange={(e) =>
                    setEditingEntry({
                      ...editingEntry,
                      tags: e.target.value.split(",").map((tag) => tag.trim()),
                    })
                  }
                  placeholder="Tags (comma-separated)"
                />
                <Button onClick={handleSaveEdit}>Save</Button>
                <Button variant="outline" onClick={() => setEditingEntry(null)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-2">{entry.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {entry.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Join {entry.type}
                </a>
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 cursor-pointer ${
                          (ratings[entry.id]?.rating || 0) >= star ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                        onClick={() => handleRating(entry.id, star)}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {entry.average_rating ? entry.average_rating.toFixed(1) : "N/A"}
                    </span>
                  </div>
                  <BookmarkIcon
                    className={`w-5 h-5 cursor-pointer ${
                      bookmarks[entry.id] ? "text-blue-500 fill-current" : "text-gray-300"
                    }`}
                    onClick={() => handleBookmark(entry.id)}
                  />
                </div>
                {user && user.id === entry.user_id && (
                  <div className="mt-4 space-x-2">
                    <Button onClick={() => handleEdit(entry)} size="sm">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(entry.id)} variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                )}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Comments</h3>
                  {user && (
                    <div className="mb-4">
                      <Textarea
                        value={newComment[entry.id] || ""}
                        onChange={(e) => setNewComment({ ...newComment, [entry.id]: e.target.value })}
                        placeholder="Write a comment..."
                        className="mb-2"
                      />
                      <Button onClick={() => handleCommentSubmit(entry.id)}>Post Comment</Button>
                    </div>
                  )}
                  {comments[entry.id]?.map((comment) => (
                    <div key={comment.id} className="border-t pt-2 mt-2">
                      <p className="text-sm text-gray-600">
                        {comment.user.username} - {new Date(comment.created_at).toLocaleString()}
                      </p>
                      <p>{comment.content}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
      {hasMore && (
        <div className="flex justify-center">
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      )}
    </div>
  )
}

