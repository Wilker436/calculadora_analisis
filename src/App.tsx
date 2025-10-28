import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState, useEffect } from 'react'
import type { ComponentType } from 'react'

const Home = lazy(() => import('./pages/home/home'))

const LoadingSpinner = () => (
  <div className="min-h-screen bg-[#424874] flex flex-col items-center justify-center">
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 border-4 border-[#A6B1E1] border-t-4 border-t-[#DCD6F7] rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-[#A6B1E1] border-t-4 border-t-[#DCD6F7] rounded-full animate-spin animation-delay-500"></div>
      </div>
      <h2 className="text-2xl font-bold text-[#DCD6F7] mb-2">Cargando Calculadora</h2>
      <p className="text-[#A6B1E1] text-lg">Por favor espera...</p>
      <div className="flex justify-center mt-4 space-x-1">
        <div className="w-2 h-2 bg-[#DCD6F7] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#DCD6F7] rounded-full animate-bounce animation-delay-150"></div>
        <div className="w-2 h-2 bg-[#DCD6F7] rounded-full animate-bounce animation-delay-300"></div>
      </div>
    </div>
  </div>
)

// HOC para simular carga
function withSimulatedLoading<T extends {}>(Component: ComponentType<T>, delay: number = 2000) {
  return function WithSimulatedLoading(props: T) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, delay)

      return () => clearTimeout(timer)
    }, [delay])

    if (isLoading) {
      return <LoadingSpinner />
    }

    return <Component {...props} />
  }
}

const HomeWithLoading = withSimulatedLoading(Home, 500)

function App() {
  return (
    <main>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomeWithLoading />} />
          </Routes>
        </Suspense>
      </Router>
    </main>
  )
}

export default App