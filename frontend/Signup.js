// src/Signup.js
import React, { useState } from 'react';

const Signup = () => {
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Signing up:", signupData);
        // You can add your signup logic here
    };

    return (
        <div className="signup-container" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={signupData.username} 
                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })} 
                    required 
                    style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={signupData.email} 
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} 
                    required 
                    style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={signupData.password} 
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} 
                    required 
                    style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
                />
                <button type="submit" style={{ padding: '10px', width: '100%', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px' }}>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
