import { useState, useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { UserMenu, MenuSection } from './UserMenu';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof UserMenu> = {
  title: 'Organisms/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

const sampleUser = {
  name: 'Ana Martínez',
  email: 'ana.martinez@empresa.com',
  role: 'Diseñadora UX',
  avatarSrc: 'https://i.pravatar.cc/150?u=ana',
};

const sampleSections: MenuSection[] = [
  {
    title: 'Mi cuenta',
    items: [
      { id: 'profile', label: 'Mi perfil', icon: 'user', onClick: () => alert('Perfil') },
      { id: 'settings', label: 'Ajustes de cuenta', icon: 'settings', onClick: () => alert('Ajustes') },
    ],
  },
  {
    title: 'Preferencia',
    items: [
      { id: 'notifications', label: 'Notificaciones', icon: 'bell', onClick: () => alert('Notificaciones') },
    ],
  },
  {
    items: [
      { id: 'logout', label: 'Cerrar sesión', icon: 'log-out', danger: true, onClick: () => alert('Cerrar sesión') },
    ],
  },
];

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Ocultar menú' : 'Mostrar menú de usuario'}
          </Button>
        </div>
        <UserMenu
          {...args}
          user={sampleUser}
          items={sampleSections}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          anchorRef={buttonRef}
        />
      </div>
    );
  },
};
