import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Brain, TreePine, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 歡迎區域 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">靈感心電圖</h1>
            <p className="text-blue-100">智能靈感管理工具</p>
          </div>
        </div>
        
        <div className="bg-white/20 rounded-lg p-4">
          <p className="text-sm">
            🌟 歡迎使用您的個人創意實驗室！記錄靈感、分析想法、生成報告。
          </p>
        </div>
      </div>

      {/* 主要功能區 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* 快速操作 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">快速開始</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/new-inspiration" className="btn-primary text-center">
                <Plus className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">新增靈感</span>
              </Link>
              
              <Link to="/ai-analysis" className="btn-secondary text-center">
                <Brain className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">AI分析</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 核心功能 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">探索功能</h2>
            <div className="space-y-3">
              
              <Link to="/tree" className="touch-list-item">
                <TreePine className="w-6 h-6 text-green-500" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">樹狀視圖</h3>
                  <p className="text-sm text-gray-600">查看靈感的層次結構</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </Link>

              <Link to="/inspiration-feed" className="touch-list-item">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">靈感源</h3>
                  <p className="text-sm text-gray-600">時事趨勢和創意觸發</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </Link>

              <Link to="/random-spark" className="touch-list-item">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">隨機靈感</h3>
                  <p className="text-sm text-gray-600">突破思維框架的觸發器</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </Link>
              
            </div>
          </div>
        </div>

        {/* 統計概覽 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">今日概覽</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">0</div>
                <div className="text-xs text-gray-600">新增靈感</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">0</div>
                <div className="text-xs text-gray-600">AI分析</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">0</div>
                <div className="text-xs text-gray-600">完成項目</div>
              </div>
            </div>
          </div>
        </div>

        {/* 最近活動 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">最近活動</h2>
            <div className="text-center py-8 text-gray-500">
              <Brain className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">還沒有活動記錄</p>
              <p className="text-xs">開始新增靈感來查看活動</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomePage