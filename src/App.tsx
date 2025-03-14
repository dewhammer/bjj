import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

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

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
