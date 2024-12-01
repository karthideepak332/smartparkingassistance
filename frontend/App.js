import React, { useState } from 'react';
// Import Home component
import Dashboard from './Dashboard';
import Admin from './Admin';
import User from './User';
import Home from './Home'; 

const App = () => {
  const [view, setView] = useState('home'); // Default view is 'home'

  const renderView = () => {
    switch (view) {
      case 'admin':
        return <Admin />;
      case 'user':
        return <User />;
      case 'dashboard':
        return <Dashboard />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {/* Simple Navigation */}
      <nav style={{ backgroundColor: '#4b9cd3', padding: '10px', display: 'flex', gap: '10px' }}>
      <button onClick={() => setView('home')} style={{ color: '#fff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
  Smart Parking Assistance Hub
</button>
        <button onClick={() => setView('dashboard')} style={{ color: '#fff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          Dashboard
        </button>
       

        <button onClick={() => setView('admin')} style={{ color: '#fff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          Admin
        </button>
        <button onClick={() => setView('user')} style={{ color: '#fff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          User
        </button>
        
      </nav>

      <div style={{ padding: '20px' }}>
        {renderView()}
      </div>
    </div>
  );
};

export default App;
