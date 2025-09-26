let tracks = [
  { id: '1', title: 'Sunrise', artist: 'A. Artist', releaseDate: '2024-01-10', genre: 'Pop', status: 'Released' },
  { id: '2', title: 'Midnight Drive', artist: 'B. Band', releaseDate: '2024-05-21', genre: 'Electronic', status: 'Released' },
  { id: '3', title: 'Ocean Eyes', artist: 'C. Creator', releaseDate: '2025-02-14', genre: 'Indie', status: 'Uploaded' },
]

function genId() {
  return String(Date.now() + Math.floor(Math.random() * 1000))
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query
    if (id) {
      const t = tracks.find(x => x.id === id)
      return res.status(200).json(t || null)
    }
    return res.status(200).json(tracks)
  } else if (req.method === 'POST') {
    const body = req.body
    const newTrack = {
      id: genId(),
      title: body.title || 'Untitled',
      artist: body.artist || '',
      releaseDate: body.releaseDate || '',
      genre: body.genre || '',
      status: body.status || 'Uploaded',
    }
    tracks = [newTrack, ...tracks]
    return res.status(201).json(newTrack)
  } else {
    res.status(405).end()
  }
}
