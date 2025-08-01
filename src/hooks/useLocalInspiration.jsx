import React, { createContext, useContext, useReducer, useEffect } from 'react'

// 初始狀態
const initialState = {
  inspirations: [],
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

// Local Storage 工具函數
const localStorageAPI = {
  // 獲取所有靈感
  getInspirations: () => {
    try {
      const stored = localStorage.getItem('inspirations')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('獲取靈感失敗:', error)
      return []
    }
  },

  // 儲存靈感列表
  saveInspirations: (inspirations) => {
    try {
      localStorage.setItem('inspirations', JSON.stringify(inspirations))
      return true
    } catch (error) {
      console.error('儲存靈感失敗:', error)
      return false
    }
  },

  // 新增靈感
  addInspiration: (inspirationData) => {
    const inspirations = localStorageAPI.getInspirations()
    const newInspiration = {
      id: 'insp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      ...inspirationData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const updatedInspirations = [newInspiration, ...inspirations]
    const success = localStorageAPI.saveInspirations(updatedInspirations)
    
    return success ? newInspiration : null
  },

  // 更新靈感
  updateInspiration: (id, updates) => {
    const inspirations = localStorageAPI.getInspirations()
    const updatedInspirations = inspirations.map(inspiration =>
      inspiration.id === id 
        ? { ...inspiration, ...updates, updated_at: new Date().toISOString() }
        : inspiration
    )
    
    const success = localStorageAPI.saveInspirations(updatedInspirations)
    if (success) {
      return updatedInspirations.find(insp => insp.id === id)
    }
    return null
  },

  // 刪除靈感
  deleteInspiration: (id) => {
    const inspirations = localStorageAPI.getInspirations()
    const updatedInspirations = inspirations.filter(inspiration => inspiration.id !== id)
    return localStorageAPI.saveInspirations(updatedInspirations)
  }
}

// Context
const LocalInspirationContext = createContext()

// Provider
export const LocalInspirationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inspirationReducer, initialState)

  // 載入靈感列表
  const loadInspirations = async (filters = {}) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true })
    
    try {
      // 模擬異步操作
      await new Promise(resolve => setTimeout(resolve, 100))
      
      let inspirations = localStorageAPI.getInspirations()

      // 套用篩選條件
      if (filters.category) {
        inspirations = inspirations.filter(insp => insp.category_id === filters.category)
      }
      
      if (filters.status) {
        inspirations = inspirations.filter(insp => insp.status === filters.status)
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        inspirations = inspirations.filter(insp => 
          insp.title.toLowerCase().includes(searchTerm) ||
          (insp.content && insp.content.toLowerCase().includes(searchTerm))
        )
      }

      // 按創建時間排序
      inspirations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

      dispatch({ type: ActionTypes.SET_INSPIRATIONS, payload: inspirations })
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
    }
  }

  // 新增靈感
  const createInspiration = async (inspirationData) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true })

    try {
      // 模擬異步操作
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const newInspiration = localStorageAPI.addInspiration(inspirationData)
      
      if (!newInspiration) {
        throw new Error('儲存靈感失敗')
      }

      dispatch({ type: ActionTypes.ADD_INSPIRATION, payload: newInspiration })
      return newInspiration
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
      throw error
    }
  }

  // 更新靈感
  const updateInspiration = async (id, updates) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true })

    try {
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const updatedInspiration = localStorageAPI.updateInspiration(id, updates)
      
      if (!updatedInspiration) {
        throw new Error('更新靈感失敗')
      }

      dispatch({ type: ActionTypes.UPDATE_INSPIRATION, payload: updatedInspiration })
      return updatedInspiration
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message })
      throw error
    }
  }

  // 刪除靈感
  const deleteInspiration = async (id) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true })

    try {
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const success = localStorageAPI.deleteInspiration(id)
      
      if (!success) {
        throw new Error('刪除靈感失敗')
      }

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
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const inspirations = localStorageAPI.getInspirations()
      const inspiration = inspirations.find(insp => insp.id === id)
      
      if (!inspiration) {
        throw new Error('找不到指定的靈感')
      }

      dispatch({ type: ActionTypes.SET_CURRENT_INSPIRATION, payload: inspiration })
      return inspiration
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
    loadInspirations()
  }, [])

  // 當篩選條件改變時重新載入
  useEffect(() => {
    loadInspirations(state.filters)
  }, [state.filters])

  const value = {
    // 狀態
    ...state,
    
    // 動作
    loadInspirations,
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
    }),

    // 本地儲存標記
    isLocalStorage: true
  }

  return (
    <LocalInspirationContext.Provider value={value}>
      {children}
    </LocalInspirationContext.Provider>
  )
}

// Hook
export const useLocalInspiration = () => {
  const context = useContext(LocalInspirationContext)
  if (!context) {
    throw new Error('useLocalInspiration must be used within a LocalInspirationProvider')
  }
  return context
}

export default useLocalInspiration