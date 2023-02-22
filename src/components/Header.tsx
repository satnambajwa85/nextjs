import React from 'react';
import { Logo } from './Logo';

export const Header: React.FC = () => (
  <header className="header">
    <div className="container">
      <a className="block logo" href="https://duffel.com" target="_blank" rel="noopener noreferrer">
        <Logo />
      </a>

      <nav>
        <a
          className="active"
          href="/"
          rel="noopener noreferrer"
        >
          Home
        </a>
        <a
          href="/about"
          rel="noopener noreferrer"
        >
          About
        </a>
        <a
          href="/search"
          rel="noopener noreferrer"
        >
          Search
        </a>
        
      </nav>
    </div>
  </header>
);
