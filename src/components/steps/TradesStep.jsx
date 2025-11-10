import './StepCommon.css'

function TradesStep({ tradesData, loadingState, onBack, isLastStep }) {
  const isEmpty = !tradesData

  return (
    <div className="step-container">
      <div className="step-card">
        <h2 className="step-title">Trade Plan</h2>
        <p className="step-description">
          Suggested entry points, stop losses, and take profits for each position.
        </p>

        {loadingState === 'loading' ? (
          <div className="state-content">
            <div className="skeleton-block" style={{ height: '200px', marginBottom: '1rem' }}></div>
            <div className="skeleton-block" style={{ height: '80px' }}></div>
          </div>
        ) : loadingState === 'error' ? (
          <div className="state-content">
            <div className="alert alert-error" role="alert">
              <p>Unable to generate trade plan. Please try again.</p>
            </div>
          </div>
        ) : isEmpty ? (
          <div className="state-content">
            <div className="empty-state">
              <p className="empty-message">Trade suggestions will appear here.</p>
              <p className="empty-helper">You'll see entries, stops, take-profits, position sizes, and notes for each coin.</p>
            </div>
            
            <div className="placeholder-section">
              <h3 className="section-title">Trades Table</h3>
              <div className="table-container">
                <table className="trades-table">
                  <thead>
                    <tr>
                      <th>Coin</th>
                      <th>Entry</th>
                      <th>Stop Loss</th>
                      <th>Take Profit</th>
                      <th>Position Size</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="skeleton-row">
                      <td colSpan="6">
                        <div className="skeleton-block" style={{ height: '40px' }}></div>
                      </td>
                    </tr>
                    <tr className="skeleton-row">
                      <td colSpan="6">
                        <div className="skeleton-block" style={{ height: '40px' }}></div>
                      </td>
                    </tr>
                    <tr className="skeleton-row">
                      <td colSpan="6">
                        <div className="skeleton-block" style={{ height: '40px' }}></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="placeholder-section">
              <h3 className="section-title">Global Guidance</h3>
              <p className="section-helper">Overall recommendations and risk management notes will appear here.</p>
              <div className="skeleton-block" style={{ height: '60px' }}></div>
            </div>
          </div>
        ) : (
          <div className="state-content">
            <div className="placeholder-section">
              <div className="table-container">
                <table className="trades-table">
                  <thead>
                    <tr>
                      <th>Coin</th>
                      <th>Entry</th>
                      <th>Stop Loss</th>
                      <th>Take Profit</th>
                      <th>Position Size</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradesData.trades.map((trade, index) => (
                      <tr key={index}>
                        <td className="coin-cell">{trade.coin}</td>
                        <td>${trade.entry.toLocaleString()}</td>
                        <td className="danger-text">${trade.stopLoss.toLocaleString()}</td>
                        <td className="success-text">${trade.takeProfit.toLocaleString()}</td>
                        <td>${trade.positionSize.toLocaleString()}</td>
                        <td className="notes-cell">{trade.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {tradesData.globalGuidance && (
              <div className="placeholder-section">
                <h3 className="section-title">Global Guidance</h3>
                <p className="guidance-text">{tradesData.globalGuidance}</p>
              </div>
            )}
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
          {isLastStep && (
            <button
              type="button"
              className="btn btn-primary"
              disabled={isEmpty}
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TradesStep
