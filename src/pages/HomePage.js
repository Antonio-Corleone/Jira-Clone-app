import React from 'react';
import { useSelector } from 'react-redux'
import Main from '../templates/HomeTemplate/_components/Main'

export default function HomePage() {
  const { projectDetail } = useSelector(state => state.projectReducer);
  return (
    <Main data={projectDetail} />
  )
}
