import { createClient } from '@supabase/supabase-js'

// Supabase 配置 - 使用環境變數
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Supabase Provider for React Context
import React, { createContext, useContext, useEffect, useState } from 'react'

const SupabaseContext = createContext({})

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // 獲取初始會話
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 監聽認證狀態變化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    supabase,
    user,
    session,
    loading,
    signUp: (email, password, options) => supabase.auth.signUp({ email, password, options }),
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
    resetPassword: (email) => supabase.auth.resetPasswordForEmail(email)
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}

// API 輔助函數
export const inspirationAPI = {
  // 獲取用戶的所有靈感分類
  async getCategories(userId) {
    const { data, error } = await supabase
      .from('inspiration_categories')
      .select('*')
      .eq('user_id', userId)
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    return data
  },

  // 獲取用戶的所有靈感
  async getInspirations(userId, filters = {}) {
    let query = supabase
      .from('inspirations')
      .select(`
        *,
        inspiration_categories (name, color, icon),
        inspiration_subcategories (name),
        inspiration_details (*)
      `)
      .eq('user_id', userId)

    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id)
    }

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // 創建新靈感
  async createInspiration(inspirationData) {
    const { data, error } = await supabase
      .from('inspirations')
      .insert([inspirationData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 更新靈感
  async updateInspiration(id, updates) {
    const { data, error } = await supabase
      .from('inspirations')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 刪除靈感
  async deleteInspiration(id) {
    const { error } = await supabase
      .from('inspirations')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // 獲取AI對話歷史
  async getAIConversations(userId, inspirationId = null) {
    let query = supabase
      .from('ai_conversations')
      .select('*')
      .eq('user_id', userId)

    if (inspirationId) {
      query = query.eq('inspiration_id', inspirationId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // 保存AI對話
  async saveAIConversation(conversationData) {
    const { data, error } = await supabase
      .from('ai_conversations')
      .insert([conversationData])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 獲取靈感連結
  async getInspirationConnections(userId) {
    const { data, error } = await supabase
      .from('inspiration_connections')
      .select(`
        *,
        source_inspiration:source_inspiration_id (id, title),
        target_inspiration:target_inspiration_id (id, title)
      `)
      .eq('user_id', userId)
    
    if (error) throw error
    return data
  },

  // 建立靈感連結
  async createConnection(connectionData) {
    const { data, error } = await supabase
      .from('inspiration_connections')
      .insert([connectionData])
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

export default supabase