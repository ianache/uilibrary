import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Sidebar, NavItem } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    width: { control: 'number' },
    collapsedWidth: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const sampleItems: NavItem[] = [
  { id: 'dashboard', label: 'Panel principal', icon: 'home' },
  {
    id: 'analytics',
    label: 'Analítica',
    icon: 'filter',
    children: [
      { id: 'overview', label: 'Resumen general' },
      { id: 'reports', label: 'Reportes detallados', badge: 'Nuevo' },
    ],
  },
  { id: 'messages', label: 'Mensajes', icon: 'mail', badge: 5 },
  { id: 'settings', label: 'Configuración', icon: 'settings' },
  { id: 'disabled-item', label: 'Función bloqueada', icon: 'lock', disabled: true },
];

const sampleUser = {
  name: 'María García',
  role: 'Administradora',
  avatarSrc: 'https://i.pravatar.cc/150?u=maria',
};

export const Default: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(args.collapsed || false);

    return (
      <div style={{ height: '600px', display: 'flex' }}>
        <Sidebar
          {...args}
          items={sampleItems}
          activeId={activeId}
          onItemClick={(id) => setActiveId(id)}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          user={sampleUser}
          onUserClick={() => alert('User profile clicked')}
        />
        <div style={{ padding: '24px', flex: 1, backgroundColor: '#f8fafc' }}>
          <h3>Contenido principal</h3>
          <p>Elemento activo actual: <strong>{activeId}</strong></p>
        </div>
      </div>
    );
  },
};

export const Collapsed: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState('messages');

    return (
      <div style={{ height: '600px', display: 'flex' }}>
        <Sidebar
          {...args}
          items={sampleItems}
          activeId={activeId}
          onItemClick={(id) => setActiveId(id)}
          collapsed={true}
          user={sampleUser}
        />
        <div style={{ padding: '24px', flex: 1, backgroundColor: '#f8fafc' }}>
          <h3>Modo Colapsado</h3>
          <p>Pasa el ratón sobre los iconos para ver las descripciones emergentes (tooltips).</p>
        </div>
      </div>
    );
  },
};
