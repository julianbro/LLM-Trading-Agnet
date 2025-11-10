import './StepCommon.css'

function StrategyStep({ strategyData, loadingState, onNext, onBack }) {
  const isEmpty = !strategyData

  return (
    <div className="step-container">
      <div className="step-card">
        <h2 className="step-title">Strategy</h2>
        <p className="step-description">
          Market thesis and role assignments for each asset.
        </p>

        {loadingState === 'loading' ? (
          <div className="state-content">
            <div className="skeleton-block" style={{ height: '120px', marginBottom: '1rem' }}></div>
            <div className="skeleton-block" style={{ height: '150px' }}></div>
          </div>
        ) : loadingState === 'error' ? (
          <div className="state-content">
            <div className="alert alert-error" role="alert">
              <p>Unable to generate strategy. Please try again.</p>
            </div>
          </div>
        ) : isEmpty ? (
          <div className="state-content">
            <div className="empty-state">
              <p className="empty-message">Strategy will be generated here.</p>
              <p className="empty-helper">We'll provide a market thesis and assign roles to each coin.</p>
            </div>
            
            <div className="placeholder-section">
              <h3 className="section-title">Market Thesis</h3>
              <p className="section-helper">High-level market view and rationale for the allocation will appear here.</p>
              <div className="skeleton-block" style={{ height: '80px' }}></div>
            </div>

            <div className="placeholder-section">
              <h3 className="section-title">Coin Roles</h3>
              <p className="section-helper">Each coin's role (core/satellite/hedge) and reasoning will be shown here.</p>
              <div className="skeleton-block" style={{ height: '60px', marginBottom: '0.5rem' }}></div>
              <div className="skeleton-block" style={{ height: '60px', marginBottom: '0.5rem' }}></div>
              <div className="skeleton-block" style={{ height: '60px' }}></div>
            </div>
          </div>
        ) : (
          <div className="state-content">
            <div className="placeholder-section">
              <h3 className="section-title">Market Thesis</h3>
              <p className="thesis-text">{strategyData.thesis}</p>
            </div>

            <div className="placeholder-section">
              <h3 className="section-title">Coin Roles</h3>
              <div className="coin-roles">
                {strategyData.coinRoles.map((role, index) => (
                  <div key={index} className="coin-role-item">
                    <div className="coin-role-header">
                      <span className="coin-symbol">{role.symbol}</span>
                      <span className={`role-badge role-${role.type.toLowerCase()}`}>
                        {role.type}
                      </span>
                    </div>
                    <p className="coin-role-description">{role.description}</p>
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

export default StrategyStep
