import React, { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        {isLoggedIn ? (
          <>
            <h2>Welcome Back!</h2>
            <button style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
              marginTop: '10px'
            }} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <input style={{
              padding: '8px',
              margin: '10px 0',
              width: '200px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }} type="text" placeholder="Username" />
            <input style={{
              padding: '8px',
              margin: '10px 0',
              width: '200px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }} type="email" placeholder="Email" />
            <input style={{
              padding: '8px',
              margin: '10px 0',
              width: '200px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }} type="tel" placeholder="Phone Number" />
            <input style={{
              padding: '8px',
              margin: '10px 0',
              width: '200px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }} type="password" placeholder="Password" />
            <input style={{
              padding: '8px',
              margin: '10px 0',
              width: '200px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }} type="text" placeholder="Biometrics (e.g., Fingerprint ID)" />
            <button style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
              marginTop: '10px'
            }} onClick={handleLogin}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;