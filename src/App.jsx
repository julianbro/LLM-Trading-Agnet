import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Stepper from './components/Stepper'
import InputStep from './components/steps/InputStep'
import PlanStep from './components/steps/PlanStep'
import StrategyStep from './components/steps/StrategyStep'
import TradesStep from './components/steps/TradesStep'
import { generateInitialPlan } from './services/openaiService'
import { generateMockPlan } from './services/mockService'

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
  const [demoMode, setDemoMode] = useState(false) // Toggle for demo mode

  const handleNext = async () => {
    // If moving from step 1 to step 2, generate the plan
    if (currentStep === 1 && !planData) {
      await generatePlan()
    }
    
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePlan = async () => {
    setLoadingState('loading')
    setErrorMessage('')

    // Use mock service in demo mode or if OpenAI fails
    const result = demoMode 
      ? await generateMockPlan(
          parseFloat(inputData.balance),
          parseInt(inputData.horizon),
          parseFloat(inputData.goal)
        )
      : await generateInitialPlan(
          parseFloat(inputData.balance),
          parseInt(inputData.horizon),
          parseFloat(inputData.goal)
        )

    if (result.success) {
      setPlanData(result.data)
      setLoadingState(null)
    } else {
      // Try mock service as fallback if OpenAI fails
      if (!demoMode) {
        const mockResult = await generateMockPlan(
          parseFloat(inputData.balance),
          parseInt(inputData.horizon),
          parseFloat(inputData.goal)
        )
        if (mockResult.success) {
          setPlanData(mockResult.data)
          setLoadingState(null)
          setErrorMessage('Using demo mode - configure OpenAI API key for real LLM responses')
          return
        }
      }
      
      setLoadingState('error')
      setErrorMessage(result.error || 'Failed to generate plan. Please try again.')
    }
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          {/* Demo Mode Toggle */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '1rem',
            padding: '0.75rem',
            background: demoMode ? '#fef3c7' : '#f3f4f6',
            borderRadius: '0.5rem',
            border: '1px solid ' + (demoMode ? '#fbbf24' : '#e5e7eb')
          }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={demoMode}
                onChange={(e) => setDemoMode(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: '600', color: demoMode ? '#78350f' : '#374151' }}>
                {demoMode ? '🎭 Demo Mode Active' : '💡 Enable Demo Mode'}
              </span>
              <span style={{ fontSize: '0.875rem', color: demoMode ? '#92400e' : '#6b7280' }}>
                {demoMode ? '(Using mock data - no API key needed)' : '(Try without OpenAI API key)'}
              </span>
            </label>
          </div>

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
