import React from 'react'
import { User, Bell, Shield, Palette, Download, Upload, ExternalLink } from 'lucide-react'

const Settings = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* 用戶資訊 */}
        <div className="mobile-card">
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">用戶名稱</h2>
                <p className="text-gray-600 text-sm">user@example.com</p>
                <p className="text-gray-500 text-xs">已註冊 30 天</p>
              </div>
            </div>
          </div>
        </div>

        {/* 一般設定 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4">一般設定</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">推送通知</div>
                    <div className="text-sm text-gray-500">接收靈感提醒和AI分析完成通知</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Palette className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">深色模式</div>
                    <div className="text-sm text-gray-500">使用深色主題界面</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900">隱私模式</div>
                    <div className="text-sm text-gray-500">不保存瀏覽歷史和搜尋記錄</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* AI 設定 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4">AI 分析設定</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  預設 AI 工具
                </label>
                <select className="input-touch w-full">
                  <option value="claude">Claude (推薦)</option>
                  <option value="chatgpt">ChatGPT</option>
                  <option value="cursor">Cursor AI</option>
                  <option value="gemini">Google Gemini</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分析深度
                </label>
                <select className="input-touch w-full">
                  <option value="basic">基礎分析</option>
                  <option value="detailed">詳細分析</option>
                  <option value="comprehensive">全面分析</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">自動分析</div>
                  <div className="text-sm text-gray-500">新增靈感時自動執行AI分析</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 數據管理 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4">數據管理</h2>
            
            <div className="space-y-3">
              <button className="touch-list-item w-full">
                <Download className="w-5 h-5 text-blue-500" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">匯出數據</div>
                  <div className="text-sm text-gray-500">下載所有靈感和分析結果</div>
                </div>
              </button>

              <button className="touch-list-item w-full">
                <Upload className="w-5 h-5 text-green-500" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">匯入數據</div>
                  <div className="text-sm text-gray-500">從備份檔案恢復數據</div>
                </div>
              </button>

              <button className="touch-list-item w-full">
                <Shield className="w-5 h-5 text-red-500" />
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">清除數據</div>
                  <div className="text-sm text-gray-500">永久刪除所有本地數據</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* 關於 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4">關於應用</h2>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">靈感心電圖</div>
                <div className="text-sm text-gray-500">版本 1.0.0</div>
                <div className="text-xs text-gray-400 mt-1">
                  智能靈感管理工具
                </div>
              </div>

              <div className="space-y-2">
                <a href="#" className="flex items-center justify-between py-2 text-blue-500">
                  <span className="text-sm">使用說明</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center justify-between py-2 text-blue-500">
                  <span className="text-sm">隱私政策</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center justify-between py-2 text-blue-500">
                  <span className="text-sm">服務條款</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center justify-between py-2 text-blue-500">
                  <span className="text-sm">意見回饋</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 登出 */}
        <div className="mobile-card">
          <div className="p-4">
            <button className="btn-secondary w-full text-red-600">
              登出帳號
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Settings