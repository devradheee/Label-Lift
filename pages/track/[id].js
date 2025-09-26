import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function TrackDetail() {
  const router = useRouter()
  const { id } = router.query
  const [track, setTrack] = useState(null)

  useEffect(() => {
    if (!id) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracks?id=${id}`).then(r => r.json()).then(data => setTrack(data || null))
  }, [id])

  if (!track) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{track.title}</h2>
        <Link href="/dashboard" className="btn bg-gray-200 hover:bg-gray-300">Back</Link>
      </div>
      <div className="card space-y-2">
        <p><strong>Artist:</strong> {track.artist}</p>
        <p><strong>Release Date:</strong> {track.releaseDate}</p>
        <p><strong>Genre:</strong> {track.genre}</p>
        <p><strong>Status:</strong> {track.status}</p>
      </div>
    </div>
  )
}
