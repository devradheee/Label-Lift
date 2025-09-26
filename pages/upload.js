import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Upload() {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [date, setDate] = useState('')
  const [genre, setGenre] = useState('')
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    const payload = { title, artist, releaseDate: date, genre, status: 'Uploaded' }
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    router.push('/dashboard')
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Upload Track</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input className="input w-full" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Artist</label>
            <input className="input w-full" value={artist} onChange={e => setArtist(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Release Date</label>
            <input className="input w-full" type="date" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Genre</label>
            <input className="input w-full" value={genre} onChange={e => setGenre(e.target.value)} />
          </div>
          <button className="btn btn-primary w-full" type="submit">Add Track</button>
        </form>
      </div>
    </div>
  )
}
