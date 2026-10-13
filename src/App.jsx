import { Routes, Route } from 'react-router-dom'
import CreateWorkflow from './pages/CreateWorkflow'
import ClientView from './pages/ClientView'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateWorkflow />} />
      <Route path="/client/:id" element={<ClientView />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}
