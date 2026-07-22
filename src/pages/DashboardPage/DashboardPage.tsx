import React, { useState, useRef } from 'react';
import { DashboardLayout } from '../../templates/DashboardLayout';
import { Header } from '../../organisms/Header';
import { Sidebar, NavItem } from '../../organisms/Sidebar';
import { Card } from '../../organisms/Card';
import { DataTable, Column } from '../../organisms/DataTable';
import { Tabs, TabItem } from '../../organisms/Tabs';
import { UserMenu } from '../../organisms/UserMenu';
import { Drawer } from '../../organisms/Drawer';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';

interface ActivityLog {
  id: string;
  user: { name: string; email: string; avatarSrc?: string };
  action: string;
  date: string;
  status: 'success' | 'warning' | 'danger';
}

const mockSidebarItems: NavItem[] = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  { id: 'users', label: 'Usuarios', icon: 'user' },
  { id: 'products', label: 'Productos', icon: 'settings' }, // using settings as fallback icon
  { id: 'orders', label: 'Pedidos', icon: 'check', badge: 5 }, // using check as fallback
  { id: 'reports', label: 'Reportes', icon: 'info', badge: 2 }, // using info as fallback
  { id: 'settings', label: 'Configuración', icon: 'settings' },
];

const mockActivityLogs: ActivityLog[] = [
  { id: '1', user: { name: 'Carlos Mendoza', email: 'carlos@empresa.com' }, action: 'Inicio de sesión exitoso', date: 'Hace 5 minutos', status: 'success' },
  { id: '2', user: { name: 'Ana María Torres', email: 'ana@empresa.com' }, action: 'Actualizó perfil de usuario', date: 'Hace 12 minutos', status: 'success' },
  { id: '3', user: { name: 'Juan Pérez', email: 'juan@empresa.com' }, action: 'Intento de login fallido', date: 'Hace 30 minutos', status: 'danger' },
  { id: '4', user: { name: 'Sofía Castro', email: 'sofia@empresa.com' }, action: 'Creado nuevo reporte de ventas', date: 'Hace 1 hora', status: 'success' },
  { id: '5', user: { name: 'Luis Gomez', email: 'luis@empresa.com' }, action: 'Cambio de contraseña requerido', date: 'Hace 2 horas', status: 'warning' },
  { id: '6', user: { name: 'María Rojas', email: 'maria@empresa.com' }, action: 'Archivo CSV exportado', date: 'Hace 3 horas', status: 'success' },
  { id: '7', user: { name: 'Diego Delgado', email: 'diego@empresa.com' }, action: 'Avatar modificado', date: 'Hace 4 horas', status: 'success' },
  { id: '8', user: { name: 'Elena Bazan', email: 'elena@empresa.com' }, action: 'Permisos de editor revocados', date: 'Hace 5 horas', status: 'warning' },
  { id: '9', user: { name: 'Oscar Ortiz', email: 'oscar@empresa.com' }, action: 'Cuenta de usuario desactivada', date: 'Hace 1 día', status: 'danger' },
  { id: '10', user: { name: 'Laura Flores', email: 'laura@empresa.com' }, action: 'Suscripción renovada', date: 'Hace 1 día', status: 'success' },
];

