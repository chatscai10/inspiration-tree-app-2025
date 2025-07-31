import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Settings, Brain } from 'lucide-react'

const MobileHeader = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return '靈感心電圖'
      case '/tree':
        return '樹狀視圖'
      case '/ai-analysis':
        return 'AI 分析'
      case '/settings':
        return '設定'
      default:
        return '靈感詳情'
    }
  }
  
  const canGoBack = location.pathname !== '/'
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 pt-safe">
      <div className="flex items-center justify-between">
        {/* 左側 */}
        <div className="flex items-center space-x-3">
          {canGoBack ? (
            <button
              onClick={() => navigate(-1)}
              className="btn-touch bg-gray-100 p-2 rounded-full"
              aria-label="返回"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-primary-500" />
              <span className="text-lg font-semibold text-gray-900">
                {getTitle()}
              </span>
            </div>
          )}
        </div>
        
        {/* 中間標題 (僅在非首頁顯示) */}
        {canGoBack && (
          <h1 className="text-lg font-medium text-gray-900 flex-1 text-center">
            {getTitle()}
          </h1>
        )}
        
        {/* 右側操作 */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {/* 實作搜尋功能 */}}
            className="btn-touch bg-gray-100 p-2 rounded-full"
            aria-label="搜尋"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => navigate('/settings')}
            className="btn-touch bg-gray-100 p-2 rounded-full"
            aria-label="設定"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default MobileHeader