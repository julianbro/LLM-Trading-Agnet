import './StepCommon.css'

function PlanStep({ inputData, planData, loadingState, onNext, onBack }) {
  const isEmpty = !planData

  // Calculate required weekly return for display
  const requiredReturn = inputData.balance && inputData.goal && inputData.horizon
    ? (((parseFloat(inputData.goal) / parseFloat(inputData.balance)) ** (1 / parseFloat(inputData.horizon))) - 1) * 100
    : 0

  return (
    <div className="step-container">
      <div className="step-card">
        <h2 className="step-title">Plan Preview</h2>
        <p className="step-description">
          Based on your goal, here's the allocation strategy.
        </p>

        {loadingState === 'loading' ? (
          <div className="state-content">
            <div className="skeleton-block" style={{ height: '60px', marginBottom: '1rem' }}></div>
            <div className="skeleton-block" style={{ height: '100px', marginBottom: '1rem' }}></div>
            <div className="skeleton-block" style={{ height: '80px' }}></div>
          </div>
        ) : loadingState === 'error' ? (
          <div className="state-content">
            <div className="alert alert-error" role="alert">
              <p>Unable to generate plan. Please try again.</p>
            </div>
          </div>
        ) : isEmpty ? (
          <div className="state-content">
            <div className="empty-state">
              <p className="empty-message">Plan will be generated here based on your inputs.</p>
              <p className="empty-helper">Click "Generate Plan" to see your allocation strategy.</p>
            </div>
            
            <div className="placeholder-section">
              <h3 className="section-title">Required Weekly Return</h3>
              <div className="metric-display">
                <span className="metric-value">{requiredReturn.toFixed(2)}%</span>
              </div>
            </div>

            <div className="placeholder-section">
              <h3 className="section-title">Allocation</h3>
              <p className="section-helper">3-6 crypto assets will be shown here with allocation percentages</p>
              <div className="chips-placeholder">
                <div className="chip-skeleton"></div>
                <div className="chip-skeleton"></div>
                <div className="chip-skeleton"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="state-content">
            <div className="placeholder-section">
              <h3 className="section-title">Required Weekly Return</h3>
              <div className="metric-display">
                <span className="metric-value">{planData.weeklyReturn}%</span>
              </div>
            </div>

            <div className="placeholder-section">
              <h3 className="section-title">Allocation</h3>
              <div className="chips-container">
                {planData.allocation.map((coin, index) => (
                  <div key={index} className="chip">
                    {coin.symbol} {coin.percentage}%
                  </div>
                ))}
              </div>
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
