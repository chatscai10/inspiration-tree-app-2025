import React from 'react'
import { TreePine, Plus, Settings, Search } from 'lucide-react'

const TreeView = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 頂部控制區 */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-900">樹狀視圖</h1>
          <div className="flex space-x-2">
            <button className="btn-secondary p-2">
              <Search className="w-5 h-5" />
            </button>
            <button className="btn-secondary p-2">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          📊 總計：0 個分類，0 個靈感
        </div>
      </div>

      {/* 樹狀圖區域 */}
      <div className="flex-1 relative overflow-hidden">
        {/* 空狀態 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <TreePine className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              您的靈感樹等待成長
            </h2>
            <p className="text-gray-500 mb-6 max-w-sm">
              開始新增靈感，建立您的創意森林。每個想法都會在這裡找到它的位置。
            </p>
            
            <div className="space-y-3">
              <button className="btn-primary w-full flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>新增第一個靈感</span>
              </button>
              
              <div className="text-xs text-gray-400">
                💡 提示：使用樹狀結構整理您的想法
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部說明 */}
      <div className="bg-blue-50 border-t border-blue-100 p-4">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-500 rounded-full p-1">
            <TreePine className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-900">樹狀分類說明</h3>
            <p className="text-xs text-blue-700 mt-1">
              🌳 樹頭 = 主分類 → 🌿 樹幹 = 子分類 → 🍃 樹枝 = 具體靈感 → 📝 樹葉 = 詳細內容
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreeView