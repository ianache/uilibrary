import React, { useState, useMemo, useRef } from 'react';
import { DashboardLayout } from '../../templates/DashboardLayout';
import { ListingLayout } from '../../templates/ListingLayout';
import { Header } from '../../organisms/Header';
import { Sidebar } from '../../organisms/Sidebar';
import { FilterBar, FilterConfig } from '../../organisms/FilterBar';
import { DataTable, Column } from '../../organisms/DataTable';
import { Modal } from '../../organisms/Modal';
import { Drawer } from '../../organisms/Drawer';
import { UserMenu } from '../../organisms/UserMenu';
import { UserCard } from '../../molecules/UserCard';
import { Tabs } from '../../organisms/Tabs';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockSidebarItems = [
  { id: 'home', label: 'Inicio', icon: 'home' as const },
  { id: 'users', label: 'Usuarios', icon: 'user' as const },
  { id: 'products', label: 'Productos', icon: 'settings' as const },
  { id: 'orders', label: 'Pedidos', icon: 'check' as const, badge: 5 },
  { id: 'reports', label: 'Reportes', icon: 'info' as const, badge: 2 },
  { id: 'settings', label: 'Configuración', icon: 'settings' as const },
];

const initialUsers: User[] = [
  { id: '1', name: 'Carlos Mendoza', email: 'carlos.mendoza@empresa.com', role: 'admin', status: 'active', createdAt: '2023-01-15' },
  { id: '2', name: 'Ana María Torres', email: 'ana.torres@empresa.com', role: 'admin', status: 'active', createdAt: '2023-02-10' },
  { id: '3', name: 'Juan Pérez', email: 'juan.perez@empresa.com', role: 'editor', status: 'active', createdAt: '2023-03-22' },
  { id: '4', name: 'Sofía Castro', email: 'sofia.castro@empresa.com', role: 'editor', status: 'inactive', createdAt: '2023-04-05' },
  { id: '5', name: 'Luis Gomez', email: 'luis.gomez@empresa.com', role: 'viewer', status: 'active', createdAt: '2023-05-12' },
  { id: '6', name: 'María Rojas', email: 'maria.rojas@empresa.com', role: 'viewer', status: 'active', createdAt: '2023-06-18' },
  { id: '7', name: 'Diego Delgado', email: 'diego.delgado@empresa.com', role: 'editor', status: 'active', createdAt: '2023-07-02' },
  { id: '8', name: 'Elena Bazan', email: 'elena.bazan@empresa.com', role: 'viewer', status: 'inactive', createdAt: '2023-08-11' },
  { id: '9', name: 'Oscar Ortiz', email: 'oscar.ortiz@empresa.com', role: 'viewer', status: 'active', createdAt: '2023-09-25' },
  { id: '10', name: 'Laura Flores', email: 'laura.flores@empresa.com', role: 'editor', status: 'active', createdAt: '2023-10-30' },
  { id: '11', name: 'Ricardo Ruiz', email: 'ricardo.ruiz@empresa.com', role: 'viewer', status: 'active', createdAt: '2023-11-04' },
  { id: '12', name: 'Gabriela Soto', email: 'gabriela.soto@empresa.com', role: 'editor', status: 'active', createdAt: '2023-12-15' },
  { id: '13', name: 'Fernando Farfán', email: 'fernando.farfan@empresa.com', role: 'viewer', status: 'inactive', createdAt: '2024-01-20' },
  { id: '14', name: 'Patricia Paz', email: 'patricia.paz@empresa.com', role: 'editor', status: 'active', createdAt: '2024-02-14' },
  { id: '15', name: 'Javier Jiménez', email: 'javier.jimenez@empresa.com', role: 'viewer', status: 'active', createdAt: '2024-03-08' },
  { id: '16', name: 'Camila Cárdenas', email: 'camila.cardenas@empresa.com', role: 'editor', status: 'active', createdAt: '2024-04-19' },
  { id: '17', name: 'Manuel Morales', email: 'manuel.morales@empresa.com', role: 'viewer', status: 'inactive', createdAt: '2024-05-24' },
  { id: '18', name: 'Rosa Ramos', email: 'rosa.ramos@empresa.com', role: 'viewer', status: 'active', createdAt: '2024-06-11' },
  { id: '19', name: 'Hugo Herrera', email: 'hugo.herrera@empresa.com', role: 'admin', status: 'active', createdAt: '2024-07-03' },
  { id: '20', name: 'Teresa Tejada', email: 'teresa.tejada@empresa.com', role: 'viewer', status: 'active', createdAt: '2024-07-20' },
];

