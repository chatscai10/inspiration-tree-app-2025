import React from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, Tag, Star, Edit, Share, MoreVertical } from 'lucide-react'

const InspirationDetail = () => {
  const { id } = useParams()

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 內容區域 */}
      <div className="flex-1 overflow-y-auto">
        
        {/* 靈感標題區 */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                範例靈感標題
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>2024-01-15</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span>工作類</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="btn-secondary p-2">
                <Star className="w-5 h-5" />
              </button>
              <button className="btn-secondary p-2">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* 標籤 */}
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              創新
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              技術
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              重要
            </span>
          </div>
        </div>

        {/* 內容區 */}
        <div className="p-4 space-y-4">
          
          {/* 靈感內容 */}
          <div className="mobile-card">
            <div className="p-4">
              <h2 className="font-semibold text-gray-900 mb-3">靈感內容</h2>
              <div className="prose prose-sm max-w-none text-gray-700">
                <p>
                  這是一個範例靈感的詳細內容。在實際應用中，這裡會顯示用戶輸入的具體靈感描述、想法和細節。
                </p>
                <p>
                  內容可以包含多個段落，支援豐富的文本格式和結構化信息。
                </p>
              </div>
            </div>
          </div>

          {/* AI 分析結果 */}
          <div className="mobile-card">
            <div className="p-4">
              <h2 className="font-semibold text-gray-900 mb-3">AI 分析洞察</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                <p className="text-sm text-blue-800">
                  📊 <strong>可行性評分</strong>: 8.5/10<br/>
                  🎯 <strong>創新程度</strong>: 高<br/>
                  ⏱️ <strong>實施複雜度</strong>: 中等<br/>
                  💰 <strong>商業潛力</strong>: 強
                </p>
              </div>
              
              <div className="mt-3 text-sm text-gray-600">
                <p><strong>主要建議</strong>:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>建議進一步研究目標市場需求</li>
                  <li>考慮技術實現的可行性評估</li>
                  <li>制定階段性實施計劃</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 相關連結 */}
          <div className="mobile-card">
            <div className="p-4">
              <h2 className="font-semibold text-gray-900 mb-3">相關靈感</h2>
              <div className="text-center py-6 text-gray-500">
                <div className="text-sm">暫無相關靈感</div>
                <div className="text-xs mt-1">建立連結來發現想法之間的關係</div>
              </div>
            </div>
          </div>

          {/* 操作歷史 */}
          <div className="mobile-card">
            <div className="p-4">
              <h2 className="font-semibold text-gray-900 mb-3">更新歷史</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">創建靈感</div>
                    <div className="text-xs text-gray-500">2024-01-15 14:30</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">執行 AI 分析</div>
                    <div className="text-xs text-gray-500">2024-01-15 15:45</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">添加標籤</div>
                    <div className="text-xs text-gray-500">2024-01-15 16:20</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 底部操作欄 */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-3">
          <button className="btn-primary flex-1 flex items-center justify-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>編輯</span>
          </button>
          
          <button className="btn-secondary flex items-center justify-center space-x-2 px-4">
            <Share className="w-4 h-4" />
            <span>分享</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InspirationDetail