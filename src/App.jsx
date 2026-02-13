import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'

export default function App() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [aiOptimizationEnabled, setAiOptimizationEnabled] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar activeItem={activeItem} onSelect={setActiveItem} />
        <MainContent
          activeItem={activeItem}
          aiOptimizationEnabled={aiOptimizationEnabled}
          onAiOptimizationChange={setAiOptimizationEnabled}
        />
      </div>
    </div>
  )
}