const filterConfigs: FilterConfig[] = [
  {
    id: 'role',
    label: 'Rol de Usuario',
    type: 'select',
    multiple: true,
    options: [
      { value: 'admin', label: 'Administrador' },
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Visualizador' },
    ]
  },
  {
    id: 'status',
    label: 'Estado de Cuenta',
    type: 'radio',
    options: [
      { value: 'all', label: 'Todos los estados' },
      { value: 'active', label: 'Solo Activos' },
      { value: 'inactive', label: 'Solo Inactivos' },
    ]
  }
];

export const UsersPage: React.FC = () => {
  // Navigation Shell State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  // Data & Filters State
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({
    role: [],
    status: 'all',
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Interactivity Modals/Drawers State
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToView, setUserToView] = useState<User | null>(null);

  const mockUser = {
    name: 'Ana María Torres',
    role: 'Administradora',
    email: 'ana@empresa.com',
  };

  // Filter Logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const selectedRoles = (filterValues.role as string[]) || [];
      const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(user.role);

      const matchesStatus = filterValues.status === 'all' || user.status === filterValues.status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, filterValues]);

  // Actions Callbacks
  const handleDeleteConfirm = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setSelectedIds(selectedIds.filter(id => id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterValues({
      role: [],
      status: 'all'
    });
  };

  // DataTable Columns Configuration
  const userColumns: Column<User>[] = [
    {
      key: 'name',
      header: 'Nombre Completo',
      width: '280px',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-100)',
            color: 'var(--color-primary-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            {row.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <Typography variant="body-sm" style={{ margin: 0, fontWeight: 500 }}>
              {row.name}
            </Typography>
            <Typography variant="caption" color="muted" style={{ margin: 0 }}>
              {row.email}
            </Typography>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Rol',
      render: (row) => {
        const variants = {
          admin: 'primary' as const,
          editor: 'default' as const,
          viewer: 'default' as const,
        };
        const labels = {
          admin: 'Administrador',
          editor: 'Editor',
          viewer: 'Visualizador',
        };
        return <Badge variant={variants[row.role]}>{labels[row.role]}</Badge>;
      }
    },
    {
      key: 'status',
      header: 'Estado',
      render: (row) => {
        const variants = {
          active: 'success' as const,
          inactive: 'danger' as const,
        };
        const labels = {
          active: 'Activo',
          inactive: 'Inactivo',
        };
        return <Badge variant={variants[row.status]}>{labels[row.status]}</Badge>;
      }
    },
    {
      key: 'createdAt',
      header: 'Fecha Registro',
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (row) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
          <Button
            variant="ghost"
            onClick={() => setUserToView(row)}
            aria-label={`Ver detalles de ${row.name}`}
            style={{ minWidth: 'auto', padding: '6px' }}
          >
            <Icon name="info" size="sm" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => setUserToDelete(row)}
            aria-label={`Eliminar a ${row.name}`}
            style={{ minWidth: 'auto', padding: '6px', color: 'var(--color-danger-600)' }}
          >
            <Icon name="close" size="sm" />
          </Button>
        </div>
      )
    }
  ];

  // User details Drawer sub-tabs
  const drawerTabs = useMemo(() => {
    if (!userToView) return [];
    return [
      {
        id: 'info',
        label: 'Detalles',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '12px 0' }}>
            <div>
              <Typography variant="caption" color="muted">ID de Registro</Typography>
              <Typography variant="body-sm" style={{ fontWeight: 500 }}>{userToView.id}</Typography>
            </div>
            <div>
              <Typography variant="caption" color="muted">Correo Electrónico</Typography>
              <Typography variant="body-sm" style={{ fontWeight: 500 }}>{userToView.email}</Typography>
            </div>
            <div>
              <Typography variant="caption" color="muted">Rol Asignado</Typography>
              <Typography variant="body-sm" style={{ fontWeight: 500 }}>{userToView.role.toUpperCase()}</Typography>
            </div>
            <div>
              <Typography variant="caption" color="muted">Fecha de Ingreso</Typography>
              <Typography variant="body-sm" style={{ fontWeight: 500 }}>{userToView.createdAt}</Typography>
            </div>
          </div>
        )
      },
      {
        id: 'permissions',
        label: 'Permisos',
        content: (
          <div style={{ padding: '12px 0' }}>
            <Typography variant="body-sm">
              {userToView.role === 'admin' && 'Acceso total de lectura y escritura en todas las colecciones.'}
              {userToView.role === 'editor' && 'Permisos de edición en productos, reportes e inventario. Lectura general.'}
              {userToView.role === 'viewer' && 'Acceso restringido a modo lectura. No tiene permisos de modificación.'}
            </Typography>
          </div>
        )
      }
    ];
  }, [userToView]);

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
      activeId="users"
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
        <ListingLayout
          header={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography variant="h3" style={{ margin: 0, fontWeight: 700 }}>
                Directorio de Usuarios
              </Typography>
              <Typography variant="body-sm" color="muted" style={{ margin: 0 }}>
                Administra los miembros del equipo, edita sus roles y revisa sus estados de acceso.
              </Typography>
            </div>
          }
          filterBar={
            <FilterBar
              filters={filterConfigs}
              values={filterValues}
              onChange={setFilterValues}
              onReset={handleResetFilters}
              onSearch={setSearchQuery}
              searchQuery={searchQuery}
              resultCount={filteredUsers.length}
              collapsible
            />
          }
          contentLayout="table"
        >
          <DataTable
            data={filteredUsers}
            columns={userColumns}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            emptyMessage="No se encontraron usuarios que coincidan con la búsqueda."
            caption="Filtro de directorio de usuarios corporativos"
          />
        </ListingLayout>
      </DashboardLayout>

      {/* User Actions Menu */}
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

      {/* Delete User Confirmation Modal */}
      <Modal
        isOpen={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        title="Eliminar usuario"
        description="Esta acción es irreversible y removerá la cuenta."
        footer={
          <>
            <Button variant="secondary" onClick={() => setUserToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleDeleteConfirm} style={{ backgroundColor: 'var(--color-danger-600)', borderColor: 'var(--color-danger-600)' }}>
              Eliminar
            </Button>
          </>
        }
      >
        {userToDelete && (
          <div style={{ padding: '8px 0' }}>
            <Typography variant="body">
              ¿Estás seguro de que deseas eliminar permanentemente a <strong>{userToDelete.name}</strong> ({userToDelete.email})?
            </Typography>
          </div>
        )}
      </Modal>

      {/* View User Details Drawer */}
      <Drawer
        isOpen={userToView !== null}
        onClose={() => setUserToView(null)}
        placement="right"
        size="md"
        title="Ficha de Usuario"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="secondary" onClick={() => setUserToView(null)}>
              Cerrar Ficha
            </Button>
          </div>
        }
      >
        {userToView && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <UserCard
              name={userToView.name}
              email={userToView.email}
              role={userToView.role === 'admin' ? 'Administrador' : userToView.role === 'editor' ? 'Editor' : 'Visualizador'}
              status={userToView.status === 'active' ? 'online' : 'offline'}
            />
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
              <Tabs
                tabs={drawerTabs}
                activeId={drawerTabs[0]?.id || ''}
                onChange={(id) => console.log('Drawer inner tab changes:', id)}
                variant="line"
              />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
