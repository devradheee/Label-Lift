import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const router = useRouter()

  function submit(e) {
    e.preventDefault()
    if (user.trim()) {
      if (typeof window !== 'undefined') localStorage.setItem('session', JSON.stringify({ user }))
      router.push('/dashboard')
    } else {
      alert('Enter username')
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Music Dashboard Login</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input className="input w-full" value={user} onChange={e => setUser(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input className="input w-full" type="password" value={pass} onChange={e => setPass(e.target.value)} />
          </div>
          <button className="btn btn-primary w-full" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
