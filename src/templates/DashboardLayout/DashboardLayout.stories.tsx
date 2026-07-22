import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';
import { Header } from '../../organisms/Header';
import { Sidebar } from '../../organisms/Sidebar';

const meta: Meta<typeof DashboardLayout> = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
  argTypes: {
    sidebarWidth: { control: { type: 'number', min: 180, max: 400 } },
    collapsedWidth: { control: { type: 'number', min: 48, max: 100 } },
    sidebarCollapsed: { control: 'boolean' },
    showSidebar: { control: 'boolean' },
    headerHeight: { control: { type: 'number', min: 48, max: 100 } },
    maxContentWidth: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardLayout>;

const mockHeader = (onMenuClick?: () => void) => (
  <Header
    logo={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#4f46e5' }}>DashboardApp</span>}
    onMenuClick={onMenuClick}
    user={{ name: 'Ana Gómez', avatarSrc: 'https://i.pravatar.cc/150?u=ana' }}
    sticky={false}
  />
);

const mockSidebar = (collapsed: boolean, activeId = '1', onItemClick = (_id: string) => {}) => (
  <Sidebar
    collapsed={collapsed}
    activeId={activeId}
    onItemClick={onItemClick}
    items={[
      { id: '1', label: 'Inicio', icon: 'home' },
      { id: '2', label: 'Analíticas', icon: 'file' },
      { id: '3', label: 'Usuarios', icon: 'user', badge: 12 },
      { id: '4', label: 'Ajustes', icon: 'settings' },
    ]}
  />
);

const mockFooter = (
  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '14px' }}>
    <span>© 2026 UIComponentLibrary</span>
    <span>v1.0.0</span>
  </div>
);

export const Default: Story = {
  args: {
    sidebarWidth: 240,
    collapsedWidth: 64,
    sidebarCollapsed: false,
    showSidebar: true,
    headerHeight: 64,
    header: mockHeader(),
    sidebar: mockSidebar(false),
    footer: mockFooter,
    children: (
      <div style={{ padding: '24px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ margin: '0 0 12px 0' }}>Panel Principal</h2>
        <p style={{ color: '#475569', margin: 0 }}>
          Este es el contenido principal del tablero. Admite diseños responsivos y áreas de rejilla personalizables.
        </p>
      </div>
    ),
  },
};

export const CollapsedSidebar: Story = {
  args: {
    ...Default.args,
    sidebarCollapsed: true,
    sidebar: mockSidebar(true),
  },
};

export const InteractiveToggle: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeId, setActiveId] = useState('1');
    return (
      <DashboardLayout
        {...args}
        sidebarCollapsed={collapsed}
        header={mockHeader(() => setCollapsed(!collapsed))}
        sidebar={mockSidebar(collapsed, activeId, setActiveId)}
      />
    );
  },
  args: {
    ...Default.args,
  },
};
