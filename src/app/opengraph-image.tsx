import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Mahmoud Attia | Full-Stack Developer'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: '#030014',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'monospace',
        }}
      >
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40,
                padding: '20px 40px',
                border: '2px solid rgba(139, 92, 246, 0.5)',
                borderRadius: 50,
                background: 'rgba(139, 92, 246, 0.1)',
            }}
        >
            MAHMOUD<span style={{ color: '#8b5cf6' }}>.DEV</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
                backgroundImage: 'linear-gradient(90deg, #a78bfa, #22d3ee)', 
                backgroundClip: 'text', 
                color: 'transparent',
                fontSize: 80,
                fontWeight: 'bold',
                marginBottom: 20
            }}>
                Scalable Systems
            </div>
            <div style={{ color: '#a1a1aa', fontSize: 30 }}>
                Architecting High-Performance Solutions
            </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
