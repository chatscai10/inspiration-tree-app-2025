import React, { useState, useEffect } from 'react'
import { RefreshCw, TrendingUp, Clock, Globe, Zap, Star } from 'lucide-react'
import { toast } from 'react-hot-toast'

const InspirationFeedPage = () => {
  const [inspirationFeed, setInspirationFeed] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  // 生成時事靈感建議
  const generateTimelyInspirations = async () => {
    setLoading(true)
    
    try {
      // 模擬從多個來源獲取時事靈感
      const inspirationSources = [
        {
          category: '科技趨勢',
          icon: '🚀',
          items: await fetchTechTrends()
        },
        {
          category: '社會議題',
          icon: '🌍',
          items: await fetchSocialTrends()
        },
        {
          category: '創意設計',
          icon: '🎨',
          items: await fetchDesignTrends()
        },
        {
          category: '商業創新',
          icon: '💡',
          items: await fetchBusinessTrends()
        },
        {
          category: '生活方式',
          icon: '🌱',
          items: await fetchLifestyleTrends()
        }
      ]
      
      setInspirationFeed(inspirationSources)
      setLastUpdated(new Date())
      toast.success('已更新最新靈感建議！')
      
    } catch (error) {
      toast.error('更新靈感建議失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  // 模擬從不同來源獲取科技趨勢
  const fetchTechTrends = async () => {
    // 實際應用中可以整合：
    // - GitHub Trending API
    // - Product Hunt API  
    // - Hacker News API
    // - Reddit r/technology API
    
    const currentDate = new Date()
    const trends = [
      {
        title: 'AI編程助手的新發展',
        description: '探索如何將AI編程助手整合到日常開發工作流程中',
        source: 'GitHub Trending',
        timestamp: currentDate,
        inspiration: '可以開發一個專門針對特定領域的AI編程助手'
      },
      {
        title: 'WebAssembly在前端的應用',
        description: '了解WebAssembly如何改變前端開發的性能表現',
        source: 'Hacker News',
        timestamp: currentDate,
        inspiration: '考慮將計算密集的功能遷移到WebAssembly'
      },
      {
        title: '邊緣計算的興起',
        description: '邊緣計算正在改變雲端服務的架構模式',
        source: 'Tech Blogs',
        timestamp: currentDate,
        inspiration: '開發適用於邊緣計算環境的輕量級應用'
      }
    ]
    
    return trends
  }

  // 模擬從不同來源獲取社會議題趨勢
  const fetchSocialTrends = async () => {
    const currentDate = new Date()
    return [
      {
        title: '數位包容性設計',
        description: '如何設計讓所有人都能使用的數位產品',
        source: 'Medium',
        timestamp: currentDate,
        inspiration: '開發無障礙設計的工具或檢查器'
      },
      {
        title: '遠程工作的未來',
        description: '疫情後遠程工作模式的演變和挑戰',
        source: 'LinkedIn',
        timestamp: currentDate,
        inspiration: '創建改善遠程協作體驗的工具'
      },
      {
        title: '環保科技應用',
        description: '科技如何幫助解決環境問題',
        source: 'Environmental Tech',
        timestamp: currentDate,
        inspiration: '開發追蹤個人碳足跡的應用程式'
      }
    ]
  }

  // 模擬獲取設計趋势
  const fetchDesignTrends = async () => {
    const currentDate = new Date()
    return [
      {
        title: 'neumorphism 設計風格復甦',
        description: '軟性陰影和立體效果重新受到關注',
        source: 'Dribbble',
        timestamp: currentDate,
        inspiration: '嘗試將neumorphism應用到移動端界面設計'
      },
      {
        title: '深色模式的進化',
        description: '不只是顏色反轉，更考慮用戶體驗的深色設計',
        source: 'Behance',
        timestamp: currentDate,
        inspiration: '設計智能的深色模式切換系統'
      }
    ]
  }

  // 模擬獲取商業趨勢
  const fetchBusinessTrends = async () => {
    const currentDate = new Date()
    return [
      {
        title: 'SaaS訂閱模式創新',
        description: '新的訂閱模式和定價策略',
        source: 'Product Hunt',
        timestamp: currentDate,
        inspiration: '開發靈活的訂閱管理系統'
      },
      {
        title: '個人化服務趨勢',
        description: 'AI驅動的個人化體驗正在成為標準',
        source: 'Business Insider',
        timestamp: currentDate,
        inspiration: '創建學習用戶偏好的智能推薦系統'
      }
    ]
  }

  // 模擬獲取生活方式趨勢
  const fetchLifestyleTrends = async () => {
    const currentDate = new Date()
    return [
      {
        title: '數位極簡主義',
        description: '人們開始追求更簡潔的數位生活方式',
        source: 'Lifestyle Blogs',
        timestamp: currentDate,
        inspiration: '開發幫助用戶管理數位時間的工具'
      },
      {
        title: '健康科技整合',
        description: '日常健康監測與科技產品的深度整合',
        source: 'Health Tech',
        timestamp: currentDate,
        inspiration: '設計直觀的健康數據可視化界面'
      }
    ]
  }

  // 頁面載入時自動獲取靈感
  useEffect(() => {
    generateTimelyInspirations()
  }, [])

  // 將靈感保存到個人靈感庫
  const saveInspiration = (inspiration) => {
    // 這裡會調用 Supabase API 保存到用戶的靈感庫
    toast.success('靈感已添加到你的靈感庫！')
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 頁面標題和刷新按鈕 */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">靈感源</h1>
            <p className="text-sm text-gray-600">時事趨勢 • 創意火花</p>
          </div>
          
          <button
            onClick={generateTimelyInspirations}
            disabled={loading}
            className="btn-primary flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>更新</span>
          </button>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>最後更新：{lastUpdated.toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* 靈感內容 */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-gray-600">正在獲取最新靈感...</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {inspirationFeed.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mobile-card">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{category.icon}</span>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {category.category}
                    </h2>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium text-gray-900 flex-1">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => saveInspiration(item)}
                          className="ml-2 p-1 text-yellow-500 hover:text-yellow-600 transition-colors"
                          aria-label="收藏靈感"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {item.description}
                      </p>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3">
                        <div className="flex items-start space-x-2">
                          <Zap className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-blue-800">
                            <strong>靈感火花：</strong> {item.inspiration}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-3 h-3" />
                          <span>{item.source}</span>
                        </div>
                        <span>{item.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* 底部提示 */}
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">
                靈感來源會定期更新，保持你的創意源源不絶 ✨
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InspirationFeedPage