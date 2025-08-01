import React, { useState } from 'react'
import { X, Save, Camera, Mic, Type, Image } from 'lucide-react'
import { useLocalInspiration } from '../../hooks/useLocalInspiration'

const LocalInspirationForm = ({ isOpen, onClose, type = 'text', initialContent = '', editMode = false, initialData = null }) => {
  const { createInspiration, updateInspiration, loading } = useLocalInspiration()
  const [formData, setFormData] = useState({
    title: '',
    content: initialContent,
    type: type,
    category: '',
    tags: '',
    priority: 'medium'
  })

  // 當進入編輯模式或 initialContent 改變時更新表單
  React.useEffect(() => {
    if (editMode && initialData) {
      // 編輯模式：載入現有數據
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        type: initialData.type || type,
        category: initialData.category_id || '',
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '',
        priority: initialData.priority || 'medium'
      })
    } else if (initialContent) {
      // 新增模式：使用 initialContent
      setFormData(prev => ({
        ...prev,
        content: initialContent
      }))
    }
  }, [editMode, initialData, initialContent, type])

  const typeIcons = {
    text: Type,
    voice: Mic,
    photo: Camera,
    random: Image
  }

  const typeLabels = {
    text: '文字靈感',
    voice: '語音記錄',
    photo: '拍照靈感',
    random: '隨機靈感'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('請輸入標題')
      return
    }

    try {
      const inspirationData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        type: formData.type,
        category_id: formData.category || null,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        priority: formData.priority,
        status: 'active'
      }

      if (editMode && initialData) {
        // 編輯模式：更新現有靈感
        await updateInspiration(initialData.id, inspirationData)
        alert('靈感已成功更新！')
      } else {
        // 新增模式：創建新靈感
        await createInspiration(inspirationData)
        alert('靈感已成功新增！')
      }
      
      // 重置表單（只在新增模式下）
      if (!editMode) {
        setFormData({
          title: '',
          content: '',
          type: type,
          category: '',
          tags: '',
          priority: 'medium'
        })
      }
      
      onClose()
    } catch (error) {
      console.error(editMode ? '更新靈感失敗:' : '新增靈感失敗:', error)
      alert(editMode ? '更新失敗，請稍後再試' : '新增失敗，請稍後再試')
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  const Icon = typeIcons[formData.type]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* 標題列 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {editMode ? `編輯${typeLabels[formData.type]}` : typeLabels[formData.type]}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 表單內容 */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[calc(90vh-80px)] overflow-y-auto">
          {/* 本地儲存提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💾 使用本地儲存模式，資料儲存在您的瀏覽器中
            </p>
          </div>

          {/* 標題 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              標題 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="輸入靈感標題..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* 內容 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              內容
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="描述你的靈感..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* 優先級 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              優先級
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
              <option value="urgent">緊急</option>
            </select>
          </div>

          {/* 標籤 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              標籤
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder="用逗號分隔標籤，例如：工作,創意,靈感"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 按鈕 */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? (editMode ? '更新中...' : '儲存中...') : (editMode ? '更新' : '儲存')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LocalInspirationForm