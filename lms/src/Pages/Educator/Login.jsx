import React, { useState } from 'react';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
      padding: '16px',
      paddingTop: '32px',
      paddingBottom: '0'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center',
        border: '1px solid rgba(107,114,128,0.2)',
        maxWidth: '400px',
        width: '100%'
      }}>
        {isLoggedIn ? (
          <>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '16px'
            }}>Welcome Back!</h2>
            <button
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#2563eb',
                color: 'white',
                cursor: 'pointer',
                marginTop: '10px'
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              color: '#4b5563',
              marginBottom: '16px'
            }}>Login</h2>
            <input
              style={{
                padding: '8px',
                margin: '8px 0',
                width: '100%',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                outline: 'none'
              }}
              type="text"
              placeholder="Username"
            />
            <input
              style={{
                padding: '8px',
                margin: '8px 0',
                width: '100%',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                outline: 'none'
              }}
              type="email"
              placeholder="Email"
            />
            <input
              style={{
                padding: '8px',
                margin: '8px 0',
                width: '100%',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                outline: 'none'
              }}
              type="tel"
              placeholder="Phone Number"
            />
            <input
              style={{
                padding: '8px',
                margin: '8px 0',
                width: '100%',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                outline: 'none'
              }}
              type="password"
              placeholder="Password"
            />
            <input
              style={{
                padding: '8px',
                margin: '8px 0',
                width: '100%',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                outline: 'none'
              }}
              type="text"
              placeholder="Biometrics (e.g., Fingerprint ID)"
            />
            <button
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#2563eb',
                color: 'white',
                cursor: 'pointer',
                marginTop: '16px'
              }}
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;