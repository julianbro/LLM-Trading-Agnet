import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Stepper from './components/Stepper'
import InputStep from './components/steps/InputStep'
import PlanStep from './components/steps/PlanStep'
import StrategyStep from './components/steps/StrategyStep'
import TradesStep from './components/steps/TradesStep'

const STEPS = [
  { id: 1, label: 'Your Goal', component: InputStep },
  { id: 2, label: 'Plan Preview', component: PlanStep },
  { id: 3, label: 'Strategy', component: StrategyStep },
  { id: 4, label: 'Trades', component: TradesStep },
]

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [inputData, setInputData] = useState({
    balance: '',
    horizon: '',
    goal: '',
  })
  const [planData, setPlanData] = useState(null)
  const [strategyData, setStrategyData] = useState(null)
  const [tradesData, setTradesData] = useState(null)
  const [loadingState, setLoadingState] = useState(null) // null, 'loading', 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <Stepper 
            steps={STEPS} 
            currentStep={currentStep}
          />
          
          <div className="step-content">
            <CurrentStepComponent
              inputData={inputData}
              setInputData={setInputData}
              planData={planData}
              setPlanData={setPlanData}
              strategyData={strategyData}
              setStrategyData={setStrategyData}
              tradesData={tradesData}
              setTradesData={setTradesData}
              loadingState={loadingState}
              setLoadingState={setLoadingState}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              isFirstStep={currentStep === 1}
              isLastStep={currentStep === STEPS.length}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
