import React from 'react'
import { useLocation } from 'react-router-dom'
import MobileHeader from './MobileHeader'
import MobileNavigation from './MobileNavigation'
import QuickActionButton from '../ui/QuickActionButton'

const MobileLayout = ({ children }) => {
  const location = useLocation()
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 safe-area-inset">
      {/* 頂部導航 */}
      <MobileHeader />
      
      {/* 主要內容區 */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      
      {/* 快速操作按鈕 */}
      <QuickActionButton />
      
      {/* 底部導航 */}
      <MobileNavigation />
    </div>
  )
}

export default MobileLayout