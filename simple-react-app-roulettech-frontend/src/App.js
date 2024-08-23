import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';
import Login from './Login';
import Navigationbar from './NavBar';
import Signup from './SignUp';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className='App-background'>
        <Router>
          <Navigationbar />
          <Container>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
            </Routes>
          </Container>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;