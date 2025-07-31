import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useSupabase } from '../utils/supabase'

// 初始狀態
const initialState = {
  inspirations: [],
  categories: [],
  loading: false,
  error: null,
  currentInspiration: null,
  filters: {
    category: null,
    status: null,
    search: ''
  }
}

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_INSPIRATIONS: 'SET_INSPIRATIONS',
  SET_CATEGORIES: 'SET_CATEGORIES',
  ADD_INSPIRATION: 'ADD_INSPIRATION',
  UPDATE_INSPIRATION: 'UPDATE_INSPIRATION',
  DELETE_INSPIRATION: 'DELETE_INSPIRATION',
  SET_CURRENT_INSPIRATION: 'SET_CURRENT_INSPIRATION',
  SET_FILTERS: 'SET_FILTERS',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

// Reducer
const inspirationReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload }
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false }
    
    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null }
    
    case ActionTypes.SET_INSPIRATIONS:
      return { ...state, inspirations: action.payload, loading: false }
    
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload }
    
    case ActionTypes.ADD_INSPIRATION:
      return {
        ...state,
        inspirations: [action.payload, ...state.inspirations],
        loading: false
      }
    
    case ActionTypes.UPDATE_INSPIRATION:
      return {
        ...state,
        inspirations: state.inspirations.map(inspiration =>
          inspiration.id === action.payload.id ? action.payload : inspiration
        ),
        currentInspiration: state.currentInspiration?.id === action.payload.id 
          ? action.payload 
          : state.currentInspiration,
        loading: false
      }
    
    case ActionTypes.DELETE_INSPIRATION:
      return {
        ...state,
        inspirations: state.inspirations.filter(
          inspiration => inspiration.id !== action.payload
        ),
        currentInspiration: state.currentInspiration?.id === action.payload 
          ? null 
          : state.currentInspiration,
        loading: false
      }
    
    case ActionTypes.SET_CURRENT_INSPIRATION:
      return { ...state, currentInspiration: action.payload }
    
    case ActionTypes.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } }
    
    default:
      return state
  }
}

// Context
const InspirationContext = createContext()

// Provider
export const InspirationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inspirationReducer, initialState)
  const { user, supabase } = useSupabase()

  // 載入靈感列表
  const loadInspirations = async (filters = {}) => {
    if (!user) return

    dispatch({ type: ActionTypes.SET_LOADING, payload: true })
    
    try {
      let query = supabase
        .from('inspirations')
        .select(`
          *,
          inspiration_categories (name, color, icon),
          inspiration_subcategories (name)
        `)
        .eq('user_id', user.id)

      // 套用篩選條件
      if (filters.category) {
        query = query.eq('category_id', filters.category)
      }
      
      if (filters.status) {
        query = query.eq('status', filters.status)
      }
      
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error

      dispatch({ type: ActionTypes.SET_INSPIRATIONS, payload: data || [] })
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
    }
  }

  // 載入分類列表
  const loadCategories = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('inspiration_categories')
        .select('*')
        .eq('user_id', user.id)
        .order('sort_order', { ascending: true })

      if (error) throw error

      dispatch({ type: ActionTypes.SET_CATEGORIES, payload: data || [] })
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
    }
  }

  // 新增靈感
  const createInspiration = async (inspirationData) => {
    if (!user) return

    dispatch({ type: ActionTypes.SET_LOADING, payload: true })

    try {
      const newInspiration = {
        ...inspirationData,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('inspirations')
        .insert([newInspiration])
        .select(`
          *,
          inspiration_categories (name, color, icon),
          inspiration_subcategories (name)
        `)
        .single()

      if (error) throw error

      dispatch({ type: ActionTypes.ADD_INSPIRATION, payload: data })
      return data
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
      throw error
    }
  }

  // 更新靈感
  const updateInspiration = async (id, updates) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true })

    try {
      const { data, error } = await supabase
        .from('inspirations')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(`
          *,
          inspiration_categories (name, color, icon),
          inspiration_subcategories (name)
        `)
        .single()

      if (error) throw error

      dispatch({ type: ActionTypes.UPDATE_INSPIRATION, payload: data })
      return data
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
      throw error
    }
  }

  // 刪除靈感
  const deleteInspiration = async (id) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true })

    try {
      const { error } = await supabase
        .from('inspirations')
        .delete()
        .eq('id', id)

      if (error) throw error

      dispatch({ type: ActionTypes.DELETE_INSPIRATION, payload: id })
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
      throw error
    }
  }

  // 獲取單個靈感
  const getInspiration = async (id) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true })

    try {
      const { data, error } = await supabase
        .from('inspirations')
        .select(`
          *,
          inspiration_categories (name, color, icon),
          inspiration_subcategories (name),
          inspiration_details (*)
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      dispatch({ type: ActionTypes.SET_CURRENT_INSPIRATION, payload: data })
      return data
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
      throw error
    }
  }

  // 設定篩選條件
  const setFilters = (newFilters) => {
    dispatch({ type: ActionTypes.SET_FILTERS, payload: newFilters })
  }

  // 清除錯誤
  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR })
  }

  // 初始載入
  useEffect(() => {
    if (user) {
      loadCategories()
      loadInspirations()
    }
  }, [user])

  // 當篩選條件改變時重新載入
  useEffect(() => {
    if (user) {
      loadInspirations(state.filters)
    }
  }, [state.filters, user])

  const value = {
    // 狀態
    ...state,
    
    // 動作
    loadInspirations,
    loadCategories,
    createInspiration,
    updateInspiration,
    deleteInspiration,
    getInspiration,
    setFilters,
    clearError,
    
    // 計算屬性
    totalInspirations: state.inspirations.length,
    filteredInspirations: state.inspirations.filter(inspiration => {
      const { category, status, search } = state.filters
      
      if (category && inspiration.category_id !== category) return false
      if (status && inspiration.status !== status) return false
      if (search && !inspiration.title.toLowerCase().includes(search.toLowerCase())) return false
      
      return true
    })
  }

  return (
    <InspirationContext.Provider value={value}>
      {children}
    </InspirationContext.Provider>
  )
}

// Hook
export const useInspiration = () => {
  const context = useContext(InspirationContext)
  if (!context) {
    throw new Error('useInspiration must be used within an InspirationProvider')
  }
  return context
}

export default useInspiration