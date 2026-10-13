import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'

export default function ClientView() {
  const { id } = useParams()
  const [workflow, setWorkflow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/api/workflows/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Workflow not found')
        return res.json()
      })
      .then(data => setWorkflow(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="page-container"><div className="card"><p>Loading...</p></div></div>
  if (error) return <div className="page-container"><div className="card error"><p>{error}</p></div></div>

  return (
    <div className="page-container">
      <div className="card">
        <div className="client-header">
          <h1>{workflow.projectName}</h1>
          <p className="subtitle">Client: {workflow.clientName}</p>
          <p className="last-updated">Last updated: {new Date(workflow.updatedAt).toLocaleString()}</p>
        </div>
        <ProgressBar steps={workflow.steps} />
      </div>
    </div>
  )
}
