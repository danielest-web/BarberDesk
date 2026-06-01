import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Agenda from './pages/Agenda/Agenda'
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <TopHeader onNew={()=>{}} dateDisplay={new Date().toLocaleDateString()} />
        <Agenda />
      </div>
    </div>
  )
}

export default App
