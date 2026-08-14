import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import DSA from './pages/DSA'
import MockInterview from './pages/MockInterview'
import Progress from './pages/Progress'
import Topic from './pages/Topic'
import Question from './pages/Question'
import Login from "./pages/login";
import Register from "./pages/register";
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dsa" element={<DSA />} />
          <Route path="/dsa/:topicName" element={<Topic />} />
          <Route path="/question/:questionId" element={<Question />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route
  path="/progress"
  element={
    <ProtectedRoute>
      <Progress />
    </ProtectedRoute>
  }
/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App