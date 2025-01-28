import { Suspense } from "react"
import ProfileContent from "./ProfileContent"
import { Skeleton } from "@/components/ui/skeleton"
import SEO from "../../components/SEO"

export default function ProfilePage() {
  return (
    <>
      <SEO
        title="Your Profile"
        description="Manage your Telegram Forum profile and settings."
        keywords="profile, settings, account, telegram forum"
      />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileContent />
        </Suspense>
      </div>
    </>
  )
}

function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-10 w-[150px]" />
    </div>
  )
}

