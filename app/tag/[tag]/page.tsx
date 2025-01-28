'use client'

import { useParams } from 'next/navigation'
import EntryList from '../../../components/EntryList'
import SEO from '../../../components/SEO'

export default function TagPage() {
  const params = useParams()
  const tag = params.tag as string

  return (
    <>
      <SEO
        title={`Entries tagged with "${tag}"`}
        description={`Discover Telegram channels and groups tagged with "${tag}" on our forum.`}
        keywords={`${tag}, telegram, forum, channels, groups, community`}
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Entries tagged with &quot;{tag}&quot;</h1>
        <EntryList tag={tag} />
      </div>
    </>
  )
}
