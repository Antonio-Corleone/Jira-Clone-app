import React from 'react'
import MainContent from './MainContent'
import MainInfo from './MainInfo'
import MainHeader from './MainHeader'

export default function Main() {
  return (
    <div className="main">
      <MainHeader />
      <h3>Cyber Board</h3>
      <MainInfo />
      <MainContent />
    </div>
  )
}
