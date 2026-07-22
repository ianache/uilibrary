import React from 'react';
import { BlankLayout } from '../../templates/BlankLayout';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { Typography } from '../../atoms/Typography';

export const NotFoundPage: React.FC = () => {
  const handleGoHome = () => {
    console.log('Redirecting to home page...');
    alert('Redirigiendo a la página de inicio...');
  };

  const handleGoBack = () => {
    console.log('Navigating back...');
    if (typeof window !== 'undefined' && window.history) {
      window.history.back();
    }
  };

  return (
    <BlankLayout centered padding="lg" bgColor="var(--color-bg-muted)">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-4)',
        maxWidth: '480px',
        textAlign: 'center',
        fontFamily: 'var(--font-sans)',
        padding: 'var(--space-8)',
        backgroundColor: 'var(--color-bg)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-border)'
      }}>
        {/* Large "404" heading */}
        <div style={{
          fontSize: '8rem',
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--color-primary-600)',
          margin: 0,
          fontFamily: 'var(--font-sans)'
        }}>
          404
        </div>

        {/* Inline Circle Question Mark SVG Illustration */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-secondary)',
          backgroundColor: 'var(--color-bg-muted)',
          borderRadius: '50%',
          padding: '16px',
          margin: '8px 0'
        }}>
          <svg
            viewBox="0 0 24 24"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        {/* Typography h3 title */}
        <Typography variant="h3" style={{ margin: '8px 0 4px 0', fontWeight: 700 }}>
          Página no encontrada
        </Typography>

        {/* Body description */}
        <Typography variant="body" color="secondary" style={{ margin: '0 0 16px 0' }}>
          Lo sentimos, la página que buscas no existe o fue movida a otra dirección.
        </Typography>

        {/* Buttons Action Group */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', width: '100%' }}>
          <Button variant="primary" onClick={handleGoHome} style={{ flex: 1 }}>
            Volver al inicio
          </Button>
          <Button variant="secondary" onClick={handleGoBack} style={{ flex: 1 }}>
            Ir atrás
          </Button>
        </div>

        {/* Support Link */}
        <Divider style={{ margin: '24px 0 12px 0', width: '100%' }} />
        
        <Typography variant="caption" color="muted" style={{ margin: 0 }}>
          ¿Necesitas ayuda? Ponte en contacto con el <a href="#support" style={{ color: 'var(--color-primary-600)', textDecoration: 'none', fontWeight: 500 }}>Soporte Técnico</a>.
        </Typography>
      </div>
    </BlankLayout>
  );
};
