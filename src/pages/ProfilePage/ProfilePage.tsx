import React, { useState, useRef } from 'react';
import { DashboardLayout } from '../../templates/DashboardLayout';
import { DetailLayout } from '../../templates/DetailLayout';
import { Header } from '../../organisms/Header';
import { Sidebar } from '../../organisms/Sidebar';
import { Card } from '../../organisms/Card';
import { Tabs } from '../../organisms/Tabs';
import { Modal } from '../../organisms/Modal';
import { UserMenu } from '../../organisms/UserMenu';
import { Drawer } from '../../organisms/Drawer';
import { FormField } from '../../molecules/FormField';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';
import { Avatar } from '../../atoms/Avatar';
import { ProgressBar } from '../../molecules/ProgressBar';

const mockSidebarItems = [
  { id: 'home', label: 'Inicio', icon: 'home' as const },
  { id: 'users', label: 'Usuarios', icon: 'user' as const },
  { id: 'products', label: 'Productos', icon: 'settings' as const },
  { id: 'orders', label: 'Pedidos', icon: 'check' as const, badge: 5 },
  { id: 'reports', label: 'Reportes', icon: 'info' as const, badge: 2 },
  { id: 'settings', label: 'Configuración', icon: 'settings' as const },
];

export const ProfilePage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  // Profile Edit modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Ana María Torres',
    role: 'Administradora',
    email: 'ana@empresa.com',
    phone: '+51 999 123 456',
    location: 'Lima, Perú',
  });
  const [formInputs, setFormInputs] = useState({ ...profileData });
  const [activeTab, setActiveTab] = useState('activity');

  const mockUser = {
    name: profileData.name,
    role: profileData.role,
    email: profileData.email,
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setTimeout(() => {
      setProfileData({ ...formInputs });
      setEditLoading(false);
      setIsEditModalOpen(false);
    }, 1000);
  };

  const profileTabs = [
    {
      id: 'activity',
      label: 'Actividad Reciente',
      icon: 'info' as const,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '12px 0' }}>
          {[
            { action: 'Publicó reporte de ventas anuales', date: 'Hace 2 horas', icon: 'check' as const },
            { action: 'Aprobó 5 órdenes de compra pendientes', date: 'Hace 4 horas', icon: 'check' as const },
            { action: 'Editó perfil de usuario corporativo', date: 'Ayer', icon: 'edit' as const },
            { action: 'Exportó reporte de conciliación bancaria', date: 'Hace 2 días', icon: 'download' as const },
            { action: 'Inició sesión desde nuevo dispositivo móvil', date: 'Hace 3 días', icon: 'info' as const }
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{
                backgroundColor: 'var(--color-bg-muted)',
                borderRadius: '50%',
                padding: '6px',
                display: 'inline-flex',
                color: 'var(--color-text-secondary)'
              }}>
                <Icon name={item.icon} size="xs" />
              </div>
              <div>
                <Typography variant="body-sm" style={{ margin: '0 0 2px 0', fontWeight: 500 }}>
                  {item.action}
                </Typography>
                <Typography variant="caption" color="muted" style={{ margin: 0 }}>
                  {item.date}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'projects',
      label: 'Proyectos Activos',
      icon: 'calendar' as const,
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', padding: '12px 0' }}>
          {[
            { title: 'Migración a la Nube', progress: 75, status: 'En marcha' },
            { title: 'Rediseño de Sistema de Diseño', progress: 95, status: 'Casi listo' },
            { title: 'Pasarela de Pagos API v3', progress: 40, status: 'En desarrollo' },
          ].map((proj, index) => (
            <Card key={index} title={proj.title} subtitle={proj.status} hoverable>
              <div style={{ marginTop: '16px' }}>
                <ProgressBar value={proj.progress} showValue label="Progreso del proyecto" />
              </div>
            </Card>
          ))}
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
      activeId="settings"
      onItemClick={(id) => console.log('Sidebar navigate:', id)}
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
            onLogoClick={() => console.log('Logo clicked')}
            actions={headerActions}
            user={mockUser}
            onUserClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            onMenuClick={() => setMobileMenuOpen(true)}
            ref={userButtonRef}
          />
        }
      >
        <DetailLayout
          header={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography variant="h3" style={{ margin: 0, fontWeight: 700 }}>
                Perfil del Colaborador
              </Typography>
            </div>
          }
          metaPanel={
            <Card padding="lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
              <Avatar size="xl" initials="AT" alt={profileData.name} />
              
              <div>
                <Typography variant="h4" style={{ margin: '0 0 4px 0', fontWeight: 700 }}>
                  {profileData.name}
                </Typography>
                <Badge variant="primary">{profileData.role}</Badge>
              </div>

              <div style={{ width: '100%', borderTop: '1px solid var(--color-border)', margin: '12px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', textAlign: 'left' }}>
                <div>
                  <Typography variant="caption" color="muted">Correo</Typography>
                  <Typography variant="body-sm" style={{ margin: 0, fontWeight: 500 }}>{profileData.email}</Typography>
                </div>
                <div>
                  <Typography variant="caption" color="muted">Teléfono</Typography>
                  <Typography variant="body-sm" style={{ margin: 0, fontWeight: 500 }}>{profileData.phone}</Typography>
                </div>
                <div>
                  <Typography variant="caption" color="muted">Ubicación</Typography>
                  <Typography variant="body-sm" style={{ margin: 0, fontWeight: 500 }}>{profileData.location}</Typography>
                </div>
                <div>
                  <Typography variant="caption" color="muted">Fecha de Ingreso</Typography>
                  <Typography variant="body-sm" style={{ margin: 0, fontWeight: 500 }}>Enero, 2023</Typography>
                </div>
              </div>

              <Button variant="primary" style={{ width: '100%', marginTop: '8px' }} onClick={() => {
                setFormInputs({ ...profileData });
                setIsEditModalOpen(true);
              }}>
                Editar Perfil
              </Button>
            </Card>
          }
          metaPanelWidth={300}
          metaPanelPosition="right"
          maxWidth={960}
        >
          <Card padding="lg">
            <Tabs
              tabs={profileTabs}
              activeId={activeTab}
              onChange={setActiveTab}
              variant="line"
            />
          </Card>
        </DetailLayout>
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

      {/* Profile Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Perfil"
        description="Modifica la información básica del perfil del colaborador."
        loading={editLoading}
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleEditSave}>
              Guardar Cambios
            </Button>
          </>
        }
      >
        <form onSubmit={handleEditSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px 0' }}>
          <FormField label="Nombre Completo">
            <Input
              value={formInputs.name}
              onChange={(e) => setFormInputs({ ...formInputs, name: e.target.value })}
              required
            />
          </FormField>
          <FormField label="Correo Electrónico">
            <Input
              type="email"
              value={formInputs.email}
              onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
              required
            />
          </FormField>
          <FormField label="Teléfono">
            <Input
              value={formInputs.phone}
              onChange={(e) => setFormInputs({ ...formInputs, phone: e.target.value })}
              required
            />
          </FormField>
          <FormField label="Ubicación">
            <Input
              value={formInputs.location}
              onChange={(e) => setFormInputs({ ...formInputs, location: e.target.value })}
              required
            />
          </FormField>
        </form>
      </Modal>
    </div>
  );
};
