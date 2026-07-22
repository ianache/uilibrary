import { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'transparent'],
    },
    sticky: { control: 'boolean' },
    showSearch: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

const mockLogo = (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '18px' }}>
    <span style={{ background: '#4f46e5', color: '#fff', padding: '4px 8px', borderRadius: '6px' }}>UI</span>
    <span>Library</span>
  </div>
);

export const Default: Story = {
  args: {
    logo: mockLogo,
    showSearch: true,
    actions: [
      { icon: 'bell', label: 'Notificaciones', badge: 3, onClick: () => alert('Notifications clicked') },
      { icon: 'settings', label: 'Ajustes', onClick: () => alert('Settings clicked') },
    ],
    user: {
      name: 'Carlos Ruiz',
      avatarSrc: 'https://i.pravatar.cc/150?u=carlos',
    },
    onLogoClick: () => alert('Logo clicked'),
    onUserClick: () => alert('User clicked'),
    onMenuClick: () => alert('Menu clicked'),
  },
};

export const Dark: Story = {
  args: {
    ...Default.args,
    variant: 'dark',
  },
};

export const Transparent: Story = {
  args: {
    ...Default.args,
    variant: 'transparent',
  },
};
