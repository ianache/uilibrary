import React from 'react';
import { SearchBar } from '../../molecules/SearchBar';
import { Button } from '../../atoms/Button';

export interface NavbarProps {
  logoTitle?: string;
  onLoginClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  logoTitle = 'UI Kit',
  onLoginClick,
}) => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: '#1e293b',
        color: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#38bdf8' }}>
          {logoTitle}
        </h1>
        <nav style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
          <a href="#docs" style={{ color: '#94a3b8', textDecoration: 'none' }}>Docs</a>
          <a href="#components" style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 600 }}>Components</a>
          <a href="#showcase" style={{ color: '#94a3b8', textDecoration: 'none' }}>Showcase</a>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <SearchBar placeholder="Search..." buttonLabel="Go" />
        <Button label="Sign In" variant="outline" size="small" onClick={onLoginClick} style={{ borderColor: '#38bdf8', color: '#38bdf8' }} />
      </div>
    </header>
  );
};
