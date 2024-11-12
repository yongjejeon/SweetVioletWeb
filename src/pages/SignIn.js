import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/SignIn.css'; // Import the CSS file for hover effects

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/preferences');
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}> {/* Reduced height by 60px */}
      {/* Left Side Image */}
      <div style={{ flex: '1.7', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <img src="your-image-path.jpg" alt="Sign In Illustration" style={{ width: '80%', maxWidth: '300px' }} />
      </div>

      {/* Right Side Sign In Form */}
      <div style={{ flex: '1.3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '80%', maxWidth: '400px', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '38px', fontWeight: 'bold', marginLeft: '30px', marginBottom: '50px' }}>Sign In</h2>
          <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
            <input
              type="email"
              placeholder="Email Address"
              required
              style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <button
              type="submit"
              className="sign-in-button" // Apply the hover style
            >
              Sign In
            </button>

            {/* Divider with lines and text */}
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px', marginTop: '30px', marginBottom: '30px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
              <span style={{ padding: '0 10px', color: '#666', fontSize: '14px' }}>Or sign in with</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
            </div>

            {/* Social Sign-In Buttons with styled containers and labels */}
            <div style={{ display: 'flex', justifyContent: 'space-around', marginLeft: '18px', marginTop: '10px', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="social-button">
                  <img src={require('../images/apple.png')} alt="Sign in with Apple" style={{ width: '25px', height: '30px' }} />
                </div>
                <span style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>Apple</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="social-button">
                  <img src={require('../images/google.png')} alt="Sign in with Google" style={{ width: '30px', height: '30px' }} />
                </div>
                <span style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>Google</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="social-button">
                  <img src={require('../images/facebook.png')} alt="Sign in with Facebook" style={{ width: '30px', height: '30px' }} />
                </div>
                <span style={{ fontSize: '12px', color: '#666', marginTop: '10px',}}>Facebook</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
