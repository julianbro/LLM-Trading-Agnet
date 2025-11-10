import { useState } from 'react'
import './StepCommon.css'

function InputStep({ inputData, setInputData, loadingState, onNext }) {
  const [errors, setErrors] = useState({})

  const validateAndProceed = async () => {
    const newErrors = {}
    
    if (!inputData.balance || parseFloat(inputData.balance) <= 0) {
      newErrors.balance = 'Please enter a valid balance greater than 0'
    }
    
    if (!inputData.horizon || parseInt(inputData.horizon) <= 0) {
      newErrors.horizon = 'Please enter a valid time horizon greater than 0'
    }
    
    if (!inputData.goal || parseFloat(inputData.goal) <= 0) {
      newErrors.goal = 'Please enter a valid target balance greater than 0'
    }
    
    if (inputData.goal && inputData.balance && parseFloat(inputData.goal) <= parseFloat(inputData.balance)) {
      newErrors.goal = 'Target balance must be greater than current balance'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      await onNext()
    }
  }

  const handleChange = (field, value) => {
    setInputData({ ...inputData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  return (
    <div className="step-container">
      <div className="step-card">
        <h2 className="step-title">Enter Your Goal</h2>
        <p className="step-description">
          Start by telling us about your current balance, investment timeline, and target balance.
        </p>

        <div className="form-group">
          <label htmlFor="balance" className="form-label">
            Current Balance (USD)
          </label>
          <input
            id="balance"
            type="number"
            className={`form-input ${errors.balance ? 'error' : ''}`}
            value={inputData.balance}
            onChange={(e) => handleChange('balance', e.target.value)}
            placeholder="10000"
            min="0"
            step="0.01"
            aria-describedby={errors.balance ? 'balance-error' : 'balance-helper'}
            aria-invalid={errors.balance ? 'true' : 'false'}
          />
          {errors.balance ? (
            <p id="balance-error" className="form-error" role="alert">
              {errors.balance}
            </p>
          ) : (
            <p id="balance-helper" className="form-helper">
              Enter the amount you want to invest
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="horizon" className="form-label">
            Time Horizon (weeks)
          </label>
          <input
            id="horizon"
            type="number"
            className={`form-input ${errors.horizon ? 'error' : ''}`}
            value={inputData.horizon}
            onChange={(e) => handleChange('horizon', e.target.value)}
            placeholder="12"
            min="1"
            step="1"
            aria-describedby={errors.horizon ? 'horizon-error' : 'horizon-helper'}
            aria-invalid={errors.horizon ? 'true' : 'false'}
          />
          {errors.horizon ? (
            <p id="horizon-error" className="form-error" role="alert">
              {errors.horizon}
            </p>
          ) : (
            <p id="horizon-helper" className="form-helper">
              How many weeks do you want to invest for?
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="goal" className="form-label">
            Target Balance (USD)
          </label>
          <input
            id="goal"
            type="number"
            className={`form-input ${errors.goal ? 'error' : ''}`}
            value={inputData.goal}
            onChange={(e) => handleChange('goal', e.target.value)}
            placeholder="15000"
            min="0"
            step="0.01"
            aria-describedby={errors.goal ? 'goal-error' : 'goal-helper'}
            aria-invalid={errors.goal ? 'true' : 'false'}
          />
          {errors.goal ? (
            <p id="goal-error" className="form-error" role="alert">
              {errors.goal}
            </p>
          ) : (
            <p id="goal-helper" className="form-helper">
              What balance do you want to reach?
            </p>
          )}
        </div>

        <div className="step-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={validateAndProceed}
            disabled={loadingState === 'loading'}
          >
            {loadingState === 'loading' ? 'Generating Plan...' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputStep
