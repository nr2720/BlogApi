import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const Greetings = () => {
    return <h1>Whats up fuckers</h1>
  }

  return (
    <>
      < Greetings />
      <Link to='feed'>Go to profile</Link>
    </>
  )
}

export default App
