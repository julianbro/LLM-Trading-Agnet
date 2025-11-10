import './StepCommon.css'

function PlanStep({ planData, loadingState, errorMessage, onNext, onBack }) {
  const isEmpty = !planData

  // Get risk level color
  const getRiskColor = (riskLevel) => {
    switch(riskLevel) {
      case 'Conservative':
        return '#10b981' // green
      case 'Moderate':
        return '#3b82f6' // blue
      case 'Aggressive':
        return '#f59e0b' // orange
      case 'Very Aggressive':
        return '#ef4444' // red
      default:
        return '#6b7280' // gray
    }
  }

  return (
    <div className="step-container">
      <div className="step-card">
        <h2 className="step-title">✨ Your Investment Plan</h2>
        <p className="step-description">
          Our crypto investment wizard has analyzed your goal and created a personalized plan.
        </p>

        {loadingState === 'loading' ? (
          <div className="state-content">
            <div className="loading-wizard">
              <div className="wizard-icon">🧙‍♂️</div>
              <p className="wizard-message">Your investment wizard is crafting a personalized plan...</p>
            </div>
            <div className="skeleton-block" style={{ height: '60px', marginBottom: '1rem' }}></div>
            <div className="skeleton-block" style={{ height: '100px', marginBottom: '1rem' }}></div>
            <div className="skeleton-block" style={{ height: '80px' }}></div>
          </div>
        ) : loadingState === 'error' ? (
          <div className="state-content">
            <div className="alert alert-error" role="alert">
              <p><strong>Oops!</strong> {errorMessage || 'Unable to generate plan. Please try again.'}</p>
              <p className="error-hint">Make sure you have configured your OpenAI API key in the .env file.</p>
            </div>
          </div>
        ) : isEmpty ? (
          <div className="state-content">
            <div className="empty-state">
              <div className="wizard-icon">🧙‍♂️</div>
              <p className="empty-message">Your plan will appear here once generated.</p>
              <p className="empty-helper">Go back and click "Next" to generate your personalized investment plan.</p>
            </div>
          </div>
        ) : (
          <div className="state-content">
            {/* Risk Assessment Section */}
            <div className="plan-section risk-section">
              <div className="section-header">
                <h3 className="section-title">📊 Risk Assessment</h3>
              </div>
              <div className="risk-badge-container">
                <div 
                  className="risk-badge"
                  style={{ 
                    backgroundColor: getRiskColor(planData.riskLevel),
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    display: 'inline-block',
                    marginTop: '8px'
                  }}
                >
                  {planData.riskLevel}
                </div>
              </div>
            </div>

            {/* Required Weekly Return Section */}
            <div className="plan-section">
              <div className="section-header">
                <h3 className="section-title">📈 Required Weekly Return</h3>
              </div>
              <div className="metric-display">
                <span className="metric-value" style={{ fontSize: '2.5rem', color: '#3b82f6' }}>
                  {planData.weeklyReturn}%
                </span>
                <p className="metric-helper">per week to reach your target</p>
              </div>
            </div>

            {/* Initial Coin Ideas Section */}
            <div className="plan-section">
              <div className="section-header">
                <h3 className="section-title">💰 Initial Coin Ideas</h3>
                <p className="section-helper">Cryptocurrencies being considered for your portfolio</p>
              </div>
              <div className="coins-container">
                {planData.coins.map((coin, index) => (
                  <div key={index} className="coin-chip">
                    {coin}
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy Note Section */}
            <div className="plan-section strategy-note-section">
              <div className="section-header">
                <h3 className="section-title">💡 Strategy Overview</h3>
              </div>
              <div className="strategy-note">
                <p>{planData.strategyNote}</p>
              </div>
            </div>

            {/* Wizard Message */}
            <div className="wizard-footer">
              <p className="wizard-message">
                <span className="wizard-icon-small">🧙‍♂️</span>
                This is your high-level plan. Continue to see detailed strategy and trade suggestions!
              </p>
            </div>
          </div>
        )}

        <div className="step-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNext}
            disabled={isEmpty}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlanStep
