import React, { useState } from 'react'
import { Plus, Mic, Camera, Lightbulb, X } from 'lucide-react'
import InspirationForm from './InspirationForm'

const QuickActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formType, setFormType] = useState('text')

  const openForm = (type) => {
    setFormType(type)
    setShowForm(true)
    setIsExpanded(false)
  }

  const handleVoiceRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          openForm('voice')
        })
        .catch(() => {
          alert('無法存取麥克風，請檢查權限設定')
        })
    } else {
      alert('您的瀏覽器不支援語音錄製功能')
    }
  }

  const handleCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          openForm('photo')
        })
        .catch(() => {
          alert('無法存取相機，請檢查權限設定')
        })
    } else {
      alert('您的瀏覽器不支援相機功能')
    }
  }

  const generateRandomInspiration = () => {
    const randomPrompts = [
      '如果你能改變世界上一件事，會是什麼？',
      '描述一個完美的星期天',
      '你最想學習的技能是什麼？',
      '如果你有超能力，你會怎麼使用它？',
      '你認為 10 年後的科技會是什麼樣子？',
      '描述一個你從未去過但很想去的地方',
      '如果你能與歷史上任何人對話，會選擇誰？',
      '你最珍貴的回憶是什麼？'
    ]
    
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)]
    setFormType('random')
    setShowForm({
      type: 'random',
      prompt: randomPrompt
    })
    setIsExpanded(false)
  }

  const quickActions = [
    {
      id: 'text',
      icon: Plus,
      label: '文字靈感',
      color: 'bg-blue-500',
      action: () => openForm('text')
    },
    {
      id: 'voice',
      icon: Mic,
      label: '語音記錄',
      color: 'bg-green-500',
      action: handleVoiceRecording
    },
    {
      id: 'photo',
      icon: Camera,
      label: '拍照靈感',
      color: 'bg-purple-500',
      action: handleCamera
    },
    {
      id: 'random',
      icon: Lightbulb,
      label: '隨機觸發',
      color: 'bg-yellow-500',
      action: generateRandomInspiration
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

      {/* 靈感表單 */}
      <InspirationForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        type={typeof showForm === 'object' ? showForm.type : formType}
        initialContent={typeof showForm === 'object' ? showForm.prompt : ''}
      />
    </div>
  )
}

export default QuickActionButton