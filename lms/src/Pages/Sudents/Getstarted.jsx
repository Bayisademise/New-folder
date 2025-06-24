import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Getstarted = () => {
  const [email, setEmail] = useState('');
  const [showMessage, setShowMessage] = useState(true);
  const [signupMessage, setSignupMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    // Check if user is authenticated
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && users.includes(currentUser)) {
      setIsAuthenticated(true);
    }
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email) {
      setSignupMessage('Please enter a valid email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setSignupMessage('Invalid email format.');
      return;
    }
    // Store email in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.includes(email)) {
      setSignupMessage('This email is already registered. Please log in.');
      return;
    }
    users.push(email);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', email);
    setIsAuthenticated(true);
    console.log('Signup initiated with email:', email);
    setSignupMessage('Successfully signed up! Check your email for confirmation.');
    setEmail('');
    setTimeout(() => {
      setSignupMessage('');
    }, 3000);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center gap-8 pt-16 pb-24 px-8 md:px-36 bg-gray-50 min-h-screen">
      {showMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-center">
          Great start!
        </div>
      )}
      {signupMessage && (
        <div
          className={`${
            signupMessage.includes('Success')
              ? 'bg-green-100 border-green-400 text-green-700'
              : 'bg-red-100 border-red-400 text-red-700'
          } border px-4 py-3 rounded-md text-center`}
        >
          {signupMessage}
        </div>
      )}
      <h1 className="text-2xl md:text-4xl text-gray-800 font-semibold text-center">
        Begin Your Learning Adventure Today
      </h1>
      {isAuthenticated ? (
        <>
          <p className="text-gray-500 text-sm md:text-base text-center max-w-2xl">
            Join our vibrant LMS community and unlock a world of knowledge. Sign up to access personalized courses, interactive lessons, and expert-led tutorials tailored to your goals, available anytime, anywhere.
          </p>
          <div className="w-full max-w-3xl mt-8">
            <video
              className="w-full rounded-lg shadow-md"
              controls
              poster={assets.logo}
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-gray-500 text-sm text-center mt-4">
              Watch our welcome video to see how our LMS transforms your learning experience.
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-sm md:text-base text-center max-w-2xl">
          Please sign up or log in to access the welcome video and additional content.
        </p>
      )}
      <div className="flex flex-col items-center w-full max-w-md bg-white p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {isAuthenticated ? 'Welcome Back!' : 'Create Your Free Account'}
        </h2>
        <div className="w-full flex flex-col gap-4">
          {!isAuthenticated && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-3 text-gray-600 placeholder-gray-400 outline-none w-full"
              />
              <button
                onClick={handleSignup}
                className="px-10 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
              <p className="text-gray-500 text-sm mt-4">
                Already have an account?{' '}
                <button
                  onClick={handleLoginRedirect}
                  className="text-blue-600 hover:underline"
                >
                  Log in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
      <p className="text-gray-500 text-sm text-center max-w-2xl mt-8">
        By signing up, you agree to our{' '}
        <Link to="/privacypolicy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link to="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>.
      </p>
    </div>
  );
};

export default Getstarted;