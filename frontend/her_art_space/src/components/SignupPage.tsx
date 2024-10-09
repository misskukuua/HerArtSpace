import React, { useState } from 'react';
import './SignupPage.css';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false); // Add showPassword state

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for sign-up goes here (API call, validation, etc.)
    console.log("Signing up with:", email, username, password, confirmPassword);
  };

  const handleGoogleSignUp = () => {
    // Google sign-up integration
    console.log("Signing up with Google");
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h1 className="title">HerArtSpace</h1>
        <h2 className="signup-title">Create your account</h2>

        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="signup-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="signup-input"
          type={showPassword ? "text" : "password"} // Toggle visibility for password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="signup-input"
          type={showPassword ? "text" : "password"} // Toggle visibility for confirm password
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="show-password">
          <input
            type="checkbox"
            id="show-password"
            checked={showPassword} // Ensure this is a boolean
            onChange={() => setShowPassword(!showPassword)} // Toggle showPassword state
          />
          <label htmlFor="show-password">Show Password</label>
        </div>
        
        <div className="error-message"></div>
        <button className="signup-button" type="submit">
          Sign Up
        </button>

        <div className="divider">OR</div>

        <button className="social-login-button" onClick={handleGoogleSignUp}>
          <img
            src="/assets/google-icon-logo.svg"
            alt="Google logo"
            className="social-login-icon"
          />
          Sign Up with Google
        </button>

        <p className="login-link">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
