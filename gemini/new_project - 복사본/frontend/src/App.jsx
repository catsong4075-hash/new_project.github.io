import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './router'
import { FormProvider } from './contexts/FormContext'
import { KiroProvider } from './contexts/KiroProvider'
import { KiroAgentProvider } from './contexts/KiroAgentContext'

function App() {
  return (
    <KiroAgentProvider>
      <KiroProvider>
        <FormProvider>
          <Router>
            <AppRouter />
          </Router>
        </FormProvider>
      </KiroProvider>
    </KiroAgentProvider>
  )
}

export default App 