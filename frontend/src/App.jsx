import { useState } from 'react'
import { Link } from "react-router-dom";
import './index.css'

import { MacbookScroll } from "./components/ui/macbook-scroll";


function App() {
  return (
    <main className='text-4xl font-bold'>

      <MacbookScroll />
    </main>
  )
}

export default App
