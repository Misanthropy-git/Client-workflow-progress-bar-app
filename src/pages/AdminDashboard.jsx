import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [workflows, setWorkflows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/workflows')
      .then(res => res.json())
      .then(data => setWorkflows(data))
      .finally(() => setLoading(false))
  }, [])

  const updateStepStatus = async (workflowId, stepId, status) => {
    await fetch(`/api/workflows/${workflowId}/steps/${stepId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    const res = await fetch('/api/workflows')
    setWorkflows(await res.json())
  }

  if (loading) return <div className="page-container"><div className="card"><p>Loading...</p></div></div>

  return (
    <div className="page-container">
      <div className="card">
        <h1>Admin Dashboard</h1>
        <p className="subtitle">Manage all client workflows</p>
        {workflows.length === 0 ? (
          <p>No workflows created yet.</p>
        ) : (
          <div className="workflow-list">
            {workflows.map(w => (
              <div key={w.id} className="workflow-item">
                <div className="workflow-info">
                  <h3>{w.projectName}</h3>
                  <p>{w.clientName}</p>
                </div>
                <div className="workflow-actions">
                  <Link to={`/client/${w.id}`} className="btn-secondary">View</Link>
                  <div className="step-controls">
                    {w.steps.map(step => (
                      <select
                        key={step.id}
                        value={step.status}
                        onChange={(e) => updateStepStatus(w.id, step.id, e.target.value)}
                        className={`status-select ${step.status}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
