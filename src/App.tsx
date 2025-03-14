import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy-loaded page components
const HomePage = lazy(() => import('./pages/HomePage'));
const EbookPage = lazy(() => import('./pages/EbookPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage'));
const WorkshopsPage = lazy(() => import('./pages/WorkshopsPage'));
const MembersPage = lazy(() => import('./pages/MembersPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const TrainingProgramPage = lazy(() => import('./pages/TrainingProgramPage'));
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'));

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('App Error:', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-700 mb-4">Please try refreshing the page</p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-w-full">
            {this.state.error?.toString()}
          </pre>
          <button 
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen w-full overflow-hidden bg-background">
          <Header />
          <main className="flex-grow w-full">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ebook" element={<EbookPage />} />
                <Route path="/training" element={<TrainingPage />} />
                <Route path="/workshops" element={<WorkshopsPage />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/training/:programId" element={<TrainingProgramPage />} />
                <Route path="/payment-success" element={<PaymentSuccessPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
