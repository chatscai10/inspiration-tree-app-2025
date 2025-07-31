import React, { useState } from 'react'
import { Bot, Download, Upload, RefreshCw, Copy, ExternalLink } from 'lucide-react'

const AIAnalysis = () => {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('ready') // ready, downloading, analyzing, uploading, completed

  const startAnalysis = () => {
    setLoading(true)
    setStep('downloading')
    
    // 模擬分析流程
    setTimeout(() => setStep('analyzing'), 1000)
    setTimeout(() => setStep('uploading'), 3000)
    setTimeout(() => {
      setStep('completed')
      setLoading(false)
    }, 4000)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 頂部說明 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">AI 智能分析</h1>
            <p className="text-blue-100 text-sm">讓 AI 深度分析您的靈感</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* 分析流程狀態 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4">分析流程</h2>
            
            <div className="space-y-4">
              <div className={`flex items-center space-x-3 ${step === 'downloading' ? 'text-blue-600' : step === 'ready' ? 'text-gray-400' : 'text-green-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'downloading' ? 'bg-blue-100' : step === 'ready' ? 'bg-gray-100' : 'bg-green-100'}`}>
                  {step === 'downloading' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-medium">下載靈感數據</div>
                  <div className="text-sm opacity-70">獲取最新的靈感和對話歷史</div>
                </div>
              </div>

              <div className={`flex items-center space-x-3 ${step === 'analyzing' ? 'text-blue-600' : ['ready', 'downloading'].includes(step) ? 'text-gray-400' : 'text-green-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'analyzing' ? 'bg-blue-100' : ['ready', 'downloading'].includes(step) ? 'bg-gray-100' : 'bg-green-100'}`}>
                  {step === 'analyzing' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-medium">AI 深度分析</div>
                  <div className="text-sm opacity-70">使用 Claude/Cursor/ChatGPT 進行分析</div>
                </div>
              </div>

              <div className={`flex items-center space-x-3 ${step === 'uploading' ? 'text-blue-600' : ['ready', 'downloading', 'analyzing'].includes(step) ? 'text-gray-400' : 'text-green-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'uploading' ? 'bg-blue-100' : ['ready', 'downloading', 'analyzing'].includes(step) ? 'bg-gray-100' : 'bg-green-100'}`}>
                  {step === 'uploading' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-medium">上傳分析結果</div>
                  <div className="text-sm opacity-70">將 AI 回覆整合到系統中</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 操作區域 */}
        {step === 'ready' && (
          <div className="mobile-card">
            <div className="p-4">
              <h2 className="font-semibold text-gray-900 mb-3">開始分析</h2>
              <p className="text-gray-600 text-sm mb-4">
                點擊下方按鈕開始 AI 分析流程。系統會自動生成分析指令，您只需複製到 AI 工具中即可。
              </p>
              
              <button 
                onClick={startAnalysis}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <Bot className="w-5 h-5" />
                <span>啟動 AI 分析</span>
              </button>
            </div>
          </div>
        )}

        {/* 分析指令顯示 */}
        {step === 'analyzing' && (
          <div className="mobile-card">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900">AI 分析指令</h2>
                <button className="btn-secondary text-sm px-3 py-1">
                  <Copy className="w-4 h-4 mr-1" />
                  複製
                </button>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-3 text-sm font-mono">
                <div className="text-blue-600 mb-2">🚀 靈感心電圖增強分析系統 v2.0</div>
                <div className="text-gray-700">
                  請分析以下靈感數據並提供深度洞察：<br/>
                  - 可行性評估<br/>
                  - 創新程度分析<br/>
                  - 實施建議<br/>
                  - 潛在風險<br/>
                  - 市場機會<br/>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4 text-blue-500" />
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                    開啟 Claude AI
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4 text-blue-500" />
                  <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                    開啟 ChatGPT
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 完成狀態 */}
        {step === 'completed' && (
          <div className="mobile-card">
            <div className="p-4">
              <h2 className="font-semibold text-gray-900 mb-3">分析完成 ✅</h2>
              <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg mb-4">
                <p className="text-green-800 text-sm">
                  🎉 AI 分析已完成！您可以在靈感詳情頁面查看完整的分析結果。
                </p>
              </div>
              
              <div className="space-y-3">
                <button className="btn-primary w-full">
                  查看分析結果
                </button>
                <button 
                  onClick={() => {setStep('ready'); setLoading(false)}}
                  className="btn-secondary w-full"
                >
                  進行新分析
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 使用提示 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 mb-3">使用說明</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">1.</span>
                <span>點擊「啟動 AI 分析」按鈕</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">2.</span>
                <span>複製生成的分析指令</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">3.</span>
                <span>貼到 Claude、ChatGPT 或 Cursor AI</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">4.</span>
                <span>將 AI 回覆複製回系統</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">5.</span>
                <span>查看智能分析結果</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI 工具比較 */}
        <div className="mobile-card">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 mb-3">AI 工具推薦</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium text-gray-900">Claude</div>
                  <div className="text-xs text-gray-500">深度分析，邏輯清晰</div>
                </div>
                <div className="text-green-600 text-sm font-medium">推薦</div>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium text-gray-900">ChatGPT</div>
                  <div className="text-xs text-gray-500">通用分析，回應快速</div>
                </div>
                <div className="text-blue-600 text-sm font-medium">常用</div>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium text-gray-900">Cursor AI</div>
                  <div className="text-xs text-gray-500">技術分析，程式導向</div>
                </div>
                <div className="text-purple-600 text-sm font-medium">專業</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AIAnalysis