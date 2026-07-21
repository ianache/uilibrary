import React, { useState } from 'react';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';

export interface LoginFormProps {
  onSubmit?: (data: { email: string; pass: string }) => void;
  title?: string;
  isSubmitting?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  title = 'Welcome Back',
  isSubmitting = false,
}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ email, pass });
    }
  };

  return (
    <div
      style={{
        padding: '28px',
        borderRadius: '12px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        backgroundColor: '#ffffff',
        maxWidth: '360px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: '#111827' }}>{title}</h2>
        <Badge label="Secure" variant="success" />
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <FormField
          label="Email Address"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <FormField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          fullWidth
          required
        />
        <Button
          type="submit"
          label="Sign In"
          variant="primary"
          size="medium"
          isLoading={isSubmitting}
          style={{ width: '100%', marginTop: '8px' }}
        />
      </form>
    </div>
  );
};
