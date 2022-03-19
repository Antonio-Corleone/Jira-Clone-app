import React from 'react'

export default function Loading() {
  return (
    <div 
      className="d-flex justify-content-center align-items-center"
      style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255,0.5)',
        zIndex:'100'
      }}
    >
      <div>
        loading...
      </div>
    </div>
  )
}
