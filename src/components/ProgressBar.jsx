export default function ProgressBar({ steps }) {
  const completedSteps = steps.filter(s => s.status === 'completed').length
  const inProgressSteps = steps.filter(s => s.status === 'in_progress').length
  const progress = Math.round(((completedSteps + inProgressSteps * 0.5) / steps.length) * 100)

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-label">Overall Progress</span>
        <span className="progress-percentage">{progress}%</span>
      </div>
      <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={step.id} className="progress-step">
            <div className={`step-indicator ${step.status}`}>
              {step.status === 'completed' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {step.status === 'in_progress' && (
                <div className="step-spinner" />
              )}
              {step.status === 'pending' && (
                <span className="step-number">{index + 1}</span>
              )}
            </div>
            <div className="step-content">
              <span className="step-label">{step.label}</span>
              <span className="step-description">{step.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
