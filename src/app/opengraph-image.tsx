import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Mahmoud Attia | Mobile & Backend Developer'
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
          background: '#0A0F1A',
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
                border: '2px solid rgba(62, 123, 250, 0.5)',
                borderRadius: 50,
                background: 'rgba(62, 123, 250, 0.1)',
            }}
        >
              MAHMOUD<span style={{ color: '#3E7BFA' }}> ATTIA</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              backgroundImage: 'linear-gradient(90deg, #3E7BFA, #22d3ee)', 
                backgroundClip: 'text', 
                color: 'transparent',
              fontSize: 74,
                fontWeight: 'bold',
                marginBottom: 20
            }}>
              Bots, AI, Mobile
            </div>
            <div style={{ color: '#a1a1aa', fontSize: 30 }}>
              Available for Upwork projects
            </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
