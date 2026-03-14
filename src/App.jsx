import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Resume from './pages/Resume'
import Login from './pages/Login'
import Signup from './pages/Signup'
import GettingStarted from './pages/GettingStarted'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/getting-started" element={<GettingStarted />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App