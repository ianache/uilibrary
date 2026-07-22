import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Navbar, NavbarItem } from './Navbar';
import { Button } from '../../atoms/Button';

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'underline', 'pills'],
    },
    bordered: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const sampleItems: NavbarItem[] = [
  { id: 'overview', label: 'Visión general' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'team', label: 'Equipo' },
  { id: 'analytics', label: 'Métricas' },
  { id: 'settings', label: 'Ajustes' },
];

export const Underline: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState('overview');

    const items = sampleItems.map((item) => ({
      ...item,
      active: item.id === activeId,
      onClick: () => setActiveId(item.id),
    }));

    return (
      <Navbar
        {...args}
        variant="underline"
        bordered
        items={items}
        actions={
          <Button size="sm" variant="primary">
            Nuevo Proyecto
          </Button>
        }
      />
    );
  },
};

export const Pills: Story = {
  render: (args) => {
    const [activeId, setActiveId] = useState('projects');

    const items = sampleItems.map((item) => ({
      ...item,
      active: item.id === activeId,
      onClick: () => setActiveId(item.id),
    }));

    return <Navbar {...args} variant="pills" items={items} />;
  },
};

export const WithBreadcrumb: Story = {
  args: {
    bordered: true,
    breadcrumb: {
      items: [
        { label: 'Inicio', href: '#' },
        { label: 'Proyectos', href: '#' },
        { label: 'Sistema de diseño' },
      ],
    },
    actions: <Button size="sm" variant="secondary">Editar</Button>,
  },
};
