import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Resume from './pages/Resume'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GettingStarted from './pages/GettingStarted'
import Templates from './pages/Templates'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AuthSuccess from './pages/AuthSuccess'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/templates" element={<Templates />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/getting-started" element={<ProtectedRoute><GettingStarted /></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App