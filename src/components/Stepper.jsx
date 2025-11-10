import './Stepper.css'

function Stepper({ steps, currentStep }) {
  return (
    <nav className="stepper" aria-label="Progress">
      <ol className="stepper-list">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <li 
              key={step.id} 
              className={`stepper-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <div className="stepper-marker">
                {isCompleted ? (
                  <svg 
                    className="stepper-check" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                ) : (
                  <span className="stepper-number">{stepNumber}</span>
                )}
              </div>
              <span className="stepper-label">{step.label}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Stepper
