import React from 'react';
import { Navbar } from '../../organisms/Navbar';

export interface DashboardLayoutProps {
  sidebar?: React.ReactNode;
  content?: React.ReactNode;
  headerTitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  sidebar,
  content,
  headerTitle = 'Dashboard',
}) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Navbar logoTitle="AtomicSystem" />
      <div style={{ display: 'flex', gap: '24px', padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <aside style={{ width: '240px', flexShrink: 0 }}>
          {sidebar || (
            <div style={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ marginTop: 0, fontSize: '14px', color: '#64748b' }}>NAVIGATION</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ padding: '8px 12px', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '6px', fontWeight: 600 }}>Overview</li>
                <li style={{ padding: '8px 12px', color: '#334155' }}>Analytics</li>
                <li style={{ padding: '8px 12px', color: '#334155' }}>Settings</li>
              </ul>
            </div>
          )}
        </aside>
        <main style={{ flexGrow: 1 }}>
          <header style={{ marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', color: '#0f172a' }}>{headerTitle}</h2>
          </header>
          {content || (
            <div style={{ padding: '32px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '300px' }}>
              Select a section from the navigation.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
