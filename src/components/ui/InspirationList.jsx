import React, { useState } from 'react'
import { Heart, Lightbulb, TreePine, Zap, Star, Plus, User, LogIn } from 'lucide-react'
import { useInspiration } from '../../hooks/useInspiration'
import { useSupabase } from '../../utils/supabase'
import AuthModal from './AuthModal'

const InspirationList = () => {
  const { inspirations, loading } = useInspiration()
  const { user } = useSupabase()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-red-500 bg-red-50'
      case 'high': return 'border-orange-500 bg-orange-50'
      case 'medium': return 'border-blue-500 bg-blue-50'
      case 'low': return 'border-gray-500 bg-gray-50'
      default: return 'border-gray-300 bg-white'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'voice': return <Zap className="w-4 h-4 text-green-500" />
      case 'photo': return <Star className="w-4 h-4 text-purple-500" />
      case 'random': return <Lightbulb className="w-4 h-4 text-yellow-500" />
      default: return <Plus className="w-4 h-4 text-blue-500" />
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '今天'
    if (diffDays === 2) return '昨天'
    if (diffDays <= 7) return `${diffDays} 天前`
    return date.toLocaleDateString('zh-TW')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (inspirations.length === 0) {
    // 如果未登入，顯示登入提示
    if (!user) {
      return (
        <>
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">歡迎使用靈感心電圖</h3>
            <p className="text-gray-400 mb-6">登入後開始記錄和管理你的靈感</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span>立即開始</span>
            </button>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mt-4">
              <TreePine className="w-4 h-4" />
              <span>你的靈感樹正等待成長</span>
            </div>
          </div>
          <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
      )
    }

    // 已登入但沒有靈感
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-500 mb-2">還沒有靈感記錄</h3>
        <p className="text-gray-400 mb-6">點擊右下角的按鈕開始記錄你的第一個靈感！</p>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <TreePine className="w-4 h-4" />
          <span>你的靈感樹正等待成長</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">我的靈感</h2>
        <span className="text-sm text-gray-500">{inspirations.length} 個靈感</span>
      </div>

      {inspirations.map((inspiration) => (
        <div
          key={inspiration.id}
          className={`p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-shadow ${getPriorityColor(inspiration.priority)}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              {getTypeIcon(inspiration.type)}
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {inspiration.title}
              </h3>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
              {formatDate(inspiration.created_at)}
            </span>
          </div>

          {inspiration.content && (
            <p className="text-gray-700 text-sm mb-3 line-clamp-2">
              {inspiration.content}
            </p>
          )}

          {inspiration.tags && inspiration.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {inspiration.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/60 text-xs rounded-full text-gray-600"
                >
                  #{tag}
                </span>
              ))}
              {inspiration.tags.length > 3 && (
                <span className="px-2 py-1 bg-white/60 text-xs rounded-full text-gray-500">
                  +{inspiration.tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <span className="capitalize">{inspiration.priority}</span>
              {inspiration.status && (
                <span className={`px-2 py-1 rounded-full ${
                  inspiration.status === 'active' ? 'bg-green-100 text-green-700' :
                  inspiration.status === 'archived' ? 'bg-gray-100 text-gray-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {inspiration.status}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InspirationList