import React, { createContext, useContext, useState, useEffect } from 'react'
import { kiroAgent, kiroAgentConfig } from '../config/kiroAgent'

// Kiro Agent Context 생성
const KiroAgentContext = createContext()

// Kiro Agent Provider 컴포넌트
export const KiroAgentProvider = ({ children }) => {
  const [agent, setAgent] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)
  const [taskHistory, setTaskHistory] = useState([])

  // Agent 초기화
  useEffect(() => {
    const initializeAgent = async () => {
      try {
        const agentInstance = new kiroAgent.constructor(kiroAgentConfig)
        await agentInstance.initialize()
        setAgent(agentInstance)
        setIsInitialized(true)
        console.log('✅ Kiro Agent가 성공적으로 초기화되었습니다.')
      } catch (error) {
        console.error('❌ Kiro Agent 초기화 실패:', error)
      }
    }

    initializeAgent()
  }, [])

  // 작업 실행 함수
  const executeTask = async (taskType, requirements) => {
    if (!agent || !isInitialized) {
      throw new Error('Kiro Agent가 아직 초기화되지 않았습니다.')
    }

    try {
      setCurrentTask({ type: taskType, requirements, status: 'running' })
      
      const result = await agent.executeTask(taskType, requirements)
      
      // 작업 히스토리에 추가
      const taskRecord = {
        id: Date.now(),
        type: taskType,
        requirements,
        result,
        timestamp: new Date().toISOString(),
        status: 'completed'
      }
      
      setTaskHistory(prev => [...prev, taskRecord])
      setCurrentTask(null)
      
      return result
    } catch (error) {
      const errorResult = agent.handleError(error)
      setCurrentTask(null)
      throw errorResult
    }
  }

  // 품질 검증 함수
  const validateQuality = (result, standards) => {
    if (!agent) return { valid: false, message: 'Agent가 초기화되지 않았습니다.' }
    return agent.validateQuality(result, standards)
  }

  // Agent 상태 확인
  const getAgentStatus = () => {
    return {
      isInitialized,
      language: agent?.config?.language || 'ko-KR',
      agentType: agent?.config?.agentType || 'design',
      currentTask,
      taskCount: taskHistory.length
    }
  }

  // 작업 히스토리 조회
  const getTaskHistory = (filter = null) => {
    if (!filter) return taskHistory
    
    return taskHistory.filter(task => {
      if (filter.type && task.type !== filter.type) return false
      if (filter.status && task.status !== filter.status) return false
      if (filter.dateRange) {
        const taskDate = new Date(task.timestamp)
        const startDate = new Date(filter.dateRange.start)
        const endDate = new Date(filter.dateRange.end)
        return taskDate >= startDate && taskDate <= endDate
      }
      return true
    })
  }

  // Agent 재설정
  const resetAgent = async () => {
    try {
      const newAgent = new kiroAgent.constructor(kiroAgentConfig)
      await newAgent.initialize()
      setAgent(newAgent)
      setTaskHistory([])
      setCurrentTask(null)
      console.log('🔄 Kiro Agent가 재설정되었습니다.')
    } catch (error) {
      console.error('❌ Kiro Agent 재설정 실패:', error)
    }
  }

  const contextValue = {
    agent,
    isInitialized,
    currentTask,
    taskHistory,
    executeTask,
    validateQuality,
    getAgentStatus,
    getTaskHistory,
    resetAgent,
    config: kiroAgentConfig
  }

  return (
    <KiroAgentContext.Provider value={contextValue}>
      {children}
    </KiroAgentContext.Provider>
  )
}

// Kiro Agent Hook
export const useKiroAgent = () => {
  const context = useContext(KiroAgentContext)
  if (!context) {
    throw new Error('useKiroAgent는 KiroAgentProvider 내부에서만 사용할 수 있습니다.')
  }
  return context
}

// Kiro Agent 상태 표시 컴포넌트
export const KiroAgentStatus = () => {
  const { getAgentStatus } = useKiroAgent()
  const status = getAgentStatus()

  return (
    <div className="kiro-agent-status">
      <div className="status-indicator">
        <span className={`status-dot ${status.isInitialized ? 'status-dot--active' : 'status-dot--inactive'}`}></span>
        <span className="status-text">
          {status.isInitialized ? 'Kiro Agent 준비됨' : 'Kiro Agent 초기화 중...'}
        </span>
      </div>
      <div className="status-details">
        <span>언어: {status.language}</span>
        <span>타입: {status.agentType}</span>
        <span>작업 수: {status.taskCount}</span>
      </div>
    </div>
  )
}

export default KiroAgentContext 