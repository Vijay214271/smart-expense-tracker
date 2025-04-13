// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import OfflineBanner from './components/OfflineBanner';
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <OfflineBanner />
      <Navbar />
      <div style={{ paddingTop: '0px' }}>
        {/* 👆 Add padding to avoid hiding under fixed navbar */}
        <ToastContainer position="bottom-center" autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
