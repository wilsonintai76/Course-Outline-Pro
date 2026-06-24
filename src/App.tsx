import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { Layout } from './components/Layout';
import Programmes from './pages/Programmes';
import CourseDetails from './pages/CourseDetails';
import CourseOutlineEditor from './pages/CourseOutlineEditor';
import DocumentEditor from './pages/DocumentEditor';
import Profile from './pages/Profile';
import Departments from './pages/Departments';
import SystemSettings from './pages/SystemSettings';
import UserManagement from './pages/UserManagement';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('access_token');
  if (!token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Navigate to="/programmes" replace />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<SystemSettings />} />
        <Route path="/users" element={<UserManagement />} />
      </Route>
      
      {/* Full screen editors, outside the Layout sidebar */}
      <Route path="/courses/:id/outline" element={<ProtectedRoute><CourseOutlineEditor /></ProtectedRoute>} />
      <Route path="/courses/:id/cqi" element={<ProtectedRoute><DocumentEditor type="cqi" /></ProtectedRoute>} />
      <Route path="/courses/:id/jsu" element={<ProtectedRoute><DocumentEditor type="jsu" /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
