import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard() {
  const [tracks, setTracks] = useState([])
  const [q, setQ] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracks`).then(r => r.json()).then(data => setTracks(data))
  }, [])

  function logout() {
    if (typeof window !== 'undefined') localStorage.removeItem('session')
    router.push('/')
  }

  const filtered = tracks.filter(t =>
    t.title.toLowerCase().includes(q.toLowerCase()) ||
    t.artist.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="space-x-2">
          <Link href="/upload" className="btn btn-primary">Upload Track</Link>
          <button className="btn bg-gray-200 hover:bg-gray-300" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="mb-4">
        <input className="input w-full" placeholder="Search by title or artist" value={q} onChange={e => setQ(e.target.value)} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr><th className="px-4 py-2 text-left">Title</th><th className="px-4 py-2 text-left">Artist</th><th className="px-4 py-2 text-left">Release Date</th><th className="px-4 py-2 text-left">Status</th></tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2"><Link href={`/track/${t.id}`} className="link">{t.title}</Link></td>
                <td className="px-4 py-2">{t.artist}</td>
                <td className="px-4 py-2">{t.releaseDate}</td>
                <td className="px-4 py-2">{t.status}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td className="px-4 py-3" colSpan="4">No tracks found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
