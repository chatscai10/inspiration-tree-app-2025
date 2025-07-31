import React, { useState } from 'react'
import { Plus, Mic, Camera, Lightbulb, X } from 'lucide-react'

const QuickActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const quickActions = [
    {
      id: 'text',
      icon: Plus,
      label: '文字靈感',
      color: 'bg-blue-500',
      action: () => console.log('新增文字靈感')
    },
    {
      id: 'voice',
      icon: Mic,
      label: '語音記錄',
      color: 'bg-green-500',
      action: () => console.log('開始語音記錄')
    },
    {
      id: 'photo',
      icon: Camera,
      label: '拍照靈感',
      color: 'bg-purple-500',
      action: () => console.log('開啟相機')
    },
    {
      id: 'random',
      icon: Lightbulb,
      label: '隨機觸發',
      color: 'bg-yellow-500',
      action: () => console.log('隨機靈感觸發')
    }
  ]

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* 展開的動作按鈕 */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          {quickActions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-center space-x-3 animate-fade-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <span className="bg-white text-gray-700 text-xs px-2 py-1 rounded-lg shadow-md whitespace-nowrap">
                {action.label}
              </span>
              <button
                onClick={action.action}
                className={`w-12 h-12 ${action.color} text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform`}
              >
                <action.icon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 主要觸發按鈕 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        } active:scale-95`}
        aria-label="快速操作"
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </button>

      {/* 背景遮罩 */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  )
}

export default QuickActionButton