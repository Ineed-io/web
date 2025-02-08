import './globals.css';
import React, { JSX } from 'react';

const Home: React.FC = (): JSX.Element => {
  return (
    <div className="ineed.io-home-page">
      <h1 className="marg my-64 text-center text-3xl font-bold text-primary">
        Welcome to My Ineed.io
      </h1>
    </div>
  );
};

export default Home;
