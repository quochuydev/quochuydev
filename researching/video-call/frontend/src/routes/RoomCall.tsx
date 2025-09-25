import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function RoomCall() {
  const { id } = useParams<{ id: string }>()
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)

  // Read token from query string
  useEffect(() => {
    const qs = new URLSearchParams(window.location.search)
    const t = qs.get('token')
    if (!t) {
      setError('Missing token in URL (?token=...)')
    } else {
      setToken(t)
    }
  }, [])

  // Simple local media preview (no signaling yet)
  useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      } catch (e: any) {
        setError(e?.message || 'Unable to access camera/microphone')
      }
    }
    getMedia()
  }, [])

  const roomLabel = useMemo(() => id ?? 'unknown', [id])

  return (
    <div style={{ padding: 24 }}>
      <h1>Room {roomLabel}</h1>
      {!error && !token && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginTop: 16 }}>
        <div style={{ background: '#111', borderRadius: 8, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
          <video ref={localVideoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 8, left: 8, color: '#fff', fontSize: 12 }}>You</div>
        </div>
        {/* Remote tiles will be added after signaling is wired */}
      </div>
    </div>
  )
}
