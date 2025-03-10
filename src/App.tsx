import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DocumentProvider } from './context/DocumentContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import SharedPage from './pages/SharedPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DocumentProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/shared" element={<SharedPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </DocumentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;