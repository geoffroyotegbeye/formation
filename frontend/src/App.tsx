// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import AnimatedBackground from './components/AnimatedBackground';
import PageWrapper from './components/PageWrapper';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Bootcamp from './pages/Bootcamp';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCandidatures from './pages/admin/AdminCandidatures';
import AdminMessages from './pages/admin/AdminMessages';
import UserProfile from './pages/admin/UserProfile';
import AdminQuotes from './pages/admin/AdminQuotes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
          <AnimatedBackground />
          
          <div className="relative z-10">
            <Sidebar />
            <main className="lg:ml-0 pb-20 lg:pb-0">
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                  <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                  <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
                  <Route path="/bootcamp" element={<PageWrapper><Bootcamp /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                  <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                  
                  {/* Admin routes */}
                  <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute requireAdmin={true}><AdminUsers /></ProtectedRoute>} />
                  <Route path="/admin/candidatures" element={<ProtectedRoute requireAdmin={true}><AdminCandidatures /></ProtectedRoute>} />
                  <Route path="/admin/quotes" element={<ProtectedRoute requireAdmin={true}><AdminQuotes /></ProtectedRoute>} />
                  <Route path="/admin/messages" element={<ProtectedRoute requireAdmin={true}><AdminMessages /></ProtectedRoute>} />
                  <Route path="/admin/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;