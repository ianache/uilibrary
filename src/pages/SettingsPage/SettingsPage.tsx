import React, { useState, useRef } from 'react';
import { DashboardLayout } from '../../templates/DashboardLayout';
import { DetailLayout } from '../../templates/DetailLayout';
import { Header } from '../../organisms/Header';
import { Sidebar } from '../../organisms/Sidebar';
import { Card } from '../../organisms/Card';
import { Tabs } from '../../organisms/Tabs';
import { UserMenu } from '../../organisms/UserMenu';
import { Drawer } from '../../organisms/Drawer';
import { FormField } from '../../molecules/FormField';
import { RadioGroup } from '../../molecules/RadioGroup';
import { FileUpload } from '../../molecules/FileUpload';
import { Notification } from '../../molecules/Notification';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Checkbox } from '../../atoms/Checkbox';
import { Typography } from '../../atoms/Typography';
import { Textarea } from '../../atoms/Textarea';

const mockSidebarItems = [
  { id: 'home', label: 'Inicio', icon: 'home' as const },
  { id: 'users', label: 'Usuarios', icon: 'user' as const },
  { id: 'products', label: 'Productos', icon: 'settings' as const },
  { id: 'orders', label: 'Pedidos', icon: 'check' as const, badge: 5 },
  { id: 'reports', label: 'Reportes', icon: 'info' as const, badge: 2 },
  { id: 'settings', label: 'Configuración', icon: 'settings' as const },
];

export const SettingsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  // Settings state
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [name, setName] = useState('Ana María Torres');
  const [email, setEmail] = useState('ana@empresa.com');
  const [bio, setBio] = useState('Diseñadora de interfaces y líder de producto en el equipo de Core UI.');
  const [twoFactor, setTwoFactor] = useState(false);
  const [notifFrec, setNotifFrec] = useState('daily');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [theme, setTheme] = useState('system');

  const mockUser = {
    name: name,
    role: 'Administradora',
    email: email,
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  const settingsTabs = [
    {
      id: 'profile',
      label: 'Perfil',
      content: (
        <Card title="Ajustes de Perfil" subtitle="Configura tu información pública de colaborador" padding="lg">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <FormField label="Nombre Completo">
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </FormField>
            <FormField label="Correo Electrónico">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormField>
            <FormField label="Biografía">
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
            </FormField>
            <FormField label="Foto de Perfil">
              <FileUpload
                accept="image/*"
                maxSize={2 * 1024 * 1024}
                onFilesChange={(files) => console.log('Files uploaded:', files)}
                label="Arrastra tu foto de perfil aquí"
                sublabel="o haz clic para seleccionar (Máx. 2MB)"
              />
            </FormField>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button type="submit" variant="primary" loading={saving}>
                Guardar Ajustes
              </Button>
            </div>
          </form>
        </Card>
      )
    },
    {
      id: 'security',
      label: 'Seguridad',
      content: (
        <Card title="Seguridad de la Cuenta" subtitle="Administra tus contraseñas y accesos" padding="lg">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <FormField label="Contraseña Actual">
              <Input type="password" placeholder="••••••••" required />
            </FormField>
            <FormField label="Nueva Contraseña">
              <Input type="password" placeholder="Mínimo 8 caracteres" required />
            </FormField>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0' }}>
              <Typography variant="body-sm" style={{ fontWeight: 600 }}>Autenticación en dos factores (2FA)</Typography>
              <Checkbox
                checked={twoFactor}
                onChange={(e) => setTwoFactor(e.target.checked)}
                label="Habilitar código 2FA en el inicio de sesión"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button type="submit" variant="primary" loading={saving}>
                Guardar Ajustes
              </Button>
            </div>
          </form>
        </Card>
      )
    },
    {
      id: 'notifications',
      label: 'Notificaciones',
      content: (
        <Card title="Preferencias de Notificación" subtitle="Elige cómo y cuándo recibir alertas" padding="lg">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <FormField label="Frecuencia de Resumen">
              <RadioGroup
                name="frecuencia"
                value={notifFrec}
                onChange={setNotifFrec}
                options={[
                  { value: 'instant', label: 'Instantáneo', description: 'Enviar alertas tan pronto ocurran' },
                  { value: 'daily', label: 'Resumen Diario', description: 'Agrupar alertas en un correo al final del día' },
                  { value: 'weekly', label: 'Resumen Semanal', description: 'Agrupar alertas los lunes por la mañana' },
                ]}
              />
            </FormField>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '8px 0' }}>
              <Typography variant="body-sm" style={{ fontWeight: 600 }}>Canales de Notificación</Typography>
              <Checkbox checked={notifEmail} onChange={(e) => setNotifEmail(e.target.checked)} label="Recibir notificaciones por correo" />
              <Checkbox checked={notifPush} onChange={(e) => setNotifPush(e.target.checked)} label="Recibir notificaciones push en el navegador" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button type="submit" variant="primary" loading={saving}>
                Guardar Ajustes
              </Button>
            </div>
          </form>
        </Card>
      )
    },
    {
      id: 'appearance',
      label: 'Apariencia',
      content: (
        <Card title="Ajustes de Apariencia" subtitle="Elige el aspecto visual de la aplicación" padding="lg">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <FormField label="Tema de la Interfaz">
              <RadioGroup
                name="tema"
                value={theme}
                onChange={setTheme}
                variant="card"
                options={[
                  { value: 'light', label: 'Tema Claro', description: 'Fondo blanco con alto contraste en textos' },
                  { value: 'dark', label: 'Tema Oscuro', description: 'Ahorro de energía en pantallas con fondo neutral oscuro' },
                  { value: 'system', label: 'Tema de Sistema', description: 'Alinear automáticamente con el tema de tu dispositivo' },
                ]}
              />
            </FormField>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button type="submit" variant="primary" loading={saving}>
                Guardar Ajustes
              </Button>
            </div>
          </form>
        </Card>
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
      {saveSuccess && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          width: '320px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <Notification
            variant="success"
            title="Ajustes actualizados"
            message="Tus cambios se guardaron con éxito en la plataforma."
            onDismiss={() => setSaveSuccess(false)}
            dismissible
          />
        </div>
      )}

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
                Configuración del Sistema
              </Typography>
            </div>
          }
          metaPanel={null}
          maxWidth={800}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Tabs
              tabs={settingsTabs}
              activeId={activeTab}
              onChange={setActiveTab}
              variant="pill"
            />
          </div>
        </DetailLayout>
      </DashboardLayout>

      {/* User Actions Menu */}
      <UserMenu
        user={{ ...mockUser, email: email }}
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
