import React, { useState, useEffect } from 'react'
import { Shuffle, Lightbulb, Plus, Heart, RefreshCw } from 'lucide-react'
import { toast } from 'react-hot-toast'

const RandomSparkPage = () => {
  const [currentSpark, setCurrentSpark] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sparkHistory, setSparkHistory] = useState([])

  // 隨機靈感類型
  const sparkTypes = [
    {
      name: '問題解決',
      emoji: '🔧',
      prompts: [
        '如果你只有5分鐘來解決這個問題，你會怎麼做？',
        '如果預算無限，這個問題最理想的解決方案是什麼？',
        '如果用小孩子的思維來看這個問題，會是什麼樣子？',
        '這個問題在10年後還會存在嗎？為什麼？'
      ]
    },
    {
      name: '創意發想',
      emoji: '🎨',
      prompts: [
        '如果你要為火星人設計這個產品，會是什麼樣子？',
        '如果將兩個完全不相關的概念結合，會產生什麼？',
        '如果這個想法必須在一張名片上解釋清楚，你會怎麼說？',
        '如果顛倒所有常規做法，會發生什麼？'
      ]
    },
    {
      name: '商業思維',
      emoji: '💼',
      prompts: [
        '如果你必須免費提供這個服務，如何盈利？',
        '如果只能服務100個客戶，你會如何選擇？',
        '如果這個業務模式在50年前會是什麼樣子？',
        '如果你的競爭對手都消失了，你會做什麼？'
      ]
    },
    {
      name: '技術創新',
      emoji: '⚡',
      prompts: [
        '如果沒有網路，這個功能要如何實現？',
        '如果用戶都是盲人，界面要如何設計？',
        '如果設備只有1MB記憶體，你會怎麼優化？',
        '如果每次操作都要付費，用戶體驗會如何改變？'
      ]
    },
    {
      name: '社會影響',
      emoji: '🌍',
      prompts: [
        '如果你的解決方案影響了100萬人，會發生什麼？',
        '如果你要向環保主義者推銷這個想法，會怎麼說？',
        '如果這個想法要在發展中國家實施呢？',
        '如果你的目標是改變一個小社區，從哪裡開始？'
      ]
    },
    {
      name: '未來思考',
      emoji: '🚀',
      prompts: [
        '如果AI取代了所有程序員，你的項目還有價值嗎？',
        '如果虛擬現實成為主流，這個想法要如何適應？',
        '如果全球都使用同一種貨幣，商業模式會改變嗎？',
        '如果人人都活到200歲，長期規劃會如何不同？'
      ]
    }
  ]

  // 時事相關的創意觸發器
  const timelyTriggers = [
    {
      theme: '永續發展',
      triggers: [
        '如何讓你的想法對環境產生正面影響？',
        '如果必須完全使用可再生資源，設計會如何改變？',
        '你的解決方案如何幫助減少浪費？'
      ]
    },
    {
      theme: '數位轉型',
      triggers: [
        '如何讓這個想法在沒有智慧型手機的情況下也能運作？',
        '如果所有操作都要語音控制，體驗會如何？',
        '如何讓85歲的人也能輕鬆使用？'
      ]
    },
    {
      theme: '後疫情時代',
      triggers: [
        '如果所有人都在家工作，這個想法還適用嗎？',
        '如何設計一個促進真實人際連結的數位體驗？',
        '如果健康成為最重要的考量，設計會如何調整？'
      ]
    }
  ]

  // 生成隨機靈感
  const generateRandomSpark = () => {
    setLoading(true)
    
    setTimeout(() => {
      const sparkType = sparkTypes[Math.floor(Math.random() * sparkTypes.length)]
      const prompt = sparkType.prompts[Math.floor(Math.random() * sparkType.prompts.length)]
      
      // 有30%機率加入時事觸發器
      let timelyTrigger = null
      if (Math.random() < 0.3) {
        const triggerCategory = timelyTriggers[Math.floor(Math.random() * timelyTriggers.length)]
        timelyTrigger = {
          theme: triggerCategory.theme,
          trigger: triggerCategory.triggers[Math.floor(Math.random() * triggerCategory.triggers.length)]
        }
      }
      
      const newSpark = {
        id: Date.now(),
        type: sparkType.name,
        emoji: sparkType.emoji,
        prompt: prompt,
        timelyTrigger: timelyTrigger,
        timestamp: new Date(),
        liked: false
      }
      
      setCurrentSpark(newSpark)
      setSparkHistory(prev => [newSpark, ...prev.slice(0, 9)]) // 保留最近10個
      setLoading(false)
    }, 800) // 增加一點懸念
  }

  // 喜歡當前靈感
  const likeSpark = () => {
    if (currentSpark) {
      setCurrentSpark(prev => ({ ...prev, liked: !prev.liked }))
      setSparkHistory(prev => 
        prev.map(spark => 
          spark.id === currentSpark.id 
            ? { ...spark, liked: !spark.liked }
            : spark
        )
      )
      
      if (!currentSpark.liked) {
        toast.success('已加入喜愛的靈感！')
      }
    }
  }

  // 保存靈感到個人庫
  const saveToPersonalLibrary = () => {
    if (currentSpark) {
      // 這裡會調用 Supabase API
      toast.success('靈感已保存到你的個人庫！')
    }
  }

  // 初始載入
  useEffect(() => {
    generateRandomSpark()
  }, [])

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
      {/* 頁面標題 */}
      <div className="bg-white/80 backdrop-blur-sm px-4 py-3 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">隨機靈感</h1>
              <p className="text-sm text-gray-600">打破思維框架的創意觸發器</p>
            </div>
          </div>
          
          <button
            onClick={generateRandomSpark}
            disabled={loading}
            className="btn-primary flex items-center space-x-2"
          >
            <Shuffle className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>換一個</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* 當前靈感卡片 */}
        {currentSpark && (
          <div className="mobile-card mb-6 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="loading-spinner mx-auto mb-4"></div>
                <p className="text-gray-600">正在激發靈感...</p>
              </div>
            ) : (
              <>
                {/* 卡片頭部 */}
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{currentSpark.emoji}</span>
                      <div>
                        <h2 className="text-lg font-semibold">{currentSpark.type}</h2>
                        <p className="text-purple-100 text-sm">
                          {currentSpark.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={likeSpark}
                      className={`p-2 rounded-full transition-colors ${
                        currentSpark.liked 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${currentSpark.liked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* 主要提示 */}
                <div className="p-6">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {currentSpark.prompt}
                    </p>
                  </div>
                  
                  {/* 時事觸發器 */}
                  {currentSpark.timelyTrigger && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          {currentSpark.timelyTrigger.theme}
                        </span>
                      </div>
                      <p className="text-blue-800">
                        {currentSpark.timelyTrigger.trigger}
                      </p>
                    </div>
                  )}
                  
                  {/* 行動按鈕 */}
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={saveToPersonalLibrary}
                      className="btn-primary flex-1 flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>加入靈感庫</span>
                    </button>
                    
                    <button
                      onClick={generateRandomSpark}
                      className="btn-secondary px-4 flex items-center justify-center"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* 歷史靈感 */}
        {sparkHistory.length > 1 && (
          <div className="mobile-card">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">最近的靈感</h3>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
              {sparkHistory.slice(1).map((spark) => (
                <div key={spark.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{spark.emoji}</span>
                        <span className="text-sm font-medium text-gray-700">
                          {spark.type}
                        </span>
                        {spark.liked && (
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {spark.prompt}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setCurrentSpark(spark)}
                      className="ml-3 text-xs text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      重新查看
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 使用提示 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">
            💡 當你缺乏靈感時，試試這些隨機觸發器
          </p>
          <p className="text-xs text-gray-400">
            每個問題都可能開啟全新的思考角度
          </p>
        </div>
      </div>
    </div>
  )
}

export default RandomSparkPage