export const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('activity');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeSidebarId, setActiveSidebarId] = useState('home');
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  const mockUser = {
    name: 'Ana María Torres',
    role: 'Administradora',
    email: 'ana@empresa.com',
  };

  const handleSidebarItemClick = (id: string) => {
    setActiveSidebarId(id);
    setMobileMenuOpen(false);
  };

  const activityColumns: Column<ActivityLog>[] = [
    {
      key: 'user',
      header: 'Usuario',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-100)',
            color: 'var(--color-primary-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            {row.user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <Typography variant="body-sm" style={{ margin: 0, fontWeight: 500 }}>
              {row.user.name}
            </Typography>
            <Typography variant="caption" color="muted" style={{ margin: 0 }}>
              {row.user.email}
            </Typography>
          </div>
        </div>
      )
    },
    { key: 'action', header: 'Acción' },
    { key: 'date', header: 'Fecha' },
    {
      key: 'status',
      header: 'Estado',
      align: 'center',
      render: (row) => {
        const variantMap = {
          success: 'success' as const,
          warning: 'warning' as const,
          danger: 'danger' as const,
        };
        const labelMap = {
          success: 'Exitoso',
          warning: 'Advertencia',
          danger: 'Error',
        };
        return (
          <Badge variant={variantMap[row.status]}>
            {labelMap[row.status]}
          </Badge>
        );
      }
    }
  ];

  const dashboardTabs: TabItem[] = [
    {
      id: 'activity',
      label: 'Actividad Reciente',
      icon: 'info',
      content: (
        <DataTable
          data={mockActivityLogs}
          columns={activityColumns}
          selectable
          selectedIds={selectedLogs}
          onSelectionChange={setSelectedLogs}
          caption="Lista de actividades de sistema recientes"
        />
      )
    },
    {
      id: 'monthly',
      label: 'Resumen Mensual',
      icon: 'check',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', padding: '8px 0' }}>
          <Card title="Reporte de Ventas" subtitle="Cierre de Julio" hoverable>
            <Typography variant="body-sm">
              Las ventas de este mes superaron la meta en un 12.4%. El producto estrella fue la suscripción Enterprise.
            </Typography>
          </Card>
          <Card title="Rendimiento del Servidor" subtitle="Uptime 99.98%" hoverable>
            <Typography variant="body-sm">
              El tiempo de respuesta promedio fue de 145ms. No se registraron caídas del servicio principales.
            </Typography>
          </Card>
          <Card title="Nuevos Usuarios" subtitle="+450 esta semana" hoverable>
            <Typography variant="body-sm">
              Registramos un incremento significativo de registros orgánicos procedentes de búsquedas móviles.
            </Typography>
          </Card>
        </div>
      )
    }
  ];

  const userSections = [
    {
      title: 'Mi Cuenta',
      items: [
        { id: 'profile', label: 'Mi Perfil', icon: 'user' as const, onClick: () => console.log('Profile') },
        { id: 'settings', label: 'Configuración', icon: 'settings' as const, onClick: () => console.log('Settings') }
      ]
    },
    {
      items: [
        { id: 'logout', label: 'Cerrar Sesión', icon: 'close' as const, variant: 'danger' as const, onClick: () => console.log('Logout') }
      ]
    }
  ];

  const headerActions = [
    { icon: 'info' as const, label: 'Ayuda', onClick: () => console.log('Help') },
    { icon: 'settings' as const, label: 'Notificaciones', onClick: () => console.log('Notif'), badge: 3 }
  ];

  const sidebarContent = (
    <Sidebar
      items={mockSidebarItems}
      activeId={activeSidebarId}
      onItemClick={handleSidebarItemClick}
      collapsed={sidebarCollapsed}
      onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      user={mockUser}
      onUserClick={() => setIsUserMenuOpen(true)}
    />
  );

  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
      <DashboardLayout
        sidebarCollapsed={sidebarCollapsed}
        sidebar={sidebarContent}
        header={
          <Header
            logo={<Typography variant="h5" color="primary" style={{ margin: 0, fontWeight: 700 }}>AppDashboard</Typography>}
            onLogoClick={() => handleSidebarItemClick('home')}
            actions={headerActions}
            user={mockUser}
            onUserClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            onMenuClick={() => setMobileMenuOpen(true)}
            ref={userButtonRef}
          />
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px var(--space-6)' }}>
          {/* Header Title Section */}
          <div>
            <Typography variant="h3" style={{ margin: '0 0 4px 0', fontWeight: 700 }}>
              Hola de nuevo, Ana María
            </Typography>
            <Typography variant="body" color="muted" style={{ margin: 0 }}>
              Aquí tienes el resumen de tu plataforma para el día de hoy.
            </Typography>
          </div>

          {/* Cards KPI Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            <Card title="Usuarios Activos" hoverable>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px' }}>
                <Typography variant="h2" style={{ margin: 0, fontWeight: 700 }}>1,284</Typography>
                <Badge variant="success">+12%</Badge>
              </div>
            </Card>
            <Card title="Ingresos Semanales" hoverable>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px' }}>
                <Typography variant="h2" style={{ margin: 0, fontWeight: 700 }}>$14,205</Typography>
                <Badge variant="success">+8%</Badge>
              </div>
            </Card>
            <Card title="Pedidos Pendientes" hoverable>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px' }}>
                <Typography variant="h2" style={{ margin: 0, fontWeight: 700 }}>45</Typography>
                <Badge variant="warning">-3%</Badge>
              </div>
            </Card>
            <Card title="Tasa de Conversión" hoverable>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px' }}>
                <Typography variant="h2" style={{ margin: 0, fontWeight: 700 }}>3.84%</Typography>
                <Badge variant="success">+0.4%</Badge>
              </div>
            </Card>
          </div>

          {/* Main Tabs Activity Logs */}
          <Card padding="lg">
            <Tabs
              tabs={dashboardTabs}
              activeId={activeTab}
              onChange={setActiveTab}
              variant="line"
            />
          </Card>
        </div>
      </DashboardLayout>

      {/* Floating UserMenu */}
      <UserMenu
        user={{ ...mockUser, email: 'ana@empresa.com' }}
        items={userSections}
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
        anchorRef={userButtonRef}
      />

      {/* Mobile Drawer Sidebar Navigation */}
      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        placement="left"
        size="sm"
        title="Menú Principal"
      >
        <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
          {sidebarContent}
        </div>
      </Drawer>
    </div>
  );
};
