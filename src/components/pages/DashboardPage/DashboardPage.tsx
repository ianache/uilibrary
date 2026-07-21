import React from 'react';
import { DashboardLayout } from '../../templates/DashboardLayout';
import { LoginForm } from '../../organisms/LoginForm';
import { Badge } from '../../atoms/Badge';

export const DashboardPage: React.FC = () => {
  const pageContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>TOTAL USERS</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px' }}>12,450</h3>
          <Badge label="+12% this month" variant="success" />
        </div>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>ACTIVE SESSIONS</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px' }}>1,180</h3>
          <Badge label="Stable" variant="info" />
        </div>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>SYSTEM HEALTH</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px' }}>99.9%</h3>
          <Badge label="Operational" variant="success" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 2, padding: '24px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>No recent system warnings reported.</p>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <LoginForm title="Quick Sign-in" />
        </div>
      </div>
    </div>
  );

  return <DashboardLayout headerTitle="User Management Dashboard" content={pageContent} />;
};
