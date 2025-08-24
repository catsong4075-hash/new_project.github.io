import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import ResultPage from '../pages/ResultPage'
import ShareCardPage from '../pages/ShareCardPage'
import ErrorPage from '../pages/ErrorPage'
import AboutPage from '../pages/AboutPage'
import KiroTestPage from '../pages/KiroTestPage'
import KiroAgentTestPage from '../pages/KiroAgentTestPage'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/share" element={<ShareCardPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/kiro-test" element={<KiroTestPage />} />
      <Route path="/kiro-agent-test" element={<KiroAgentTestPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRouter 