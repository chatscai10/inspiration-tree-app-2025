import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Layout
import MobileLayout from './components/layout/MobileLayout'

// Pages
import HomePage from './pages/HomePage'
import InspirationDetail from './pages/InspirationDetail'
import TreeView from './pages/TreeView'
import AIAnalysis from './pages/AIAnalysis'
import Settings from './pages/Settings'
import InspirationFeedPage from './pages/InspirationFeedPage'
import RandomSparkPage from './pages/RandomSparkPage'
import UnrestrictedModePage from './pages/UnrestrictedModePage'

// Providers
import { SupabaseProvider } from './utils/supabase'
import { InspirationProvider } from './hooks/useInspiration'
import { LocalInspirationProvider } from './hooks/useLocalInspiration'

function App() {
  return (
    <SupabaseProvider>
      <InspirationProvider>
        <LocalInspirationProvider>
          <div className="App h-screen overflow-hidden bg-gray-50">
            <MobileLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tree" element={<TreeView />} />
                <Route path="/inspiration/:id" element={<InspirationDetail />} />
                <Route path="/ai-analysis" element={<AIAnalysis />} />
                <Route path="/inspiration-feed" element={<InspirationFeedPage />} />
                <Route path="/random-spark" element={<RandomSparkPage />} />
                <Route path="/unrestricted-mode" element={<UnrestrictedModePage />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </MobileLayout>
          </div>
        </LocalInspirationProvider>
      </InspirationProvider>
    </SupabaseProvider>
  )
}

export default App