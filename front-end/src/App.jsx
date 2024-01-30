import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './routes/Home';
import Login from './routes/LoginPage';
import ErrorPage from './routes/ErrorPage';
import PrivateRoute from './routes/PrivateRoute';
import Profile from './routes/Profile';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/Profile" element= {<Profile/>} />
          </Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
