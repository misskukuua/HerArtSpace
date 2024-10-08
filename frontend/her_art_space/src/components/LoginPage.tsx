import React, { useState } from 'react';
import './LoginPage.css';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for login goes here (API call, validation, etc.)
    console.log("Logging in with:", email, password);
  };

  const handleGoogleLogin = () => {
    // Google login integration
    console.log("Logging in with Google");
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
      <h1 className="title">HerArtSpace</h1>
        <h2 className="login-title">Login to proceed</h2>
        <input
          className="login-input"
          type="email"
          placeholder="E-mail or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <a className="forgot-password" href="#">
          Forgot Password?
        </a>
        <button className="login-button" type="submit">
          Log In
        </button>

        <div className="divider">OR</div>

        <button className="social-login-button" onClick={handleGoogleLogin}>
        <img
            src="/assets/google-icon-logo.svg"
            alt="Google logo"
            className="social-login-icon"
          />
          Sign Up with Google
        </button>

        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
