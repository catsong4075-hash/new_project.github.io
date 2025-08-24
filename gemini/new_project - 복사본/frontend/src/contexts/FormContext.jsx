import React, { createContext, useContext, useReducer } from 'react'

// 초기 상태
const initialState = {
  formData: {
    name: '',
    birthDate: '',
    birthTime: ''
  },
  luckData: null,
  loading: false,
  error: null
}

// 액션 타입
const ACTIONS = {
  SET_FORM_DATA: 'SET_FORM_DATA',
  SET_LUCK_DATA: 'SET_LUCK_DATA',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_FORM: 'CLEAR_FORM',
  CLEAR_LUCK_DATA: 'CLEAR_LUCK_DATA'
}

// 리듀서
const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload
        }
      }
    
    case ACTIONS.SET_LUCK_DATA:
      return {
        ...state,
        luckData: action.payload,
        loading: false,
        error: null
      }
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null
      }
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    
    case ACTIONS.CLEAR_FORM:
      return {
        ...state,
        formData: initialState.formData,
        error: null
      }
    
    case ACTIONS.CLEAR_LUCK_DATA:
      return {
        ...state,
        luckData: null,
        error: null
      }
    
    default:
      return state
  }
}

// Context 생성
const FormContext = createContext()

// Provider 컴포넌트
export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState)

  // 액션 생성자들
  const setFormData = (formData) => {
    dispatch({ type: ACTIONS.SET_FORM_DATA, payload: formData })
  }

  const setLuckData = (luckData) => {
    dispatch({ type: ACTIONS.SET_LUCK_DATA, payload: luckData })
  }

  const setLoading = (loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading })
  }

  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error })
  }

  const clearForm = () => {
    dispatch({ type: ACTIONS.CLEAR_FORM })
  }

  const clearLuckData = () => {
    dispatch({ type: ACTIONS.CLEAR_LUCK_DATA })
  }

  const value = {
    ...state,
    setFormData,
    setLuckData,
    setLoading,
    setError,
    clearForm,
    clearLuckData
  }

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

// 커스텀 훅
export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
} 