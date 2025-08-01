import React, { useState, useEffect } from 'react'
import { User, Mail, Key, Eye, EyeOff, Loader } from 'lucide-react'
import { useSupabase } from '../../utils/supabase'

const AuthModal = ({ isOpen, onClose }) => {
  const { signIn, signUp, loading, user } = useSupabase()
  const [mode, setMode] = useState('signin') // 'signin' | 'signup' | 'guest'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      onClose()
    }
  }, [user, onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('密碼不匹配')
        }
        await signUp(formData.email, formData.password)
        setMode('signin')
        setError('註冊成功！請登入')
      } else if (mode === 'signin') {
        await signIn(formData.email, formData.password)
      }
    } catch (error) {
      setError(error.message || '操作失敗，請稍後再試')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestLogin = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // 使用固定的測試帳號進行「訪客」登入
      await signIn('guest@inspiration-tree.com', 'guest123456')
    } catch (error) {
      // 如果測試帳號不存在，嘗試註冊
      try {
        await signUp('guest@inspiration-tree.com', 'guest123456')
        await signIn('guest@inspiration-tree.com', 'guest123456')
      } catch (signupError) {
        setError('訪客登入失敗，請稍後再試')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* 標題 */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 text-center">
            {mode === 'signup' ? '註冊帳號' : '登入帳號'}
          </h2>
          <p className="text-sm text-gray-600 text-center mt-1">
            開始記錄你的靈感
          </p>
        </div>

        {/* 內容 */}
        <div className="p-6">
          {/* 訪客登入 */}
          <div className="mb-6">
            <button
              onClick={handleGuestLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>訪客模式快速開始</span>
              {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              無需註冊，立即體驗完整功能
            </p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">或</span>
            </div>
          </div>

          {/* 登入/註冊表單 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                電子信箱
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                密碼
              </label>
              <div className="relative">
                <Key className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="至少6個字元"
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  確認密碼
                </label>
                <div className="relative">
                  <Key className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="再次輸入密碼"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                mode === 'signup' ? '註冊' : '登入'
              )}
            </button>
          </form>

          {/* 切換模式 */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {mode === 'signin' ? '還沒有帳號？註冊' : '已有帳號？登入'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal