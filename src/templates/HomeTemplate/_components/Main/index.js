import React from 'react'
import MainContent from './MainContent'
import MainInfo from './MainInfo'
import MainHeader from './MainHeader'

export default function Main(props) {
  const { data } = props;

  return (
    <div className="main">
      <MainHeader projectName={data.projectName} />

      <MainInfo projectDetail={data} />

      <MainContent projectDetail={data} />
    </div>
  )
}
