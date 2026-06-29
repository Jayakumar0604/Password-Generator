import React from 'react';
import PasswordGenerator from './components/PasswordGenerator';

const App = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-neutral-950 px-4 py-12 overflow-x-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />
      
      {/* Interactive Mesh/Grid pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
      />
      
      <PasswordGenerator />
    </div>
  );
};

export default App;