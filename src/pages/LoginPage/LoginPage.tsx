import React, { useState } from 'react';
import { AuthLayout } from '../../templates/AuthLayout';
import { LoginForm } from '../../organisms/LoginForm';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = (data: { email: string; password: string; remember: boolean }) => {
    setLoading(true);
    setError(undefined);

    setTimeout(() => {
      setLoading(false);
      if (data.email.includes('error')) {
        setError('El correo electrónico o la contraseña son incorrectos. Por favor, inténtelo de nuevo.');
      } else {
        console.log('Login exitoso:', data);
        alert('¡Inicio de sesión exitoso!');
      }
    }, 1500);
  };

  const brandPanelContent = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      color: '#ffffff',
      fontFamily: 'var(--font-sans)',
      padding: 'var(--space-8)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-md)',
          padding: '8px',
          display: 'inline-flex'
        }}>
          <Icon name="check" size="md" style={{ color: '#ffffff' }} />
        </div>
        <Typography variant="h4" style={{ margin: 0, color: '#ffffff', fontWeight: 700 }}>
          AppDashboard
        </Typography>
      </div>

      <Typography variant="h2" style={{ margin: '0 0 16px 0', color: '#ffffff', lineHeight: 1.2, fontWeight: 700 }}>
        Gestiona tu negocio con claridad
      </Typography>
      
      <Typography variant="body" style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 48px 0', fontSize: '18px' }}>
        Accede a todas tus métricas de rendimiento, informes de ventas, tareas pendientes y administración de usuarios en un solo lugar.
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <Icon name="check" size="sm" style={{ color: 'var(--color-primary-200)', marginTop: '4px' }} />
          <div>
            <Typography variant="body" style={{ margin: '0 0 4px 0', color: '#ffffff', fontWeight: 600 }}>
              Control en Tiempo Real
            </Typography>
            <Typography variant="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
              Visualiza transacciones y cambios de estados de usuarios al instante.
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <Icon name="check" size="sm" style={{ color: 'var(--color-primary-200)', marginTop: '4px' }} />
          <div>
            <Typography variant="body" style={{ margin: '0 0 4px 0', color: '#ffffff', fontWeight: 600 }}>
              Filtros Avanzados
            </Typography>
            <Typography variant="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
              Encuentra lo que necesitas con barras de búsqueda y fichas de categorías.
            </Typography>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <Icon name="check" size="sm" style={{ color: 'var(--color-primary-200)', marginTop: '4px' }} />
          <div>
            <Typography variant="body" style={{ margin: '0 0 4px 0', color: '#ffffff', fontWeight: 600 }}>
              Seguridad y Portales
            </Typography>
            <Typography variant="body-sm" style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
              Gestión de focos accesible y overlays en cajones interactivos y modales.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AuthLayout
      variant="split"
      brandPanel={brandPanelContent}
      logo={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
          <Icon name="check" size="sm" color="primary" />
          <Typography variant="h5" color="primary" style={{ margin: 0, fontWeight: 700 }}>
            AppDashboard
          </Typography>
        </div>
      }
      footer={
        <Typography variant="caption" color="muted" style={{ margin: 0 }}>
          © 2026 AppDashboard · Términos · Privacidad
        </Typography>
      }
    >
      <LoginForm
        onSubmit={handleSubmit}
        onForgotPassword={() => console.log('Forgot password clicked')}
        onRegister={() => console.log('Register clicked')}
        loading={loading}
        error={error}
        socialProviders={['google', 'github']}
        subtitle="Ingresa tus credenciales para acceder a la plataforma"
      />
    </AuthLayout>
  );
};
