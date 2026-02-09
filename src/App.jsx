import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import { ModalProvider } from './context/ModalContext';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <ModalProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetails />} />

            {/* Placeholders for other links */}
            <Route path="/flights" element={<div className="pt-32 text-center text-xl">Flights Search Engine Coming Soon</div>} />
            <Route path="/visas" element={<div className="pt-32 text-center text-xl">Visa Services Coming Soon</div>} />
            <Route path="*" element={<div className="pt-32 text-center text-xl">404 - Page Not Found</div>} />
          </Routes>
        </Layout>
      </Router>
    </ModalProvider>
  );
};

export default App;
