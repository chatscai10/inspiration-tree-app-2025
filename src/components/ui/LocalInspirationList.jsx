import React, { useState } from 'react'
import { Heart, Lightbulb, TreePine, Zap, Star, Plus, Database, Edit, Trash2, MoreVertical, Search, Filter } from 'lucide-react'
import { useLocalInspiration } from '../../hooks/useLocalInspiration'
import LocalInspirationForm from './LocalInspirationForm'

const LocalInspirationList = () => {
  const { inspirations, loading, deleteInspiration } = useLocalInspiration()
  const [editingInspiration, setEditingInspiration] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

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

  const handleEdit = (inspiration) => {
    setEditingInspiration(inspiration)
  }

  const handleDelete = async (id) => {
    try {
      await deleteInspiration(id)
      setShowDeleteConfirm(null)
    } catch (error) {
      alert('刪除失敗，請稍後再試')
    }
  }

  const handleCloseEdit = () => {
    setEditingInspiration(null)
  }

  // 篩選靈感
  const filteredInspirations = inspirations.filter(inspiration => {
    // 搜尋過濾
    const matchesSearch = searchTerm === '' || 
      inspiration.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inspiration.content && inspiration.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inspiration.tags && inspiration.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))

    // 優先級過濾
    const matchesPriority = priorityFilter === 'all' || inspiration.priority === priorityFilter

    return matchesSearch && matchesPriority
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (inspirations.length === 0) {
    return (
      <div className="text-center py-12">
        <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-500 mb-2">還沒有靈感記錄</h3>
        <p className="text-gray-400 mb-6">點擊右下角的按鈕開始記錄你的第一個靈感！</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mx-4">
          <p className="text-sm text-blue-800">
            💾 本地儲存模式：資料儲存在您的瀏覽器中，無需登入
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mt-4">
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
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-500">{inspirations.length} 個靈感</span>
        </div>
      </div>

      {/* 搜尋和篩選欄 */}
      <div className="space-y-3">
        {/* 搜尋欄 */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋靈感標題、內容或標籤..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 篩選按鈕 */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">篩選</span>
          </button>
          
          {(searchTerm || priorityFilter !== 'all') && (
            <div className="text-sm text-gray-500">
              顯示 {filteredInspirations.length} / {inspirations.length} 個靈感
            </div>
          )}
        </div>

        {/* 篩選選項 */}
        {showFilters && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                優先級
              </label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全部</option>
                <option value="urgent">緊急</option>
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 本地儲存提示 */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-green-800">
          ✅ 本地儲存模式已啟用 - 資料安全儲存在您的裝置上
        </p>
      </div>

      {/* 無搜尋結果 */}
      {filteredInspirations.length === 0 && (searchTerm || priorityFilter !== 'all') && (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">找不到符合條件的靈感</h3>
          <p className="text-gray-400">試試調整搜尋條件或篩選選項</p>
        </div>
      )}

      {filteredInspirations.map((inspiration) => (
        <div
          key={inspiration.id}
          className={`p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-shadow ${getPriorityColor(inspiration.priority)}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2 flex-1">
              {getTypeIcon(inspiration.type)}
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {inspiration.title}
              </h3>
            </div>
            <div className="flex items-center space-x-2 ml-2">
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {formatDate(inspiration.created_at)}
              </span>
              {/* 操作按鈕 */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEdit(inspiration)}
                  className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="編輯靈感"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(inspiration.id)}
                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="刪除靈感"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
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
            <span className="text-xs text-blue-600">本地儲存</span>
          </div>
        </div>
      ))}

      {/* 編輯表單 */}
      {editingInspiration && (
        <LocalInspirationForm
          isOpen={true}
          onClose={handleCloseEdit}
          editMode={true}
          initialData={editingInspiration}
        />
      )}

      {/* 刪除確認對話框 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">刪除靈感</h3>
                  <p className="text-sm text-gray-600">此操作無法復原</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                確定要刪除這個靈感嗎？刪除後將無法恢復。
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  刪除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LocalInspirationList